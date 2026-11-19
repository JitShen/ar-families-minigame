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

  // On-screen help until the marker is first tracked.
  const hint = document.getElementById('ar-hint');
  window.addEventListener('arjs-video-loaded', () => {
    hint.textContent = `Point your camera at the ${family.name} Family marker`;
  });
  document.addEventListener('quiz-marker-found', () => { hint.hidden = true; });
  window.addEventListener('camera-error', () => {
    hint.textContent = 'Camera unavailable. Allow camera access for this site in your browser settings, then reload.';
    hint.classList.add('is-error');
  });

  const scene = document.importNode(document.getElementById('scene-template').content, true);
  scene.querySelector('a-marker-camera').setAttribute('url', `markers/${family.id}.patt`);
  scene.querySelector('[data-role="quiz"]').setAttribute('family-quiz', `family: ${family.id}`);

  // The family's 3D object: a .glb model, or a list of A-Frame primitives.
  const model = scene.querySelector('[data-role="model-content"]');
  if (family.model && family.model.src) {
    model.setAttribute('gltf-model', family.model.src);
  } else if (family.model && family.model.shapes) {
    family.model.shapes.forEach((shape) => {
      const part = document.createElement('a-entity');
      Object.entries(shape).forEach(([name, value]) => part.setAttribute(name, value));
      model.appendChild(part);
    });
  } else {
    scene.querySelector('[data-role="model"]').remove();
  }
  document.body.appendChild(scene);
})();
