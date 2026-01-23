# PRD 2: Form Component Modernization - Implementation Prompt

## Context
This is a React 19 + TypeScript application using TailwindCSS, React Hook Form, and Lucide React icons. The application currently uses native HTML form inputs that need to be replaced with custom, user-friendly UI components to improve usability, aesthetics, and mobile experience.

## Current State
- **Location**: `frontend/src/components/IntakeForm.tsx`
- **File Upload**: Uses native `<input type="file">` (lines 229-235)
- **Request Type**: Uses standard buttons with conditional styling (lines 125-147)
- **Text Inputs**: Standard HTML inputs with basic Tailwind classes (lines 155-183)
- **Date Input**: Native `<input type="date">` with browser-dependent styling (lines 172-177)
- **Image Handling**: Already has validation and resizing logic in `frontend/src/lib/imageUtils.ts`
- **Icons Available**: `lucide-react` is installed and available for use

## Implementation Requirements

### 1. File Uploader Component (Drag & Drop)

**Create a new component**: `frontend/src/components/FileUploader.tsx`

**Functionality:**
- Support multiple file selection (maintain existing behavior)
- Drag-and-drop zone for file uploads
- Click-to-browse functionality (hidden file input triggered by clicking the drop zone)
- Image preview thumbnails with remove (X) button after selection
- Integrate with existing `validateImage` and `resizeImage` functions from `frontend/src/lib/imageUtils.ts`
- Maintain compatibility with React Hook Form's `setValue` and `watch` methods

**Visual Design:**
- **Container**: Dashed border (`border-dashed border-2`) with color `#CBD5E1` (slate-300)
- **Background**: Default `#F1F5F9` (slate-100), hover state `#F8FAFC` (slate-50)
- **Icon**: Centered icon using Lucide React - use `CloudUpload` or `Camera` icon, size 48px, color `#64748B` (slate-500)
- **Text**: Centered text below icon, "Drag and drop images here, or click to browse"
- **Border Radius**: `rounded-lg` (8px)
- **Padding**: `p-8` (32px) for the drop zone
- **Min Height**: `min-h-[200px]` for adequate drop target area
- **Cursor**: `cursor-pointer` on hover

**Preview State:**
- When images are selected, show thumbnail grid/row
- Each thumbnail: rounded corners, max-width 120px, max-height 120px, object-cover
- Remove button: X icon from Lucide (`X`), positioned in top-right corner of each thumbnail
- Remove button: red background on hover, white icon, circular, size 24px
- Thumbnail container: Use flexbox with gap, wrap for multiple images

**States:**
- **Default**: Dashed border, icon, text, hover effect
- **Dragging**: Highlight border (use `border-[#2563EB]` - blue-600) when files are dragged over
- **Has Files**: Show thumbnails instead of drop zone (or show thumbnails below drop zone)
- **Error**: Display error message below component (use existing error handling)

**Integration:**
- Accept props: `value` (File[]), `onChange` (function), `error` (string | undefined), `multiple` (boolean, default true)
- Use hidden `<input type="file">` for actual file selection
- Call `validateImage` for each file before processing
- Call `resizeImage` for each valid file
- Update form state using the provided `onChange` callback

### 2. Request Type Segmented Control

**Location**: `frontend/src/components/IntakeForm.tsx` (replace lines 120-148)

**Convert from**: Standard buttons to segmented control (tabs/pill selector)

**Visual Design:**
- **Container**: Grey pill background `#F1F5F9` (slate-100), rounded-full, padding `p-1` (4px)
- **Layout**: Flex container with two items side-by-side
- **Active Item**: White background card (`bg-white`) with shadow (`shadow-sm`), floating on top of grey background
- **Inactive Items**: Transparent background, text color `#64748B` (slate-500)
- **Active Text**: Color `#1E293B` (slate-800), font-weight 500 (medium)
- **Inactive Text**: Color `#64748B` (slate-500), font-weight 400 (regular)
- **Padding**: `px-6 py-2` (24px horizontal, 8px vertical) for each segment
- **Border Radius**: `rounded-full` for container, `rounded-full` for active item
- **Animation**: Smooth slide transition when switching between "Return" and "Complaint"
  - Use CSS transitions: `transition-all duration-300 ease-in-out`
  - Consider using `transform` for smooth sliding effect

**Implementation:**
- Maintain existing `handleRequestTypeChange` function
- Keep existing form reset logic when switching types
- Use relative positioning for container, absolute positioning for active indicator (optional approach)
- Or use conditional classes with smooth transitions

**Text Labels:**
- "Return (30-day policy)" for RETURN type
- "Complaint (2-year warranty)" for COMPLAINT type

### 3. Standard Input Components

**Location**: `frontend/src/components/IntakeForm.tsx`

**Text Inputs** (Order/Receipt ID, Defect Description):
- **Height**: `h-12` (48px) for touch target compliance
- **Border**: 
  - Default: `border border-[#E2E8F0]` (slate-200)
  - Focus: `focus:border-[#2563EB]` (blue-600), `focus:ring-2 focus:ring-[#2563EB]/20`
- **Border Radius**: `rounded-lg` (8px)
- **Padding**: `px-4 py-3` (16px horizontal, 12px vertical)
- **Background**: `bg-white`
- **Text Color**: `text-[#1E293B]` (slate-800)
- **Placeholder**: `placeholder:text-[#94A3B8]` (slate-400)
- **Font Size**: `text-base` (16px)
- **Width**: `w-full`

**Labels:**
- Position: Above input (already correct)
- Font Size: `text-sm` (14px)
- Font Weight: `font-medium` (500)
- Color: `text-[#1E293B]` (slate-800)
- Margin Bottom: `mb-2` (8px)

**Date Input:**
- Apply same styling as text inputs above
- **Placeholder**: Add placeholder text "YYYY-MM-DD" or use `placeholder` attribute
- **Note**: Native date picker format varies by browser, but ensure the input field shows clear format hint
- Consider adding helper text below: "Format: YYYY-MM-DD" in smaller, lighter text (`text-xs text-[#64748B]`)
- Maintain `max` attribute to prevent future dates

**Textarea** (Defect Description):
- Apply same styling as text inputs
- **Min Height**: `min-h-[100px]` for adequate space
- **Resize**: `resize-y` (allow vertical resize only)

### 4. Component Integration

**Update `IntakeForm.tsx`:**

1. **Import FileUploader component:**
   ```typescript
   import { FileUploader } from './FileUploader';
   ```

2. **Replace file input section** (lines 224-246):
   - Remove native `<input type="file">`
   - Use `<FileUploader>` component
   - Pass `value={watchedImages}`, `onChange` handler, `error={errors.images?.message}`, `multiple={true}`

3. **Update Request Type section** (lines 120-148):
   - Replace button group with segmented control design
   - Maintain all existing functionality and state management

4. **Update all text/date inputs:**
   - Apply new styling classes as specified above
   - Ensure labels are properly styled
   - Add helper text for date input if needed

5. **Error Messages:**
   - Keep existing error display logic
   - Style: `text-red-500 text-sm mt-1` (already correct)

## Files to Create/Modify

1. **`frontend/src/components/FileUploader.tsx`** - NEW FILE
   - Create drag-and-drop file uploader component
   - Include thumbnail preview with remove functionality
   - Integrate with image validation and resizing

2. **`frontend/src/components/IntakeForm.tsx`** - MODIFY
   - Import and use FileUploader component
   - Replace request type buttons with segmented control
   - Update all input styling (text, date, textarea)
   - Update label styling

## Technical Details

**Drag and Drop Implementation:**
- Use `onDragEnter`, `onDragOver`, `onDragLeave`, `onDrop` event handlers
- Prevent default browser behavior on drag events
- Track drag state to show visual feedback
- Handle both drag-and-drop and click-to-browse

**Image Preview:**
- Use `URL.createObjectURL()` to create preview URLs
- Clean up object URLs with `URL.revokeObjectURL()` when removing images
- Store preview URLs in component state (separate from form files)

**Segmented Control Animation:**
- Use CSS transitions for smooth state changes
- Consider using a sliding indicator or conditional classes with transitions
- Ensure accessibility (keyboard navigation, ARIA labels)

**Form Integration:**
- Maintain React Hook Form integration
- Use `setValue` to update form state when files change
- Use `watch` to get current image values
- Ensure validation still works correctly

## Dependencies

- **Icons**: Use `lucide-react` (already installed)
  - `CloudUpload` or `Camera` for upload icon
  - `X` for remove button
- **No additional packages needed** - use existing Tailwind CSS and React capabilities

## Testing Checklist

After implementation, verify:
- [ ] File uploader shows drag-and-drop zone with correct styling
- [ ] Drag-and-drop functionality works (drag files over zone)
- [ ] Click-to-browse works (clicking zone opens file dialog)
- [ ] Multiple file selection works
- [ ] Image preview thumbnails appear after selection
- [ ] Remove button (X) removes individual images
- [ ] Image validation and resizing still work correctly
- [ ] Segmented control shows grey pill background
- [ ] Active segment has white background with shadow
- [ ] Smooth animation when switching between Return/Complaint
- [ ] All text inputs have 48px height
- [ ] Input borders change to blue on focus
- [ ] Labels are above inputs with correct styling (14px, medium weight)
- [ ] Date input has clear format indication
- [ ] Form submission still works correctly
- [ ] Error messages display properly
- [ ] Mobile experience is improved (touch targets are adequate)
- [ ] All existing functionality is preserved

## Expected Outcome

The form should have:
- A modern, drag-and-drop file uploader with image previews
- A sleek segmented control for request type selection with smooth animations
- Consistent, professional input styling with proper focus states
- Improved mobile usability with adequate touch targets
- Better visual hierarchy with properly styled labels
- Enhanced user experience while maintaining all existing functionality

## Notes

- **Maintain all existing functionality** - this is a UI/UX improvement, not a feature change
- **Preserve form validation** - ensure React Hook Form validation still works
- **Keep image processing logic** - continue using existing `validateImage` and `resizeImage` functions
- **Accessibility**: Ensure keyboard navigation works for all new components
- **Performance**: Clean up object URLs to prevent memory leaks
- **Responsive**: Ensure components work well on mobile devices
- **Browser Compatibility**: Test drag-and-drop on major browsers (Chrome, Firefox, Safari, Edge)
