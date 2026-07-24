# Doorly Real Estate

A single-page real estate site, built from the Doorly template's home page and served as
plain static files. Nothing loads from a CDN except the Plus Jakarta Sans webfont.

## Structure

| Path         | What it is                                                                       |
| ------------ | -------------------------------------------------------------------------------- |
| `index.html` | The home page markup                                                             |
| `styles.css` | The stylesheet, with `url()` references pointed at `assets/`                      |
| `script.js`  | Two GSAP timelines: hero → navbar logo shrink, and the hero load-in               |
| `js/`        | jQuery, the interactions runtime (`runtime.core.js` + `runtime.init.js`), GSAP + ScrollTrigger + SplitText |
| `assets/`    | Every image, icon and logo the page references                                    |

## Run locally

```sh
python -m http.server 8000
```

Then open <http://localhost:8000>. Opening `index.html` via `file://` will not work — the
interactions runtime needs a real HTTP origin.

Note that `python -m http.server` sends no `Cache-Control`, so browsers apply heuristic
caching to `js/`. If an edit there seems to have no effect, serve on a different port
rather than trusting a reload.

## Deploy on Vercel

- Framework preset: `Other`
- Build command: leave empty
- Output directory: `.`

## Notes

- Only the home page exists. Remaining internal links point at `#`.
- Removed from the original design: the MENU trigger (and its dropdown panel), the
  "Buy Template" button, and the orange vertical rules. The navbar is now just the
  centered logo — see the rules at the bottom of `styles.css`.
- **De-branded.** The build carried the vendor's name through its markup, classes, ids,
  metadata and runtime. That was renamed consistently — the `w-` class prefix is now
  `dl-`, `data-wf-*` is `data-dl-*`, ids are `dl-node-*`, and the runtime globals were
  renamed to match. Because it is a rename and not a deletion, the HTML, the stylesheet
  and *both* runtime files have to agree; changing one alone silently breaks interactions.
  The `wf:` strings still inside `js/runtime.*.js` are internal trigger identifiers — they
  never reach the DOM, and renaming them desynchronises the trigger registry from the
  interaction data.
- The hero background is `assets/home-hero.jpg` (1600×900). It is upscaled on very wide
  displays; swap in a larger file if that shows.
- Every other photo was replaced with an [Unsplash](https://unsplash.com) image (free to
  use, no attribution required), each cropped to the ratio its slot expects — `sellers`
  and `buyers` at 68%, `cta` at 127%, `member-*` at 125%, `avatar-*` square. If you swap
  one, match the ratio or it will crop badly. These are single files with no `srcset`,
  unlike the multi-rendition originals.
- `assets/{about-hero-3,contact-bg-*,contact-one,get-started-bg,started-bg,talk-bg}.avif`
  are referenced by CSS rules for pages that were never mirrored, so they never render
  on this site. Left in place; safe to delete along with their rules.
- This design originates from a commercial template sold via
  [temlis.com](https://www.temlis.com/). This copy is for personal/development use;
  buy a license before shipping it publicly.
