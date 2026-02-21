# Dynamic Modal Component

A flexible and reusable modal component built with React, TypeScript, and Tailwind CSS.

## Features

- **Multiple Sizes**: sm, md, lg, xl, full
- **Position Options**: center, top, bottom
- **Customizable**: Close button, backdrop click, escape key
- **Accessible**: Proper ARIA attributes
- **Smooth Animations**: Backdrop blur and transitions
- **Portal Rendering**: Renders outside the component tree

## Basic Usage

```tsx
import { useModal } from "@/utils/hooks/useModal";
import DynamicModal from "@/components/elements/modal/DynamicModal";

const MyComponent = () => {
  const modal = useModal();

  return (
    <>
      <button onClick={modal.openModal}>Open Modal</button>
      
      <DynamicModal
        isOpen={modal.isOpen}
        onClose={modal.closeModal}
        title="My Modal"
        size="md"
      >
        <p>Modal content goes here</p>
      </DynamicModal>
    </>
  );
};
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | Required | Controls modal visibility |
| `onClose` | `() => void` | Required | Function to close the modal |
| `title` | `string` | Optional | Modal title displayed in header |
| `children` | `ReactNode` | Required | Modal content |
| `size` | `ModalSize` | `"md"` | Modal size: "sm" \| "md" \| "lg" \| "xl" \| "full" |
| `position` | `ModalPosition` | `"center"` | Modal position: "center" \| "top" \| "bottom" |
| `showCloseButton` | `boolean` | `true` | Show/hide close button |
| `closeOnBackdropClick` | `boolean` | `true` | Close modal when clicking backdrop |
| `closeOnEscape` | `boolean` | `true` | Close modal when pressing Escape |
| `className` | `string` | `""` | Additional CSS classes |
| `overlayClassName` | `string` | `""` | Classes for overlay container |
| `contentClassName` | `string` | `""` | Classes for modal content |

## useModal Hook

The included `useModal` hook provides a convenient way to manage modal state:

```tsx
import { useModal } from "@/utils/hooks/useModal";

const modal = useModal(); // Returns: { isOpen, openModal, closeModal, toggleModal }
```

### Hook Methods

- `isOpen`: Current modal state
- `openModal()`: Opens the modal
- `closeModal()`: Closes the modal
- `toggleModal()`: Toggles modal visibility

## Examples

### Confirmation Modal
```tsx
<DynamicModal
  isOpen={confirmModal.isOpen}
  onClose={confirmModal.closeModal}
  title="Confirm Action"
  size="sm"
  closeOnBackdropClick={false}
>
  <p>Are you sure you want to proceed?</p>
  <div className="mt-4 flex justify-end gap-2">
    <DynamicButton onPress={confirmModal.closeModal}>Cancel</DynamicButton>
    <DynamicButton onPress={handleConfirm}>Confirm</DynamicButton>
  </div>
</DynamicModal>
```

### Form Modal
```tsx
<DynamicModal
  isOpen={formModal.isOpen}
  onClose={formModal.closeModal}
  title="Contact Form"
  size="lg"
>
  <form onSubmit={handleSubmit}>
    {/* Form fields */}
    <div className="flex justify-end gap-2 mt-4">
      <DynamicButton onPress={formModal.closeModal} type="outline">
        Cancel
      </DynamicButton>
      <DynamicButton onPress={() => formModal.closeModal()}>
        Submit
      </DynamicButton>
    </div>
  </form>
</DynamicModal>
```

### Full Screen Modal
```tsx
<DynamicModal
  isOpen={fullModal.isOpen}
  onClose={fullModal.closeModal}
  size="full"
  showCloseButton={true}
>
  {/* Full screen content */}
</DynamicModal>
```

## Styling

The modal uses Tailwind CSS classes and can be customized through the `className`, `overlayClassName`, and `contentClassName` props. The component follows your project's design system with rounded corners, shadows, and consistent spacing.

## Accessibility

- Uses `role="dialog"` and `aria-modal="true"`
- Properly labeled with `aria-labelledby` when title is provided
- Focus management and keyboard navigation support
- Close button has proper `aria-label`
