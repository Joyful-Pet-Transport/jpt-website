/**
 * Parent design class for all form inputs (text, select, textarea, etc.).
 * Components add validation and disabled state classes on top of this.
 */
export const BaseInputClass =
  "px-3 py-2 rounded-md border text-sm w-full focus:outline-none focus:ring-2 bg-white";

export const baseInputValidationClass = {
  invalid: "border-red-500 focus:ring-red-300",
  valid: "border-gray-300 focus:ring-blue-300",
} as const;

export const baseInputDisabledClass = "cursor-not-allowed opacity-60" as const;
