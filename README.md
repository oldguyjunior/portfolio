# Joseph Maya — Photography Portfolio

Static single-page portfolio: fixed name/nav sidebar, one scrolling photo column. No build step.

## Repository and deployment

- Source repository: https://github.com/oldguyjunior/portfolio
- Production site: https://josephmaya.com
- Hosting: GitHub Pages

- `index.html` — page structure; photos listed in display order
- `style.css` — layout and typography
- `photos/` — sequentially named images (`photo-01.jpeg` … `photo-30.jpeg`)

## Preview locally

```
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Editing

- Reorder photos by reordering the `<img>` tags in `index.html`.
- Update the contact email and Instagram link in the sidebar nav.
- Hosting target: GitHub Pages (Settings → Pages → deploy from `main`).
