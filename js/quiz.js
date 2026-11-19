/* global AFRAME */
/**
 * family-quiz: A-Frame component that runs one family's quiz.
 *
 * It drives the elements inside its entity by their data-role attribute
 * (see the <template> in play.html) and reads questions from window.FAMILIES.
 *
 * Views: menu -> question x N -> end -> menu, plus a best-score view.
 * Emits "quiz-marker-found" (bubbling) the first time the marker is tracked.
 */
(function () {
  'use strict';

  const FEEDBACK_DELAY_MS = 1000;
  const FACT_DELAY_MS = 3500; // long enough to read a one-sentence fact
  // Ignore answer taps this soon after a question appears, so the tap that opened it
  // (Play sits where an answer appears) can't also answer it if a phone sends it twice.
  const ANSWER_GUARD_MS = 300;
  const COLORS = { idle: 'white', correct: 'green', wrong: 'red' };
  const DEFAULT_IMAGE_WIDTH = 0.7;

  // Layout in scene units. The panel lies flat on the marker, so z is "up/down".
  const CHOICE_Y = 0.75;
  const CHOICE_ROWS_Z = [-4, -3.4];
  // Left answers end, and right answers start, this far from the centre, clear of the
  // picture (at most 0.9 wide), so shuffled answers of any length never overlap it.
  const CHOICE_GAP_X = 0.5;
  const LEFT_BUTTON = { x: -1.5, y: 0.75, z: -3.7 };
  const RIGHT_BUTTON = { x: 0.5, y: 0.75, z: -3.7 };
  const SCORE_TEXT = { x: 0, y: 0.75, z: -4 };
  const SCORE_MENU_BUTTON = { x: -0.6, y: 0.75, z: -3.4 };

  function shuffle(items) {
    const result = items.slice();
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  let audioContext;

  /** Short beep (rising for correct, low for wrong) plus a buzz on phones that support it. */
  function playFeedback(isCorrect) {
    if (navigator.vibrate) navigator.vibrate(isCorrect ? 60 : [80, 60, 80]);
    try {
      audioContext = audioContext || new (window.AudioContext || window.webkitAudioContext)();
      // iOS suspends the context after backgrounding or a call; resume it on this tap.
      if (audioContext.state !== 'running') audioContext.resume();
      const now = audioContext.currentTime;
      const tone = audioContext.createOscillator();
      const volume = audioContext.createGain();
      tone.frequency.setValueAtTime(isCorrect ? 660 : 200, now);
      if (isCorrect) tone.frequency.setValueAtTime(880, now + 0.1);
      volume.gain.setValueAtTime(0.2, now);
      volume.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      tone.connect(volume).connect(audioContext.destination);
      tone.start(now);
      tone.stop(now + 0.35);
    } catch (err) {
      // No Web Audio: the colour feedback still works.
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
      this.lastScore = null;
      this.markerFound = false;

      this.ui.playButton.addEventListener('click', () => this.startGame());
      this.ui.scoresButton.addEventListener('click', () => this.showScores());
      this.ui.menuButton.addEventListener('click', () => this.showMenu());
      this.ui.choices.forEach((choice, slot) => {
        choice.addEventListener('click', () => this.answer(slot));
      });

      this.showMenu();
    },

    tick() {
      if (this.markerFound) return;
      // AR.js's own markerFound event also fires before tracking starts, so watch
      // for the camera actually being moved to a marker pose instead.
      // shortcut: only the first detection is reported; add markerLost handling if the hint should come back.
      const camera = this.el.sceneEl.camera;
      const [x, y, z] = camera ? camera.matrixWorld.elements.slice(12, 15) : [0, 0, 0];
      if (x || y || z) {
        this.markerFound = true;
        this.el.emit('quiz-marker-found');
      }
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

      // order[slot] = index of the choice shown in that slot.
      this.order = shuffle([0, 1, 2, 3]);
      this.correctSlot = this.order.indexOf(question.answer);

      this.ui.question.setAttribute('value', question.text);
      choices.forEach((choice, slot) => {
        const index = this.order[slot];
        choice.setAttribute('value', question.choices[index]);
        choice.setAttribute('color', COLORS.idle);
        choice.setAttribute('width', widths[index]);
        choice.setAttribute('position', {
          x: slot % 2 === 0 ? -CHOICE_GAP_X : CHOICE_GAP_X,
          y: CHOICE_Y,
          z: CHOICE_ROWS_Z[Math.floor(slot / 2)]
        });
      });

      const visible = [this.ui.question, ...choices];
      if (question.image) {
        image.setAttribute('src', question.image);
        image.setAttribute('width', question.imageWidth || DEFAULT_IMAGE_WIDTH);
        visible.push(image);
      }
      this.answerLocked = false;
      this.shownAt = performance.now();
      this.showOnly(visible);
    },

    answer(slot) {
      // Ignore taps while feedback is showing, or straight after the question appeared.
      if (this.answerLocked || performance.now() - this.shownAt < ANSWER_GUARD_MS) return;
      this.answerLocked = true;

      const question = this.family.questions[this.questionIndex];
      const isCorrect = slot === this.correctSlot;
      if (isCorrect) this.score += 1;

      const tapped = this.ui.choices[slot];
      tapped.setAttribute('color', isCorrect ? COLORS.correct : COLORS.wrong);
      tapped.emit('pop', null, false);
      this.ui.choices[this.correctSlot].setAttribute('color', COLORS.correct);
      playFeedback(isCorrect);

      if (question.fact) {
        this.ui.question.setAttribute('value', `Did you know?\n${question.fact}`);
      }

      this.feedbackTimer = setTimeout(() => {
        this.questionIndex += 1;
        if (this.questionIndex < this.total) {
          this.showQuestion();
        } else {
          this.endGame();
        }
      }, question.fact ? FACT_DELAY_MS : FEEDBACK_DELAY_MS);
    },

    endGame() {
      this.lastScore = this.score;
      window.Progress.record(this.family.id, this.score);

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
      const best = window.Progress.getBest(this.family.id) || 0;
      const lines = [`Best: ${best} / ${this.total}`];
      if (this.lastScore !== null) lines.push(`Last game: ${this.lastScore} / ${this.total}`);

      header.setAttribute('value', 'Your High Score');
      score.setAttribute('value', lines.join('\n'));
      score.setAttribute('position', SCORE_TEXT);
      menuButton.setAttribute('position', SCORE_MENU_BUTTON);
      this.showOnly([header, score, menuButton]);
    }
  });
})();
