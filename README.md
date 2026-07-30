# Saiyma Sittul Muna — Academic Portfolio

Static personal website for CS Ph.D. applications (Fall 2027). No build step, no
dependencies — plain HTML, CSS and vanilla JS, so it can be edited and deployed
directly.

```
index.html                 the entire page
assets/css/style.css       all styling (dark + light themes)
assets/js/main.js          theme toggle, nav, filters, lightbox, scroll reveal
assets/figures/*.png       teaser figures extracted from the papers
assets/CV_*.pdf            downloadable CV
papers/*.pdf               hosted copies of each paper
.nojekyll                  tells GitHub Pages to serve files as-is
```

## Deploying to GitHub Pages (free)

1. Create a **public** repository named exactly `Muna-sit.github.io`
   (the repo name must match the GitHub username).
2. From this folder:

   ```bash
   git init
   git add -A
   git commit -m "Personal academic portfolio"
   git branch -M main
   git remote add origin https://github.com/Muna-sit/Muna-sit.github.io.git
   git push -u origin main
   ```

3. In the repo: **Settings → Pages → Source: Deploy from a branch → `main` / `/ (root)`**.
4. The site goes live at **https://muna-sit.github.io** within a minute or two.

Every later `git push` redeploys automatically.

## Editing

Everything lives in `index.html` — each publication is one `<article class="pub">`
block. To add a new paper, copy an existing block and change the figure, tags,
title, venue and highlights. The `data-cat` attribute controls which filter tab
it appears under (`accepted`, `review`, or `ongoing`); remember to update the
counts in the filter buttons and the hero stat tiles.

## Local preview

```bash
python -m http.server 8000
```

then open <http://localhost:8000>.
