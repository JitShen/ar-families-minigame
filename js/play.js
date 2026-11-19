/**
 * Entry point for play.html?family=<id>: builds the AR scene for one family.
 */
(function () {
  'use strict';

  const familyId = new URLSearchParams(window.location.search).get('family');
  const family = window.FAMILIES.find((entry) => entry.id === familyId);

  if (!family) {
    // Unknown or missing family: send the player back to pick one.
    window.location.replace('./');
    return;
  }

  document.title = `${family.name} Family · AR Families Minigame`;

  // Warm the browser cache so question images appear without a delay.
  family.questions
    .filter((question) => question.image)
    .forEach((question) => { new Image().src = question.image; });

  const scene = document.importNode(document.getElementById('scene-template').content, true);
  scene.querySelector('a-marker-camera').setAttribute('url', `markers/${family.id}.patt`);
  scene.querySelector('[data-role="quiz"]').setAttribute('family-quiz', `family: ${family.id}`);
  document.body.appendChild(scene);
})();
