# Implementation Plan: Sinsay PoC Visual Overhaul

**Goal:** Align the current generic PoC with the official Sinsay brand identity (Black/White/Red, Geometric Sans, Pill Shapes).

## User Review Required

> [!IMPORTANT]
> This plan changes the core visual identity from generic gray/white to high-contrast Black/White/Red. This involves overriding default Shadcn/Tailwind styles.

## Proposed Changes

### 1. Foundation & Assets

#### [MODIFY] [index.html](file:///home/lucas/DEV/Projects/JSystems/SilkyCodders1/JSystems-SilkyCodders-1/frontend/index.html)

- Add Google Fonts preconnect and link for `Montserrat:wght@300;400;500;600;700`.

#### [MODIFY] [tailwind.config.js](file:///home/lucas/DEV/Projects/JSystems/SilkyCodders1/JSystems-SilkyCodders-1/frontend/tailwind.config.js)

- Extend theme colors:
  - `sinsay-red`: `#E90000`
  - `sinsay-black`: `#000000`
  - `sinsay-gray`: `#F5F5F5`
- Set default font family to `Montserrat`.

### 2. Layout & Global Components

#### [NEW] [Layout.tsx](file:///home/lucas/DEV/Projects/JSystems/SilkyCodders1/JSystems-SilkyCodders-1/frontend/src/components/Layout.tsx)

- Create a reusable layout wrapper.
- **Top Bar**: Red background, white text (Mock promo text: "DARMOWA DOSTAWA OD 150 PLN").
- **Header**: White background, centered Logo (SVG/PNG), Search Icon, User Icon, Bag Icon.
- **Footer**: Simple Sinsay-style footer.

#### [NEW] [Header.tsx](file:///home/lucas/DEV/Projects/JSystems/SilkyCodders1/JSystems-SilkyCodders-1/frontend/src/components/Header.tsx)

- Implementation of the Sinsay Header.

### 3. UI Component Updates (Shadcn Overrides)

#### [MODIFY] [button.tsx](file:///home/lucas/DEV/Projects/JSystems/SilkyCodders1/JSystems-SilkyCodders-1/frontend/src/components/ui/button.tsx)

- Update default variants:
  - `default`: bg-black text-white rounded-none (or small radius) uppercase font-bold hover:bg-gray-800.

#### [MODIFY] [input.tsx](file:///home/lucas/DEV/Projects/JSystems/SilkyCodders1/JSystems-SilkyCodders-1/frontend/src/components/ui/input.tsx)

- Update styling:
  - `rounded-full` (Pill shape).
  - Border-gray-300.
  - Focus ring black.

#### [MODIFY] [card.tsx](file:///home/lucas/DEV/Projects/JSystems/SilkyCodders1/JSystems-SilkyCodders-1/frontend/src/components/ui/card.tsx)

- Simplify to remove heavy borders/shadows if needed, matching the "Clean" aesthetic.

### 4. Page Implementation

#### [MODIFY] [App.tsx](file:///home/lucas/DEV/Projects/JSystems/SilkyCodders1/JSystems-SilkyCodders-1/frontend/src/App.tsx)

- Wrap content in `<Layout>`.
- Apply new typography headers.
- Ensure the Form uses the updated Input/Button components.

## Verification Plan

### Automated Tests

- None for visual styles, but ensure build passes.

### Manual Verification

- **Visual Check**: Compare local `localhost:5173` with `sinsay.com` screenshot.
- **Interactive Check**: Focus on inputs (black ring?), Hover on buttons (gray shift?).
- **Responsiveness**: Check mobile view (hamburger menu not strict req for PoC, but header should stack/scale).
