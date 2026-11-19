/**
 * Renders the family list on the landing page from window.FAMILIES.
 */
(function () {
  'use strict';

  const list = document.getElementById('family-list');
  const template = document.getElementById('family-card');

  window.FAMILIES.forEach((family) => {
    const card = document.importNode(template.content, true);
    const markerUrl = `markers/${family.id}.png`;

    card.querySelector('.marker').src = markerUrl;
    card.querySelector('.family-name').textContent = `${family.name} Family`;

    const play = card.querySelector('.play-link');
    play.href = `play.html?family=${encodeURIComponent(family.id)}`;
    play.setAttribute('aria-label', `Play the ${family.name} Family quiz`);

    const marker = card.querySelector('.marker-link');
    marker.href = markerUrl;
    marker.setAttribute('aria-label', `Open the ${family.name} Family marker`);

    list.appendChild(card);
  });
})();
