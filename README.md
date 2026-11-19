# AR Families Minigame

Augmented reality quizzes about the Dutch families who settled in Melaka over the centuries.
Point a phone at a family's marker and a three-question quiz appears on top of it.

Families: DeWitt, Fredericks, Klass, Minjoot, Skelchy and Westerhout.

**Play:** https://jitshen.github.io/AR-Families-Minigame/

## How to play

1. Open a family's marker on a second screen, or print it (the **Marker** button on the home page, or the files in [`markers/`](markers/)).
2. On your phone, open the site, tap **Play** and allow camera access.
3. Point the camera at the marker and tap the answers. Green is correct, red is wrong.

Your best score per family is saved in the browser.

## Run locally

The camera only works over HTTPS or on `localhost`, so use a local server rather than opening the file directly:

```bash
python -m http.server 8000
# open http://localhost:8000
```

To test on a phone, serve it over HTTPS (for example with GitHub Pages, or a tunnel such as `ngrok`).

## Project structure

```
index.html                 Home page: list of families and their markers
play.html                  AR page, opened as play.html?family=<id>
js/families.js             All quiz content (questions, answers, images, layout)
js/quiz.js                 family-quiz A-Frame component (game flow and scoring)
js/play.js                 Builds the AR scene for the requested family
js/home.js                 Renders the family list on the home page
js/text-hit-area.js        Makes whole text labels tappable, not just the letters
js/sync-projection-inverse.js  Fixes tap positions with AR.js camera projection
css/style.css              Styles for both pages
images/<id>/               Pictures shown with the questions
markers/<id>.png|.patt     Printable marker and its trained AR.js pattern
tools/make_marker.py       Generates a marker (.png + .patt) from any image
```

Built with [A-Frame](https://aframe.io/) 1.4.2 and [AR.js](https://github.com/AR-js-org/AR.js) 3.4.5, loaded from jsDelivr with pinned versions and Subresource Integrity hashes. There is no build step.

## Adding a family

1. Add an entry to `js/families.js`. The comment at the top explains each field.
2. Put its pictures in `images/<id>/`.
3. Create its marker:

   ```bash
   pip install Pillow
   python tools/make_marker.py path/to/artwork.png markers/<id>
   ```

   Use high-contrast artwork that looks different from the other markers and isn't symmetrical, so the camera can tell which way up it is.

The home page and the AR page both pick up the new family automatically.

## Known limitations

- The DeWitt, Fredericks, Klass, Minjoot and Skelchy markers share a similar flower-and-QR layout, so one family's page can sometimes react to another family's marker. Regenerating them with distinct artwork would fix this, but printed copies would need replacing.
- The QR codes printed inside those markers link to separate project sites, not to this game.
- The Westerhout marker was regenerated in 2026 (the original pattern file was lost), so older printed Westerhout markers will not work.
- The DeWitt pattern file was retrained from `markers/dewitt.png`, because the original file did not match that image. Print the marker from this repo.
