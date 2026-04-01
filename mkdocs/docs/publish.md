# Publish Docs (GitHub Pages)

This project exports documentation for MkDocs and publishes it to GitHub Pages.

## 1) Export docs from the viewer model

Run this from the project root:

```bash
npm run export:mkdocs
```

This regenerates:

- `mkdocs/docs/**` (pages)
- `mkdocs/mkdocs.yml` (site config)

## 2) Preview locally

```bash
npm run docs:serve
```

Open `http://127.0.0.1:8000` and verify pages/diagrams.

## 3) Build static site

```bash
npm run docs:build
```

Output is generated in:

- `mkdocs/site`

## 4) Publish to GitHub Pages

Use one of these options:

### Option A: GitHub Actions (recommended)

1. In GitHub repo settings:
   - `Settings -> Pages -> Source -> GitHub Actions`
2. Add a workflow that runs:
   - `npm ci`
   - `npm run export:mkdocs`
   - `npm run docs:build`
   - upload/publish `mkdocs/site`

### Option B: Manual commit to Pages branch

1. Build locally (`npm run docs:build`)
2. Push `mkdocs/site` contents to your Pages publishing branch/folder.

## Notes

- If Mermaid diagrams do not appear, hard refresh the browser once after deploy.
- Re-run `npm run export:mkdocs` whenever model docs change.
