# Doorly Real Estate

A 1:1 mirror of the [Doorly template](https://doorly-template.webflow.io/) home page — same markup,
stylesheet, interactions and assets as the original, served as a plain static site.

## Structure

| Path         | What it is                                                                    |
| ------------ | ----------------------------------------------------------------------------- |
| `index.html` | The home page markup, unchanged from the source                               |
| `styles.css` | The template's stylesheet, with `url()` references pointed at `assets/`       |
| `script.js`  | The two GSAP embeds from the source: hero → navbar logo shrink, hero load-in  |
| `js/`        | jQuery, the Webflow runtime (interactions engine), GSAP + ScrollTrigger + SplitText |
| `assets/`    | Every image, icon and logo the page references                                |

Nothing is loaded from a CDN except the Plus Jakarta Sans webfont.

## Run locally

```sh
python -m http.server 8000
```

Then open <http://localhost:8000>. Opening `index.html` via `file://` will not work — the
Webflow runtime needs a real HTTP origin.

## Deploy on Vercel

- Framework preset: `Other`
- Build command: leave empty
- Output directory: `.`

## Notes

- Only the home page exists here. Internal links (About, Contact, Blogs, the nav menu) point
  at `#`, since those pages were not mirrored.
- The "Made in Webflow" badge the original injects is hidden — see the bottom of `styles.css`
  to restore it.
- Doorly is a commercial template sold via [temlis.com](https://www.temlis.com/). This copy is
  for personal/development use; buy a license before shipping it publicly.
