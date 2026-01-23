# PRD 3: Interaction & Feedback Workflow - Implementation Prompt

## Context
This is a React 19 + TypeScript application using TailwindCSS, Shadcn UI, and Lucide React icons. The chat interface currently displays AI analysis results in a confusing way: the "Analyzing..." state looks like a disabled text input, results are unformatted and hard to scan, and secondary action buttons compete visually with primary actions.

## Current State
- **Location**: `frontend/src/components/ChatInterface.tsx`
- **Loading State** (lines 628-632): Displays as a gray message bubble with "Analyzing..." text, resembling a disabled text input field
- **Results Display** (lines 616-627): Messages are shown in gray bubbles (`bg-gray-100`) with unformatted text content
- **Buttons** (lines 657-662): "Start New Request" is a full-width gray button (`bg-gray-200`) that visually competes with primary actions
- **Message Formatting**: Uses `formatMessageContent()` function to parse markdown and remove JSON blocks
- **Icons Available**: `lucide-react` is installed and available for use

## Problem Statement
1. The "Analyzing..." state appears as a disabled text input, suggesting users should type there
2. Result text is unformatted and difficult to scan quickly
3. Critical buttons ("Start New Request") compete visually with primary actions
4. No clear visual distinction between success (valid) and warning/invalid results

## Implementation Requirements

### 1. Loading/Processing State

**Location**: `frontend/src/components/ChatInterface.tsx` (replace lines 628-632)

**Remove**: The current gray message bubble that displays "Analyzing..." text

**Replace with**:
- **Centered Spinner**: Use a circular loading spinner (spinning animation)
  - **Size**: 48px diameter
  - **Color**: `#2563EB` (blue-600) for the spinner
  - **Animation**: Smooth rotation (use CSS animation or Lucide React's `Loader2` icon with animation)
- **Text Below Spinner**: "AI is analyzing your images..." 
  - **Font Size**: `text-base` (16px)
  - **Color**: `text-[#64748B]` (slate-500)
  - **Centered**: Both spinner and text should be centered horizontally
  - **Spacing**: Text should be `mt-4` (16px) below the spinner

**Layout**:
- Container should be centered both horizontally and vertically (or at least horizontally with adequate top spacing)
- Use flexbox for centering: `flex flex-col items-center justify-center`
- Minimum height: `min-h-[200px]` to provide adequate visual space

**Constraint**: Hide "Start New Request" button while `isLoading` is `true` (see section 3)

### 2. Results Display - Status Alert Cards

**Location**: `frontend/src/components/ChatInterface.tsx` (modify lines 616-627)

**Convert**: Assistant messages (AI analysis results) from gray message bubbles to colored Status Alert Cards

**Status Detection**:
- Parse the message content to determine status
- Look for keywords/phrases indicating:
  - **Success/Valid**: "valid", "approved", "accepted", "confirmed", positive language
  - **Warning/Invalid/Unsure**: "invalid", "rejected", "unclear", "cannot verify", "unsure", negative/uncertain language
- If status cannot be determined, default to Warning (amber/yellow)

**Success Status Card** (Valid/Approved):
- **Background**: `#ECFDF5` (green-50 equivalent, success green)
- **Text Color**: `#059669` (green-600) or `#047857` (green-700) for good contrast
- **Border**: Optional `border border-green-200` for subtle definition
- **Icon**: Checkmark icon from Lucide React (`CheckCircle` or `Check`)
  - **Icon Color**: `#059669` (green-600)
  - **Icon Size**: 20px (default Lucide size)
  - **Position**: Left side of card, aligned with first line of text
- **Border Radius**: `rounded-lg` (8px)
- **Padding**: `p-4` (16px)
- **Layout**: Flex container with icon on left, text on right
  - Icon: `flex-shrink-0` to prevent shrinking
  - Text: `flex-1` to take remaining space
  - Gap: `gap-3` (12px) between icon and text

**Warning/Invalid Status Card** (Invalid/Unsure/Rejected):
- **Background**: `#FEF3C7` (amber-100) for warnings, or `#FEE2E2` (red-100) for errors
- **Text Color**: `#D97706` (amber-700) for warnings, or `#DC2626` (red-600) for errors
- **Border**: Optional `border border-amber-200` or `border-red-200`
- **Icon**: Alert icon from Lucide React (`AlertCircle` or `AlertTriangle`)
  - **Icon Color**: Match text color (`#D97706` for amber, `#DC2626` for red)
  - **Icon Size**: 20px
  - **Position**: Left side of card, aligned with first line of text
- **Border Radius**: `rounded-lg` (8px)
- **Padding**: `p-4` (16px)
- **Layout**: Same flex layout as success card

**Message Content Formatting**:
- Keep existing `formatMessageContent()` function for markdown parsing
- Display formatted content inside the alert card
- Ensure text is readable with proper line spacing
- Maintain existing markdown support (bold, italic, lists, paragraphs)

**User Messages**:
- Keep existing styling for user messages (blue bubble, right-aligned)
- No changes needed to user message display

### 3. Navigation Actions - Button Styling

**Location**: `frontend/src/components/ChatInterface.tsx` (modify lines 642-663)

**"Submit Request" Button** (Primary Action):
- **When to Show**: Display after AI analysis completes (when `isLoading === false` and there are assistant messages)
- **Style**: Primary Button
  - **Background**: `bg-[#2563EB]` (blue-600)
  - **Text Color**: `text-white`
  - **Hover**: `hover:bg-[#1D4ED8]` (blue-700)
  - **Width**: `w-full` (full width)
  - **Padding**: `py-3 px-4` (12px vertical, 16px horizontal)
  - **Border Radius**: `rounded-lg` (8px)
  - **Font Weight**: `font-medium` (500)
  - **Font Size**: `text-base` (16px)
  - **Transition**: `transition-colors duration-200` for smooth hover
- **Position**: Above "Start New Request" button in the input area
- **Action**: 
  - **Note**: The exact submission logic needs to be determined. This button should trigger the final submission of the verified request.
  - For now, implement the button with an `onClick` handler that can be connected to submission logic later
  - Consider calling a new prop function like `onSubmitRequest?: () => void` if provided, or show a placeholder action

**"Start New Request" Button** (Secondary Action):
- **Style**: Ghost/Secondary Button
  - **Background**: `bg-transparent` (no background color)
  - **Text Color**: `text-[#64748B]` (slate-500)
  - **Hover**: `hover:text-[#1E293B]` (slate-800) and `hover:bg-[#F1F5F9]` (slate-100) - subtle background on hover only
  - **Width**: `w-full` (full width)
  - **Padding**: `py-2 px-4` (8px vertical, 16px horizontal)
  - **Border Radius**: `rounded-lg` (8px)
  - **Font Weight**: `font-normal` (400)
  - **Font Size**: `text-base` (16px)
  - **Transition**: `transition-colors duration-200` for smooth hover
  - **Border**: No border
- **Visibility**: 
  - **Hide** when `isLoading === true`
  - **Show** when `isLoading === false`
- **Position**: Below "Submit Request" button (if shown) or at the bottom of the input area

**Button Container**:
- Maintain existing `border-t` (top border) for separation
- Use `space-y-2` (8px gap) between buttons
- Keep `p-4` padding

### 4. Loading State Constraint

**Implementation**:
- When `isLoading === true`:
  - Show the centered spinner with "AI is analyzing your images..." text
  - Hide "Start New Request" button (use conditional rendering: `{!isLoading && <button>...</button>}`)
  - Hide "Submit Request" button (if implemented)
  - Optionally disable/hide the "Upload Images" button as well (or keep it visible but disabled)

## Files to Modify

1. **`frontend/src/components/ChatInterface.tsx`** - MODIFY
   - Replace loading state display (lines 628-632)
   - Convert assistant messages to status alert cards (lines 616-627)
   - Update button styling and visibility (lines 642-663)
   - Add status detection logic for determining success vs warning
   - Import necessary icons from `lucide-react`

## Technical Details

### Status Detection Logic

**Create a helper function** to determine message status:

```typescript
function determineMessageStatus(content: string): 'success' | 'warning' | 'error' {
  const lowerContent = content.toLowerCase();
  
  // Success indicators
  const successKeywords = ['valid', 'approved', 'accepted', 'confirmed', 'verified', 'eligible', 'qualifies'];
  if (successKeywords.some(keyword => lowerContent.includes(keyword))) {
    return 'success';
  }
  
  // Error/Invalid indicators
  const errorKeywords = ['invalid', 'rejected', 'denied', 'not eligible', 'does not qualify', 'cannot approve'];
  if (errorKeywords.some(keyword => lowerContent.includes(keyword))) {
    return 'error';
  }
  
  // Warning/Uncertain indicators
  const warningKeywords = ['unclear', 'cannot verify', 'unsure', 'uncertain', 'may not', 'might not', 'needs review'];
  if (warningKeywords.some(keyword => lowerContent.includes(keyword))) {
    return 'warning';
  }
  
  // Default to warning if status cannot be determined
  return 'warning';
}
```

### Spinner Implementation

**Option 1 - Using Lucide React Icon**:
```typescript
import { Loader2 } from 'lucide-react';

<Loader2 className="w-12 h-12 text-[#2563EB] animate-spin" />
```

**Option 2 - Custom CSS Spinner**:
Create a custom spinner using Tailwind's `animate-spin` utility with a circular border.

### Alert Card Component Structure

```typescript
// Success card example
<div className="bg-[#ECFDF5] border border-green-200 rounded-lg p-4 flex gap-3">
  <CheckCircle className="w-5 h-5 text-[#059669] flex-shrink-0 mt-0.5" />
  <div className="flex-1 text-[#059669]">
    {formatMessageContent(message.content)}
  </div>
</div>
```

### Button Conditional Rendering

```typescript
{/* Submit Request Button - show when analysis is complete */}
{!isLoading && messages.some(m => m.role === 'assistant') && (
  <button
    onClick={handleSubmitRequest}
    className="w-full bg-[#2563EB] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#1D4ED8] transition-colors duration-200"
  >
    Submit Request
  </button>
)}

{/* Start New Request Button - hide during loading */}
{!isLoading && (
  <button
    onClick={onNewRequest}
    className="w-full bg-transparent text-[#64748B] py-2 px-4 rounded-lg hover:text-[#1E293B] hover:bg-[#F1F5F9] transition-colors duration-200"
  >
    Start New Request
  </button>
)}
```

## Dependencies

- **Icons**: Use `lucide-react` (already installed)
  - `Loader2` for loading spinner (with `animate-spin` class)
  - `CheckCircle` or `Check` for success status
  - `AlertCircle` or `AlertTriangle` for warning/error status
- **No additional packages needed** - use existing Tailwind CSS and React capabilities

## Testing Checklist

After implementation, verify:
- [ ] Loading state shows centered spinner (not text input-like bubble)
- [ ] "AI is analyzing your images..." text appears below spinner
- [ ] Spinner is properly centered horizontally
- [ ] "Start New Request" button is hidden during loading
- [ ] Success messages display in green alert card with checkmark icon
- [ ] Warning/Invalid messages display in amber/red alert card with alert icon
- [ ] Alert cards have proper spacing and layout (icon on left, text on right)
- [ ] Message content is still properly formatted (markdown, lists, etc.)
- [ ] "Submit Request" button appears after analysis completes (if implemented)
- [ ] "Submit Request" button has blue background and white text
- [ ] "Start New Request" button has transparent background and gray text
- [ ] "Start New Request" button shows subtle hover effect (background appears on hover)
- [ ] User messages still display correctly (blue bubble, right-aligned)
- [ ] Status detection correctly identifies success vs warning/error messages
- [ ] All existing functionality is preserved
- [ ] Responsive behavior works on mobile and desktop

## Expected Outcome

The chat interface should have:
- A clear, centered loading spinner instead of a confusing text input-like display
- Color-coded status alert cards that make results easy to scan (green for success, amber/red for warnings)
- Proper visual hierarchy with primary "Submit Request" button and secondary "Start New Request" button
- Improved user experience with clear feedback at each stage of the analysis process
- All existing functionality preserved while improving clarity and usability

## Notes

- **Maintain all existing functionality** - this is a UI/UX improvement, not a feature change
- **Preserve message formatting** - continue using `formatMessageContent()` for markdown parsing
- **Status Detection**: The status detection logic is a starting point. It may need refinement based on actual AI response patterns. Consider making it configurable or more sophisticated if needed.
- **Submit Request Action**: The exact behavior of the "Submit Request" button needs to be determined. For now, implement the button with proper styling and a placeholder handler. This can be connected to actual submission logic in a future update.
- **Accessibility**: Ensure spinner and alert cards are accessible (proper ARIA labels, keyboard navigation)
- **Responsive**: Ensure components work well on mobile devices
- **Color Contrast**: Verify that text colors meet WCAG contrast requirements for accessibility

## Questions for Clarification

1. **"Submit Request" Button**: The PRD mentions a "Submit Request" primary button, but the current flow doesn't have explicit submission after analysis. Should this button:
   - Trigger a final confirmation/submission to the backend?
   - Navigate to a confirmation screen?
   - Or is it a placeholder for future functionality?

2. **Status Detection**: Should the status detection be based on:
   - Simple keyword matching (as suggested)?
   - Parsing structured data from the AI response?
   - A combination of both?

3. **Multiple Messages**: If there are multiple assistant messages, should:
   - All be converted to alert cards?
   - Only the last/final message be an alert card?
   - Each message be evaluated independently for status?

4. **Error State**: Should error messages (from the `error` state) also use the alert card format, or keep the existing red error display?
