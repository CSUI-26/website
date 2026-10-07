# Repository Rules for Figma MCP Integration

## Executive summary

This repository is a small Astro website, not a mature component-design-system repository. The current implementation is intentionally minimal:

- Astro provides the page and layout framework.
- React is installed and enabled through `@astrojs/react`, but no React components are currently present.
- The site uses a single shared layout and several thin page routes.
- Styling is currently performed with inline Astro `<style>` blocks only if added later; the repository-wide global stylesheet is empty.
- No design-token source, component library, icon library, Storybook, Tailwind, CSS Modules, styled-components, image pipeline, or CDN configuration exists yet.
- The Figma MCP endpoint is configured in `.vscode/mcp.json`, but there is no local mapping or design-system contract for Figma nodes.

Do not treat the absence of a component library as a reason to copy Figma values directly into pages. Figma integration should introduce a small, explicit bridge between design definitions and the existing Astro/React implementation.

## Scope and source of truth

For Figma-to-code work, use the following precedence:

1. **Production behavior and existing repository conventions** in source code.
2. **The current design specification in Figma**, when it explicitly defines a visual component.
3. **Repository-local design tokens**, once introduced.
4. **Framework defaults**, only when a project-level decision is not available.

Do not infer a design system from an unversioned screenshot, imported asset, or a single Figma node. A reusable component must have a stable API, documented states, and a real code path that can be exercised by the application.

## Project overview

### Frameworks and build system

The project uses:

- **Astro** as the primary application framework and routing/build system.
- **React 19** as an optional framework component integration.
- **Vite**, through Astro, for module resolution and development/build tooling.
- **Terser** for production minification.
- **astro-compress** for compressed output.
- **Biome** for formatting and linting.
- **Bun** as the lockfile/package workflow, although the README and repository scripts currently contain inconsistent package-manager wording.

Relevant configuration:

- `package.json`: dependencies, Astro scripts, and build commands.
- `astro.config.mjs`: Astro integrations, compression, and Vite build behavior.
- `tsconfig.json`: Astro strict TypeScript settings, React JSX, and `@styles/*` aliases.
- `bun.lock`: resolved dependency graph.
- `.github/workflows/test-build.yml`: the production build check.
- `.github/workflows/lint.yml`: the lint check.

The project currently declares these scripts in `package.json`:

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "sync": "astro sync",
    "preview": "astro preview",
    "astro": "astro",
    "lint": "biome lint ./src",
    "format": "biome format ./src --write"
  }
}
```

Use `bun run build` or `bun run dev` when using the repository's current Bun lockfile. The README mentions `bun run sync`, `bun lint`, and `bun format`, but the package manifest defines `bun run lint`/`bun run format`. Prefer the manifest and CI workflow as the authoritative commands.

### Astro configuration

`astro.config.mjs` enables two integrations:

```js
integrations: [
  react(),
  compress({
    CSS: {
      lightningcss: true,
      csso: false,
    },
  }),
],
```

The React integration allows `.jsx`/`.tsx` React components to be rendered from Astro pages. The compression integration uses Lightning CSS for CSS compression and leaves CSS minification to the configured compressor settings. Terser is explicitly selected for Vite production minification.

For Figma integration, do not add a framework-specific transformer solely to support a Figma export. Instead, create a stable source module containing design values and component APIs, then let Astro and React consume them.

## Design System Structure

### Token definitions

No design-token file or token transformation system was found in the repository.

Current token-related behavior:

- `src/styles/global.css` is empty.
- No CSS custom properties, Sass variables, TypeScript token objects, JSON token files, or generated token bundles exist.
- No design-token package or token resolver is declared in `package.json`.
- No Tailwind theme, CSS Modules variables, or style-system configuration exists.
- The `@styles/*` alias currently points only to `src/styles/*`; it does not provide a design-token contract.

The only global stylesheet import is in the root layout:

```astro
---
import "@styles/global.css";
---
```

Recommended token architecture

Introduce a single token source in `src/styles/tokens/` or `src/design/tokens/`, with the repository convention chosen before implementation. A practical initial structure is:

```text
src/
  design/
    tokens/
      colors.ts
      typography.ts
      spacing.ts
      radii.ts
      shadows.ts
      breakpoints.ts
      index.ts
```

Use a typed object rather than raw CSS strings so Figma values can be validated and mapped safely:

```ts
export const colors = {
  neutral: {
    foreground: "#111827",
    background: "#FFFFFF",
  },
} as const;

export const spacing = {
  1: "4px",
  2: "8px",
  4: "16px",
} as const;
```

The token module must be the only place that represents design-system values. Components must not duplicate colors, spacing, radii, or typography values in their own styles.

### Token transformation

There is no existing token transformation layer. For a future implementation:

- Keep Figma export values in one normalized input format.
- Map Figma named tokens to the repository token schema.
- Preserve semantic names such as `surface`, `onSurface`, `primary`, and `focus` instead of copying Figma node names.
- Convert CSS custom properties only when they are required for the browser.
- Keep generated output out of the hand-authored source unless the project has a deterministic pipeline.
- Validate token names, types, and values before a component can consume them.

A safe design-tooling boundary is:

```text
Figma token export
    -> normalized token mapping
    -> typed source tokens
    -> CSS custom properties / component props
    -> Astro/React component consumption
```

Do not directly publish Figma values to every page or component without a mapping layer.

## Component library

### Current state

No reusable component library is implemented. `src/components/` exists but is empty. The ever-present `src/layouts/` directory contains only `BaseLayout.astro`, and page routes contain their own minimal markup.

The current component pattern is:

```astro
---
import BaseLayout from "../../layouts/BaseLayout.astro";
import { Strings } from "../../strings";

const title = `${Strings.SlugTitles.About} - ${Strings.SiteTitle}`;
---

<BaseLayout title={title}>
  <h1>{Strings.SlugTitles.About}</h1>
</BaseLayout>
```

This is a page-shell pattern, not a reusable UI component pattern.

### Recommended component architecture

Create separate concerns for page, presentational, and interactive components:

```text
src/components/
  astro/
    Button.astro
    Text.astro
    Section.astro
    PageHeader.astro
  react/
    Button.tsx
    Dialog.tsx
    Menu.tsx
  ui/
    tokens.ts
    styles.css
    types.ts
```

Use Astro components for static page composition and semantic markup. Use React components for interactive behavior or complex state, such as dialogs, menus, tabs, accordions, and form controls. Keep React components small and pass primitive props rather than exposing framework objects.

Recommended component contract:

```ts
export interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "tertiary";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  onClick?: () => void;
}
```

Each component should expose:

- A stable public API.
- A documented default state.
- Hover, focus, selected, disabled, and loading states where applicable.
- Accessible labels and keyboard behavior.
- A deterministic visual mapping to tokens.
- A direct relationship to a named Figma component or component set.

### Documentation and Storybook

No Storybook or component documentation exists. Do not introduce Storybook as a substitute for the application component API. If component stories are added, keep them alongside the component implementation and use them to verify:

- Default state.
- Variants.
- Responsive behavior.
- Interaction states.
- Accessibility labels.
- Figma mapping identifiers.

## Frameworks and libraries

### UI frameworks

- Astro is the primary framework.
- React is optional and is enabled through `@astrojs/react`.
- No Vue, Svelte, Angular, or other UI framework is installed.

Use Astro for pages and static composition. React should only be used when its runtime provides a clear benefit. Do not convert existing Astro pages to React merely to support a Figma component.

### Styling frameworks

No styling framework is currently configured:

- Tailwind is not installed or configured.
- CSS Modules are not installed or configured.
- Styled Components are not installed or configured.
- Emotion is not installed or configured.
- Sass or PostCSS is not installed or configured.
- No component-scoped stylesheet pattern exists.

The codebase currently relies on global CSS globals and framework-native style blocks, with an empty `src/styles/global.css` file.

### Compression and bundling

The build pipeline is:

```text
Astro source
  -> Vite module graph
  -> React integration where used
  -> astro-compress
  -> Terser minification
  -> static output
```

The selected compression setup is:

```js
compress({
  CSS: {
    lightningcss: true,
    csso: false,
  },
})
```

Do not assume CSS modules or runtime style injection. A Figma-derived component must remain portable across Astro and React rendering paths.

## Asset management

### Current asset state

There is no active image, video, or icon asset collection in the repository. `public/` contains only `.empty`, and no image files were found in the source tree.

The only asset-like references are the favicon links in the shared layout:

```astro
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="icon" href="/favicon.ico" />
```

Those favicon references are not currently backed by files in the visible repository tree.

### Recommended asset strategy

Use a deliberate asset hierarchy:

```text
public/
  favicon.svg
  favicon.ico
  og/
  images/
  icons/
  fonts/
```

For the Figma integration, store original exports in `public/assets/original/` only if they must be preserved. Prefer generated, optimized, and versioned assets in a build stage.

For Astro image handling, use the native `Image` component or an imported local image when a component needs responsive dimensions:

```astro
---
import { Image } from "astro:assets";
import designImage from "../assets/hero.png";
---

<Image
  src={designImage}
  alt="Product dashboard preview"
  width={1200}
  height={800}
  loading="lazy"
/>
```

For remote assets, do not add arbitrary CDN URLs without a documented policy. If a CDN is used, require:

- An explicit source of truth.
- A fixed or versioned URL.
- A content-security-policy-aware origin.
- A fallback or local copy.
- A documented integrity or provenance strategy.

### Optimization

The current configuration does not specify an image pipeline or asset optimizer. Astro's image optimizer is available only when the project uses Astro assets and the required image configuration. Avoid adding a one-off `sharp`, `svgo`, or image-service dependency unless the product requires it.

For Figma-created assets:

1. Export the source at the right resolution.
2. Keep SVGs for vector icons and simple illustrations.
3. Convert raster images to WebP or AVIF when supported.
4. Use responsive sizes and lazy loading for large media.
5. Store the original Figma export only when it is useful for future regeneration.
6. Validate generated files in the build pipeline.

## Icon system

No icon package or icon source is present. No `.svg` icon component files were found in the source tree.

Recommended icon architecture:

```text
src/icons/
  Icon.tsx
  icons/
    ArrowRight.tsx
    Check.tsx
    Menu.tsx
```

For a small Astro/site implementation, prefer inline or imported SVGs with a reusable component:

```astro
---
import Icon from "../icons/ArrowRight.astro";
---

<Icon size="20" aria-label="Continue" />
```

If React is used for interactive icons, make the icon wrapper accessible and provide a consistent API:

```tsx
export interface IconProps {
  size?: number;
  title?: string;
  className?: string;
}
```

Icon naming convention

- Use a PascalCase component name: `ArrowRight`, `CheckCircle`, `Menu`.
- Use kebab-case asset names for files: `arrow-right.svg`.
- Use semantic names rather than Figma layer names.
- Keep icons in a dedicated module or component set.
- Do not name icons by color or state; those belong to the component that displays them.

## Styling approach

### Current approach

The repository currently has no meaningful styling methodology beyond global CSS imports and empty global rules. The shared layout imports `@styles/global.css`, but the file contains no declarations.

The current styles are therefore effectively:

- Global CSS through `src/styles/global.css`.
- Astro component-local `<style>` blocks when added.
- Inline styles only if introduced manually; there are no current examples.

### Recommended approach

Use a hybrid approach:

1. **Global styles** for resets, browser defaults, base typography, focus behavior, and document-level layout.
2. **Design tokens** for all semantic values.
3. **Component-scoped styles** for component behavior where Astro supports them.
4. **Atomic or utility styling** only if the repository decides to adopt a utility framework; this repository does not currently use one.

Example global token-driven CSS:

```css
:root {
  --color-surface: #ffffff;
  --color-foreground: #111827;
  --space-4: 16px;
  --radius-md: 8px;
}

* {
  box-sizing: border-box;
}

body {
  color: var(--color-foreground);
  background: var(--color-surface);
}
```

Do not split a component into a separate CSS file merely for one visual property. Maintain a token mapping and a component-specific style block so the component remains easy to locate.

### Responsive design

No responsive breakpoint definitions or media queries are present. The root layout includes a viewport meta tag, but no responsive rules are implemented.

Define breakpoints as tokens and use a consistent responsive strategy:

```ts
export const breakpoints = {
  mobile: "0px",
  tablet: "768px",
  desktop: "1024px",
  wideDesktop: "1440px",
} as const;
```

Use semantic responsive modifiers rather than component-specific hard-coded values:

```css
@media (min-width: 768px) {
  .section-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .section-grid {
    grid-template-columns: repeat(12, minmax(0, 1fr));
  }
}
```

Required responsive behavior for Figma-derived components:

- Preserve the Figma component's desktop layout at larger widths.
- Define a mobile fallback before implementing responsive behavior.
- Test the component at 320px, 768px, 1024px, and 1440px widths.
- Ensure text, controls, and images resize without clipping.
- Make interactive targets at least 44 by 44 CSS pixels where practical.

## Project structure and feature organization

### Current layout

```text
.
├── .github/
├── .vscode/
│   ├── extensions.json
│   ├── mcp.json
│   └── settings.json
├── public/
├── src/
│   ├── components/
│   ├── layouts/
│   ├── pages/
│   ├── styles/
│   └── strings.ts
├── astro.config.mjs
├── biome.json
├── bun.lock
├── package.json
├── tsconfig.json
└── README.md
```

The current route pattern is file-based:

```text
src/pages/index.astro
src/pages/about/index.astro
src/pages/academic/index.astro
src/pages/achievements/index.astro
src/pages/boardwall/index.astro
src/pages/gallery/index.astro
src/pages/member/index.astro
```

Each page currently repeats the same title and layout pattern. This is a valid starting point for thin routes, but a page-specific component should replace repeated content as the site grows.

### Recommended feature boundaries

When adding a Figma-derived feature, use this organization:

```text
src/pages/
  feature-name/
    index.astro

src/components/
  feature-name/
    FeatureName.astro
    FeatureName.css
    FeatureName.test.ts

src/design/
  tokens/
    colors.ts
    spacing.ts

src/assets/
  feature-name/
    image.png
```

Do not place a component, token, and page-specific style in the same file unless the component is truly a one-off page shell. Reuse the same component across routes and keep page entry points thin.

### Naming and file ordering

- Astro page files use `index.astro` for route entry points.
- Component names use PascalCase.
- CSS files use the same component name or a shared global stylesheet.
- Token files use semantic names and domain categories.
- Figma mapping files should use stable identifiers rather than generated node IDs as public API names.
- Avoid adding generated Figma node IDs to runtime markup or component props unless they are needed for traceability.

## Figma MCP integration rules

### MCP configuration

The repository configures the Figma MCP server at:

```json
{
  "servers": {
    "com.figma.mcp/mcp": {
      "type": "http",
      "url": "https://mcp.figma.com/mcp",
      "gallery": "https://api.mcp.github.com",
      "version": "1.0.3"
    }
  }
}
```

The MCP configuration provides the server connection only. It does not define component mappings, token mappings, or a code-generation contract.

### Figma workflow

For every Figma design integration:

1. Identify the exact Figma file, page, frame, and node ID.
2. Record the component name, component set, variants, and intended consumer.
3. Extract the visual values that affect behavior or reuse.
4. Map values into the repository token and component contracts.
5. Implement the smallest component that supports the design.
6. Add responsive and interaction testing.
7. Verify the component through the build and lint commands.
8. Keep the Figma mapping metadata in a small repository-owned file if future migrations need traceability.

Use MCP to inspect and export design data, but do not let the MCP output become the codebase's source of truth. The source of truth must remain the repository's typed component API and styles.

### Node and component mapping

A Figma node should map to a stable code component as follows:

```text
Figma component set / frame
  -> component name
  -> token mappings
  -> React/Astro component props
  -> page composition
```

For example:

```text
Figma: Button / Primary
Code: Button
Props:
  variant: primary | secondary | tertiary
  size: sm | md | lg
  disabled: boolean
  label: string
```

If a Figma node contains multiple variants, represent them through typed props rather than separate hard-coded components unless the variants are a meaningful public API.

### Visual fidelity policy

Use Figma for design intent and exact measurements, but do not copy every visual property into runtime markup. A component may need to adopt a tokenized mapping for:

- Colors.
- Typography.
- Spacing.
- Rounding.
- Shadows.
- Borders.
- Transitions.
- Responsive sizes.
- State variants.

Avoid hard-coded values in component markup and styles. If a value is not represented by a token, document why it is exceptional and add it to the token system before the value becomes widely reused.

## Implementation checklist

Before integrating a Figma design:

- [ ] Confirm the current page and route in Astro.
- [ ] Confirm the source of the design and the exact node ID.
- [ ] Identify reusable components, page-only widgets, and one-off sections.
- [ ] Define semantic tokens before component styles.
- [ ] Establish or reuse a stable component API.
- [ ] Use Astro for static markup and React only for interaction.
- [ ] Add icon and asset handling only when needed.
- [ ] Define responsive behavior before implementing large screens.
- [ ] Add accessible labels, focus states, and keyboard handling.
- [ ] Build the component and run the repository checks.
- [ ] Record any Figma-to-code exceptions in the relevant change.

## Validation commands

Use the package manifest and CI configuration as the authoritative commands:

```bash
bun install
bun run sync
bun run lint
bun run build
```

For a full working change, run:

```bash
bun run sync && bun run lint && bun run build
```

A development server can be started with:

```bash
bun run dev
```

When the repository eventually adopts a full background-server workflow, the existing development instructions may be followed, but do not depend on a developer-specific shell command if the package manifest provides an equivalent script.

## Known repository gaps that must be resolved before a mature Figma system

1. **No design-token source**: add typed semantic tokens and a documented naming convention.
2. **No component library**: create reusable Astro/React components instead of embedding UI in pages.
3. **No icon system**: define a single icon API and source location.
4. **No asset pipeline**: define local asset handling and optimization rules.
5. **No responsive design system**: define tokens and breakpoint behavior.
6. **No Storybook or component docs**: document interactions and states in a maintainable place.
7. **No package-manager consistency**: align `README.md`, `package.json`, and CI instructions.
8. **No Figma mapping contract**: add traceable design-to-component mappings.
9. **No tests**: add browser or component tests for responsive and interaction behavior.
10. **No documentation for public Figma values**: do not expose raw node IDs or generated values in public component APIs.

## Final integration rule

Treat Figma as the visual specification, not as the implementation layer. Build the repository around semantic design tokens, reusable Astro/React components, accessible states, responsive behavior, and normalized assets. Keep the current project structure simple until a component or feature actually requires a new abstraction.
