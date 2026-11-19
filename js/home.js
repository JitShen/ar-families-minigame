/**
 * Renders the family list on the landing page from window.FAMILIES,
 * with a badge for each family the player has completed.
 */
(function () {
  'use strict';

  const list = document.getElementById('family-list');
  const template = document.getElementById('family-card');
  let completed = 0;

  window.FAMILIES.forEach((family) => {
    const card = document.importNode(template.content, true);
    const markerUrl = `markers/${family.id}.png`;

    card.querySelector('.marker').src = markerUrl;
    card.querySelector('.family-name').textContent = `${family.name} Family`;

    const best = window.Progress.getBest(family.id);
    if (best !== null) {
      completed += 1;
      const badge = card.querySelector('.badge');
      badge.textContent = `✓ Completed · Best ${best}/${family.questions.length}`;
      badge.hidden = false;
    }

    const play = card.querySelector('.play-link');
    play.href = `play.html?family=${encodeURIComponent(family.id)}`;
    play.setAttribute('aria-label', `Play the ${family.name} Family quiz`);

    const marker = card.querySelector('.marker-link');
    marker.href = markerUrl;
    marker.setAttribute('aria-label', `Open the ${family.name} Family marker`);

    list.appendChild(card);
  });

  const total = window.FAMILIES.length;
  const progress = document.getElementById('progress');
  if (completed === total) {
    progress.textContent = `\u{1F3C5} Family Historian! You have completed all ${total} families.`;
    progress.classList.add('is-complete');
  } else {
    progress.textContent = `${completed} of ${total} families completed. Finish them all to become a Family Historian.`;
  }
})();
