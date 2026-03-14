---
description: Guide for developing new components in the Joyful Pet Transport website
---

# Component Development Workflow

This workflow guides the development of new components for the Joyful Pet Transport website.

## Project Structure Overview

```
components/
├── containers/         # Layout containers (BoxedContainer, FormContainer, etc.)
├── contents/           # Page content components (Footer, AuthButtons, etc.)
├── elements/           # Basic UI elements (buttons, inputs, etc.)
├── card/              # Card components (InfoCards, TestimonialCard, etc.)
└── ui/                # Reusable UI components
```

## Component Development Steps

### 1. Plan Component Location
- **Containers**: For layout wrappers and page structure
- **Contents**: For page-specific content blocks
- **Elements**: For basic UI building blocks
- **Card**: For card-based components
- **UI**: For reusable, design system components

### 2. Create Component File
```bash
# Example: Creating a new button element
touch components/elements/button/NewButton.tsx
```

### 3. Component Template
```tsx
import { cn } from "@/lib/utils"

interface ComponentNameProps {
  // Define props here
  className?: string
  children?: React.ReactNode
}

export function ComponentName({
  className,
  children,
  ...props
}: ComponentNameProps) {
  return (
    <div className={cn("default-classes", className)} {...props}>
      {children}
    </div>
  )
}
```

### 4. Styling Guidelines
- Use Tailwind CSS classes
- Leverage `cn()` utility for class merging
- Follow the existing design system
- Use class-variance-authority for component variants when needed

### 5. Component Testing
- Test component in isolation
- Verify responsive behavior
- Check accessibility
- Test with different content

### 6. Integration
- Import and use in parent components
- Update relevant page files
- Test in the full application context

## Common Patterns

### Form Components
- Use `react-hook-form` for form handling
- Implement proper validation with `zod`
- Follow existing form patterns in `components/contents/`

### Layout Components
- Use semantic HTML elements
- Implement proper responsive design
- Consider accessibility features

### Animation Components
- Use GSAP for complex animations
- Use Framer Motion for simpler animations
- Follow existing animation patterns

## Best Practices

### File Naming
- Use PascalCase for component files
- Name files descriptively (e.g., `BookingProcessCard.tsx`)
- Keep file names concise but clear

### Props Design
- Use TypeScript interfaces for props
- Provide sensible defaults
- Make components composable
- Use `children` prop for flexible content

### Performance
- Use `React.memo` for expensive components
- Implement proper key props for lists
- Consider lazy loading for heavy components

### Accessibility
- Use semantic HTML
- Implement ARIA labels where needed
- Ensure keyboard navigation
- Test with screen readers

## Component Review Checklist
- [ ] Component follows project structure
- [ ] TypeScript types are properly defined
- [ ] Styling is consistent with design system
- [ ] Component is responsive
- [ ] Accessibility features are implemented
- [ ] Component is documented
- [ ] Tests are written (if applicable)
- [ ] Component integrates properly
