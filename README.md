# AR Families Minigame

Augmented reality quizzes about the Dutch families who settled in Melaka over the centuries.
Point a phone at a family's marker and a three-question quiz appears on top of it, with a 3D object from the family's story.

Families: DeWitt, Fredericks, Klass, Minjoot, Skelchy and Westerhout.

**Play:** https://jitshen.github.io/AR-Families-Minigame/

## How to play

1. Open a family's marker on a second screen, or print it (the **Marker** button on the home page, or the files in [`markers/`](markers/)).
2. On your phone, scan the QR code under the marker (or open the site and tap **Play**), then allow camera access.
3. Point the camera at the marker and tap the answers. Green is correct, red is wrong, and a short fact follows each answer.

Answers are shuffled every round. Your best score per family is saved in the browser, and the home page shows a badge for each family you have completed. Complete all six to become a Family Historian.

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
js/quiz.js                 family-quiz A-Frame component (game flow, scoring, sound)
js/progress.js             Best score per family, saved in localStorage
js/play.js                 Builds the AR scene for the requested family
js/home.js                 Renders the family list on the home page
js/text-hit-area.js        Makes whole text labels tappable, not just the letters
js/sync-projection-inverse.js  Fixes tap positions with AR.js camera projection
js/fit-size.js             Scales each family's 3D object to the same size
css/style.css              Styles for both pages
images/<id>/               Pictures shown with the questions
markers/<id>.png|.patt     Printable marker (with QR code) and its trained AR.js pattern
models/                    3D objects shown on the markers (.glb)
tools/make_marker.py       Generates a marker (.png + .patt) from any image
```

Built with [A-Frame](https://aframe.io/) 1.4.2 and [AR.js](https://github.com/AR-js-org/AR.js) 3.4.5, loaded from jsDelivr with pinned versions and Subresource Integrity hashes. There is no build step.

## Adding a family

1. Add an entry to `js/families.js`. The comment at the top explains each field, including the optional `fact` shown after each answer.
2. Put its pictures in `images/<id>/`.
3. Create its marker:

   ```bash
   pip install Pillow segno
   python tools/make_marker.py images/<id>/1.png markers/<id>        --qr "https://jitshen.github.io/AR-Families-Minigame/play.html?family=<id>"
   ```

   Use high-contrast artwork that looks different from the other markers and isn't symmetrical, so the camera can tell which way up it is. Add `--autocontrast` for pale artwork (the DeWitt marker uses it).
4. Optionally add a `model` (a `.glb` in `models/`, or simple shapes) to show a 3D object on the marker.

The home page and the AR page both pick up the new family automatically.

## Known limitations

- The markers were redesigned in 2026, so markers printed before then no longer work. Print them again from `markers/`.
- The DeWitt sewing machine and the Klass cake stand are built from simple shapes, because no public-domain models exist.

## Credits

3D models, all public domain (CC0), from [Poly Pizza](https://poly.pizza):

- Sail Ship and Tree by [Quaternius](https://quaternius.com)
- Cake by [Kenney](https://kenney.nl)
- Boots (used as clogs) by Isa Lousberg
