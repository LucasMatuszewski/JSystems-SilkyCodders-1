# Sinsay PoC Style Guide

**Based on:** https://www.sinsay.com/pl/pl/  
**Date:** 2026-01-23  
**Purpose:** Align PoC UI/UX with Sinsay brand identity.

## 1. Brand Identity

### Logo

- **URL:** `https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Sinsay_logo.svg/2560px-Sinsay_logo.svg.png` (or reliable Sinsay logo source)
- **Usage:** Centered in Header (Desktop) or Left (Mobile).
- **Position:** Top header bar.

### Color Palette

#### Primary Colors

- **Background (Body):** `#FFFFFF` (White)
- **Text (Primary):** `#000000` (Pure Black)
- **Accents:** `#E90000` (Sinsay Red) - Used for promos/sale badges.
- **Button Primary:** `#000000` (Black)
- **Button Text:** `#FFFFFF` (White)

#### Secondary Colors

- **Border Color:** `#E0E0E0` (Light Gray) - subtle framing.
- **Input Background:** `#F0F0F0` (Light Gray) or White with border.
- **Hover States:** `#333333` (Dark Gray) for buttons.

### Typography

#### Font Family

- **Primary:** `Euclid`, `Montserrat`, `Arial`, `sans-serif`.
- **Style:** Modern Geometric Sans-Serif.

#### Font Sizes

- **Body:** `14px` or `16px`.
- **Headings:** Bold, often Uppercase for section titles.
- **Buttons:** `14px`, Uppercase, Bold/Semi-Bold.

## 2. UI Components & Layout

### Header

- **Top Bar:** Red (#E90000) dedicated to promotions (optional for PoC, but good for branding).
- **Main Bar:** White background, minimal.
- **Elements:** Logo, Search Bar (Pill shaped), Icons (User, Bag).

### Buttons

- **Style:** Solid Black Background.
- **Text:** White, Uppercase.
- **Shape:** Sharp corners (`border-radius: 0px`) or slightly rounded (`4px`) depending on context. _Correction: Sinsay marketing banners use sharp buttons, UI elements often use pill/rounded._
  - **Proposed for PoC:** Solid Black, Sharp Corners or small radius (2px) to match "edgy" fast fashion vibe.
- **Hover:** Slight opacity reduction or dark gray shift.

### Form Inputs

- **Style:** Minimalist.
- **Shape:**
  - **Search Bar:** Pill (`border-radius: 999px`).
  - **Form Fields (Contact/Returns):** rounded-md or pill. _Recommendation: Use Pill shaped inputs (`rounded-full`) to match the search bar's strong identity._
- **Border:** Thin light gray (`1px solid #E5E5E5`).
- **Focus:** Black border or Glow.

### Layout Structure

- **Container:** Centered, plenty of whitespace.
- **Card:** Clean white card, maybe subtle shadow or just whitespace separation.
- **Responsiveness:** Full width on mobile, max-width ~600px on desktop.

## 3. Detailed Component Specs (for Implementation)

### 1. `Button`

```css
background-color: #000000;
color: #ffffff;
text-transform: uppercase;
font-weight: 700;
padding: 12px 24px;
border-radius: 0px (or 999px for pill style interactions);
font-family: 'Euclid', sans-serif;
```

### 2. `Input`

```css
background-color: #ffffff;
border: 1px solid #e5e5e5;
border-radius: 999px; /* Pill shape */
padding: 12px 20px;
font-size: 14px;
color: #000000;
outline: none;
transition: border-color 0.2s;
```

_Focus state:_ `border-color: #000000;`

### 3. `Header`

- **Promo Strip:** Background `#E90000`, Text White, Height ~30px.
- **Nav Bar:** Background White, Height ~60px, Border-bottom `1px solid #F0F0F0`.

### 4. `Typography`

- **Headings:** uppercase, tracking-wide (letter-spacing).
- **Labels:** text-xs, uppercase, text-gray-500, tracking-wider.

## 4. Implementation Plan Changes

- Replace generic Tailwind colors with Sinsay Black/Red/White.
- Import a font like **Montserrat** (Google Fonts) as a proxy for Euclid.
- Refactor `Input` and `Button` components to match the specs above.
- Add the Red Promo Bar to the `Layout`.
