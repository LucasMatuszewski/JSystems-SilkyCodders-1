# PRD 1: Visual Foundation & Layout Overhaul - Implementation Prompt

## Context
This is a React 19 + TypeScript application using TailwindCSS and Shadcn UI. The application currently has a basic "developer UI" appearance that needs to be transformed into a professional, trustworthy design suitable for a returns processing system.

## Current State
- **Location**: `frontend/src/App.tsx` contains the main layout
- **Current background**: `bg-gray-50`
- **Current card styling**: `bg-white rounded-lg shadow` with `p-6` (24px padding)
- **Current max-width**: `max-w-4xl` (896px)
- **Current typography**: System default fonts, no custom font family specified
- **Components affected**: `App.tsx`, `IntakeForm.tsx`, `ChatInterface.tsx`

## Implementation Requirements

### 1. Typography Setup

**Font Family:**
- Install and configure **Inter** font (preferred) or use **Roboto** as fallback, with `system-ui` as final fallback
- Add Inter font import to `frontend/index.html` in the `<head>` section:
  ```html
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
  ```
- Update `frontend/src/index.css` to set Inter as the default font family:
  ```css
  body {
    font-family: 'Inter', 'Roboto', system-ui, -apple-system, sans-serif;
  }
  ```

**Typography Scale:**
- **Header (h1)**: 24px font size, 32px line height, font-weight 700 (bold), color `#111827`
- **Sub-header**: 16px font size, regular weight (400), color `#64748B`
- **Body text**: Default size, color `#1E293B` (Slate-800) for primary text
- **Secondary text**: Color `#64748B` (Slate-500)

### 2. Color Palette Implementation

Update `frontend/src/index.css` CSS variables and/or Tailwind config to include:

**Background Colors:**
- Main background: `#F8FAFC` (Slate-50)
- Card surface: `#FFFFFF` (White)

**Text Colors:**
- Primary text: `#1E293B` (Slate-800)
- Secondary text: `#64748B` (Slate-500)
- Header text: `#111827` (Gray-900)

**Brand Color:**
- Primary brand: `#2563EB` (Blue-600) - use for buttons, links, and interactive elements

### 3. Main Container (Card) Styling

**In `frontend/src/App.tsx`:**

Update the main container div (currently has `className="container mx-auto px-4 py-8 max-w-4xl"`):
- Change `max-w-4xl` to `max-w-[600px]` (600px max-width)
- Keep `mx-auto` for centering
- Adjust padding: `px-4 py-8` is fine for outer container

Update the white card containers (currently `bg-white rounded-lg shadow p-6`):
- **Border radius**: Change from `rounded-lg` (8px) to `rounded-2xl` (16px in Tailwind)
- **Shadow**: Update to use Tailwind's shadow-lg or custom shadow: `shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)]`
- **Padding**: 
  - Desktop: `p-10` (40px) - use `p-10` or `px-10 py-10`
  - Mobile: `p-6` (24px) - use responsive classes: `p-6 md:p-10` or `px-6 py-6 md:px-10 md:py-10`

**Apply to:**
- The form container in `App.tsx` (line ~60)
- The chat interface container in `App.tsx` (line ~69)

### 4. Background Color Update

**In `frontend/src/App.tsx`:**
- Change `bg-gray-50` to `bg-[#F8FAFC]` or add a custom Tailwind color

**Option 1 (Direct):** Use `bg-[#F8FAFC]` directly
**Option 2 (Tailwind Config):** Add to `tailwind.config.js`:
```js
theme: {
  extend: {
    colors: {
      'slate-50': '#F8FAFC',
      'slate-500': '#64748B',
      'slate-800': '#1E293B',
      'blue-600': '#2563EB',
    }
  }
}
```

### 5. Typography Updates in Components

**In `frontend/src/App.tsx` header section:**
- Update h1: `text-3xl font-bold text-gray-900` → `text-2xl font-bold text-[#111827]` (24px = text-2xl in Tailwind)
- Update sub-header: `text-gray-600` → `text-[#64748B]` or `text-slate-500` with `text-base` (16px)

**In `frontend/src/components/IntakeForm.tsx`:**
- Update labels to use `text-[#1E293B]` or `text-slate-800` for primary text
- Update secondary text to use `text-[#64748B]` or `text-slate-500`
- Update button colors to use `bg-[#2563EB]` or `bg-blue-600` (ensure it's the correct blue-600)

**In `frontend/src/components/ChatInterface.tsx`:**
- Apply consistent text colors using the new palette
- Ensure message bubbles use appropriate colors from the palette

### 6. Vertical Rhythm & Whitespace

Ensure consistent spacing:
- Use Tailwind's spacing scale consistently
- Maintain proper vertical rhythm between form elements
- Ensure adequate whitespace around the main card (current `py-8` is good)

### 7. Responsive Considerations

- Ensure padding scales appropriately: `p-6` on mobile, `p-10` on desktop
- Test that the 600px max-width works well on all screen sizes
- Ensure the card remains centered and doesn't break on small screens

## Files to Modify

1. **`frontend/index.html`** - Add Inter font import
2. **`frontend/src/index.css`** - Add font-family to body, update CSS variables if needed
3. **`frontend/tailwind.config.js`** - Optionally add custom colors
4. **`frontend/src/App.tsx`** - Update container, card styling, background, typography
5. **`frontend/src/components/IntakeForm.tsx`** - Update text colors and button colors
6. **`frontend/src/components/ChatInterface.tsx`** - Update text colors for consistency

## Testing Checklist

After implementation, verify:
- [ ] Inter font is loading and applied
- [ ] Background color is `#F8FAFC`
- [ ] Main card has 16px border-radius
- [ ] Main card has soft shadow (0 10px 15px -3px rgba(0, 0, 0, 0.1))
- [ ] Main card has 40px padding on desktop, 24px on mobile
- [ ] Main card is centered with max-width 600px
- [ ] Header text is 24px/32px, bold, color #111827
- [ ] Sub-header is 16px, regular, color #64748B
- [ ] Primary buttons use #2563EB
- [ ] Text colors match the specified palette
- [ ] Layout looks professional and trustworthy
- [ ] Responsive behavior works on mobile and desktop

## Expected Outcome

The application should have:
- A clean, modern appearance with Inter font
- Professional color scheme using the specified slate and blue palette
- A centered white card with proper spacing and shadow
- Consistent typography hierarchy
- Improved visual trustworthiness suitable for returns processing

## Notes

- Maintain all existing functionality - this is purely a visual/styling update
- Use Tailwind utility classes where possible for consistency
- If custom CSS is needed, add it to `index.css` in the appropriate `@layer`
- Ensure the changes work with the existing Shadcn UI components
- Test that the form and chat interface both look good with the new styling
