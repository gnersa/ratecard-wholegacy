# Upload Instructions — v17.5.1 Clean Root

Upload the **contents of this folder directly into the GitHub repository root**.

The repository root must contain `package.json`, `next.config.ts`, `src/`, and `public/`.

Do **not** upload the outer folder itself as a subfolder. After upload, GitHub must show:

```
package.json
next.config.ts
src/
  app/
    page.tsx
    layout.tsx
    dashboard/
    api/
public/
```

There must be no files named `page (2).tsx`, `route (2).ts`, etc.

No new Neon migration is required beyond the existing v17 migration already applied.
