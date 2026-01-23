# Frontend App Analysis & Recommendations

**Date:** 2026-01-23  
**Current App URL:** http://127.0.0.1:5173/  
**Reference:** https://www.sinsay.com/pl/pl/

## Current State Analysis

### What I See in the Current PoC

#### Layout
- **Container:** Centered card with `max-w-2xl`, white background, rounded corners (`rounded-xl` = 12px)
- **Header:** Black background (`bg-black`) with white text, uppercase "Sinsay Returns AI" title
- **Main Content:** Form with spacing (`space-y-6`)

#### Form Elements
1. **Order Number Input:**
   - Standard Tailwind input styling
   - Rounded corners (`rounded-md`)
   - Border with gray color
   - Focus ring (black)

2. **Request Type (Radio Buttons):**
   - Two radio options in cards
   - Border with rounded corners
   - Hover effect (gray background)
   - Black radio button when selected

3. **Photo Upload:**
   - Dashed border area
   - Centered content
   - Upload icon (SVG)
   - "Upload a file" button
   - File size hint text

4. **Description Textarea:**
   - Standard textarea with rounded corners
   - Border styling
   - Focus ring

5. **Submit Button:**
   - Full width
   - Black background (`bg-black`)
   - White text
   - Rounded corners
   - Hover effect (darker gray)

#### Typography
- Using default Tailwind/system fonts
- Headings: `text-xl font-semibold`
- Labels: `text-sm font-medium`
- Body: Default sizes

#### Colors
- Primary: Black (`#000000`)
- Background: Gray-50 (`#F9FAFB`)
- Text: Gray-700 (`#374151`)
- Borders: Gray-300 (`#D1D5DB`)

## Comparison with Sinsay Website

### Key Differences

1. **Header:**
   - **Current:** Black background, white text
   - **Sinsay:** White background, dark text, logo on left

2. **Logo:**
   - **Current:** Text-only "Sinsay Returns AI"
   - **Sinsay:** Actual logo image

3. **Colors:**
   - **Current:** Black/white/gray palette
   - **Sinsay:** Warm orange/beige (`#DF9A55`) for primary actions

4. **Border Radius:**
   - **Current:** Rounded corners (`rounded-xl`, `rounded-md`)
   - **Sinsay:** Sharp corners (`0px` border-radius)

5. **Form Inputs:**
   - **Current:** Visible borders, rounded corners
   - **Sinsay:** Minimal/no borders, sharp corners

6. **Typography:**
   - **Current:** System fonts
   - **Sinsay:** Euclid font family

7. **Spacing:**
   - **Current:** Standard Tailwind spacing
   - **Sinsay:** More generous padding/margins

8. **Button Style:**
   - **Current:** Black background, rounded
   - **Sinsay:** Orange/beige (`#DF9A55`), sharp corners or minimal rounding

## Functional Testing Notes

### Current Functionality
✅ Form validation works  
✅ Image upload and preview works  
✅ Radio button selection works  
✅ Form submission triggers chat interface  
✅ Responsive layout (centered card)

### Missing/Issues
- No logo implementation
- Brand colors not applied
- Typography doesn't match Sinsay
- Border radius too rounded
- Form inputs have visible borders (should be minimal)

## Recommendations

### Priority 1: Brand Identity
1. Add Sinsay logo to header
2. Change header to white background
3. Update primary button color to `#DF9A55`
4. Update font family to Euclid/Arial stack

### Priority 2: Visual Design
1. Remove/minimize border radius (sharp corners)
2. Update form input styling (minimal borders)
3. Adjust spacing to match Sinsay's generous padding
4. Update color palette throughout

### Priority 3: Polish
1. Implement proper hover/focus states
2. Ensure consistent typography scale
3. Add subtle animations/transitions
4. Verify accessibility (contrast, focus states)

## Implementation Plan

See `STYLE-GUIDE-Sinsay.md` for detailed specifications.

### Step 1: Update Colors & Typography
- Add CSS variables for Sinsay colors
- Update font family
- Replace black buttons with brand orange

### Step 2: Update Layout
- Change header to white
- Add logo
- Adjust container styling

### Step 3: Update Form Elements
- Remove/minimize border radius
- Update input styling
- Update button styling

### Step 4: Polish & Test
- Add hover/focus states
- Test responsive behavior
- Verify accessibility
