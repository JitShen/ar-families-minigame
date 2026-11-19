/* global AFRAME */
/**
 * family-quiz: A-Frame component that runs one family's quiz.
 *
 * It drives the elements inside its entity by their data-role attribute
 * (see the <template> in play.html) and reads questions from window.FAMILIES.
 *
 * Views: menu -> question x N -> end -> menu, plus a best-score view.
 */
(function () {
  'use strict';

  const FEEDBACK_DELAY_MS = 1000;
  const COLORS = { idle: 'white', correct: 'green', wrong: 'red' };
  const DEFAULT_IMAGE_WIDTH = 0.7;

  // Layout in scene units. The panel lies flat on the marker, so z is "up/down".
  const CHOICE_Y = 0.75;
  const CHOICE_ROWS_Z = [-4, -3.4];
  const LEFT_BUTTON = { x: -1.5, y: 0.75, z: -3.7 };
  const RIGHT_BUTTON = { x: 0.5, y: 0.75, z: -3.7 };
  const SCORE_TEXT = { x: 0, y: 0.75, z: -4 };
  const SCORE_MENU_BUTTON = { x: -0.6, y: 0.75, z: -3.4 };

  const storageKey = (familyId) => `ar-families:best-score:${familyId}`;

  function loadBestScore(familyId) {
    try {
      return Number(localStorage.getItem(storageKey(familyId))) || 0;
    } catch (err) {
      return 0; // Storage blocked (e.g. private mode): start from zero.
    }
  }

  function saveBestScore(familyId, score) {
    try {
      localStorage.setItem(storageKey(familyId), String(score));
    } catch (err) {
      // Storage blocked: the score is still kept in memory for this visit.
    }
  }

  AFRAME.registerComponent('family-quiz', {
    schema: {
      family: { type: 'string' }
    },

    init() {
      this.family = window.FAMILIES.find((family) => family.id === this.data.family);
      if (!this.family) {
        throw new Error(`family-quiz: unknown family "${this.data.family}"`);
      }

      const byRole = (role) => this.el.querySelector(`[data-role="${role}"]`);
      this.ui = {
        header: byRole('header'),
        question: byRole('question'),
        image: byRole('image'),
        score: byRole('score'),
        playButton: byRole('play'),
        scoresButton: byRole('scores'),
        menuButton: byRole('menu'),
        choices: Array.from(this.el.querySelectorAll('[data-role="choice"]'))
      };
      this.allElements = Object.values(this.ui).flat();
      this.ui.question.setAttribute('width', this.family.questionWidth);

      this.total = this.family.questions.length;
      this.bestScore = loadBestScore(this.family.id);
      this.lastScore = null;

      this.ui.playButton.addEventListener('click', () => this.startGame());
      this.ui.scoresButton.addEventListener('click', () => this.showScores());
      this.ui.menuButton.addEventListener('click', () => this.showMenu());
      this.ui.choices.forEach((choice, index) => {
        choice.addEventListener('click', () => this.answer(index));
      });

      this.showMenu();
    },

    remove() {
      clearTimeout(this.feedbackTimer);
    },

    /**
     * Show only the given elements. Hidden buttons also lose the "clickable"
     * class so the raycaster stops hitting them (it ignores visibility).
     */
    showOnly(visibleElements) {
      this.allElements.forEach((el) => {
        const visible = visibleElements.includes(el);
        el.setAttribute('visible', visible);
        if (el.hasAttribute('data-button')) {
          el.classList.toggle('clickable', visible);
        }
      });
    },

    showMenu() {
      const { header, playButton, scoresButton } = this.ui;
      header.setAttribute('value', `Do you know the ${this.family.name} Family?`);
      playButton.setAttribute('value', 'Play Game');
      playButton.setAttribute('position', RIGHT_BUTTON);
      scoresButton.setAttribute('position', LEFT_BUTTON);
      this.showOnly([header, playButton, scoresButton]);
    },

    startGame() {
      this.score = 0;
      this.questionIndex = 0;
      this.showQuestion();
    },

    showQuestion() {
      const question = this.family.questions[this.questionIndex];
      const { image, choices } = this.ui;
      const widths = Array.isArray(question.choiceWidth)
        ? question.choiceWidth
        : choices.map(() => question.choiceWidth);

      this.ui.question.setAttribute('value', question.text);
      choices.forEach((choice, index) => {
        choice.setAttribute('value', question.choices[index]);
        choice.setAttribute('color', COLORS.idle);
        choice.setAttribute('width', widths[index]);
        choice.setAttribute('position', {
          x: question.columns[index % 2],
          y: CHOICE_Y,
          z: CHOICE_ROWS_Z[Math.floor(index / 2)]
        });
      });

      const visible = [this.ui.question, ...choices];
      if (question.image) {
        image.setAttribute('src', question.image);
        image.setAttribute('width', question.imageWidth || DEFAULT_IMAGE_WIDTH);
        visible.push(image);
      }
      this.answerLocked = false;
      this.showOnly(visible);
    },

    answer(index) {
      // Ignore taps while the feedback for this question is showing.
      if (this.answerLocked) return;
      this.answerLocked = true;

      const question = this.family.questions[this.questionIndex];
      const isCorrect = index === question.answer;
      if (isCorrect) this.score += 1;

      this.ui.choices[index].setAttribute('color', isCorrect ? COLORS.correct : COLORS.wrong);
      this.ui.choices[question.answer].setAttribute('color', COLORS.correct);

      this.feedbackTimer = setTimeout(() => {
        this.questionIndex += 1;
        if (this.questionIndex < this.total) {
          this.showQuestion();
        } else {
          this.endGame();
        }
      }, FEEDBACK_DELAY_MS);
    },

    endGame() {
      this.lastScore = this.score;
      if (this.score > this.bestScore) {
        this.bestScore = this.score;
        saveBestScore(this.family.id, this.score);
      }

      const { header, score, playButton, menuButton } = this.ui;
      header.setAttribute('value', 'Thank you for playing!');
      score.setAttribute('value', `You scored ${this.score} / ${this.total}`);
      score.setAttribute('position', SCORE_TEXT);
      playButton.setAttribute('value', 'Play Again');
      playButton.setAttribute('position', RIGHT_BUTTON);
      menuButton.setAttribute('position', LEFT_BUTTON);
      this.showOnly([header, score, playButton, menuButton]);
    },

    showScores() {
      const { header, score, menuButton } = this.ui;
      const lines = [`Best: ${this.bestScore} / ${this.total}`];
      if (this.lastScore !== null) lines.push(`Last game: ${this.lastScore} / ${this.total}`);

      header.setAttribute('value', 'Your High Score');
      score.setAttribute('value', lines.join('\n'));
      score.setAttribute('position', SCORE_TEXT);
      menuButton.setAttribute('position', SCORE_MENU_BUTTON);
      this.showOnly([header, score, menuButton]);
    }
  });
})();
