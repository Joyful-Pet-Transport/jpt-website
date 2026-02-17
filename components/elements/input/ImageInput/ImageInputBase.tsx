"use client";

import { FC, useState, useRef, ChangeEvent } from "react";
import BodyText from "../../text/BodyText";
import { cn } from "@/lib/utils";
import {
  BaseInputClass,
  baseInputValidationClass,
  baseInputDisabledClass,
} from "../InputClass";
import { LuImageUp } from "react-icons/lu";

export type ImageInputBaseProps = {
  label: string;
  whiteLabel?: boolean;
  placeholder?: string;
  initialValue?: File[] | string[];
  validation?: string;
  multiple?: boolean;
  disabled?: boolean;
  required?: boolean;
  accept?: string;
  maxSize?: number; // in MB
  widthFull?: boolean;
  onChange?: (files: File[] | string[]) => void;
};

const ImageInputBase: FC<ImageInputBaseProps> = ({
  label,
  whiteLabel = false,
  placeholder = "Click to upload images",
  initialValue = [],
  validation,
  multiple = false,
  disabled = false,
  required,
  accept = "image/*",
  maxSize,
  widthFull,
  onChange,
}) => {
  const [previews, setPreviews] = useState<string[]>(() => {
    if (initialValue.length > 0) {
      if (typeof initialValue[0] === "string") {
        return initialValue as string[];
      }
      return (initialValue as File[]).map((file) => URL.createObjectURL(file));
    }
    return [];
  });

  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const baseClass = cn(
    BaseInputClass,
    validation
      ? baseInputValidationClass.invalid
      : baseInputValidationClass.valid,
    disabled && baseInputDisabledClass,
    "text-lg placeholder:text-neutral-600",
  );

  const processFiles = (fileList: FileList | File[]) => {
    const fileArray = Array.from(fileList);

    // Validate file size if maxSize is provided
    if (maxSize) {
      const invalidFiles = fileArray.filter(
        (file) => file.size > maxSize * 1024 * 1024,
      );
      if (invalidFiles.length > 0) {
        // error here kemerlu
        return;
      }
    }

    const newFiles = multiple ? [...files, ...fileArray] : fileArray;
    setFiles(newFiles);

    // preview URLs
    const newPreviews = fileArray.map((file) => URL.createObjectURL(file));
    const updatedPreviews = multiple
      ? [...previews, ...newPreviews]
      : newPreviews;

    setPreviews(updatedPreviews);
    onChange?.(multiple ? newFiles : fileArray);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;
    processFiles(selectedFiles);
  };

  const handleRemove = (index: number) => {
    if (disabled) return;

    const updatedPreviews = previews.filter((_, i) => i !== index);
    const updatedFiles = files.filter((_, i) => i !== index);

    // Revoke object URLs to prevent memory leaks sabi ni chat gpt
    URL.revokeObjectURL(previews[index]);

    setPreviews(updatedPreviews);
    setFiles(updatedFiles);
    onChange?.(updatedFiles);
  };

  const handleClick = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setIsDragging(true);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (disabled) return;

    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles && droppedFiles.length > 0) {
      processFiles(droppedFiles);
    }
  };

  return (
    <div className={`flex flex-col gap-1 w-full ${!widthFull && "max-w-110"}`}>
      <BodyText weight="semibold" white={whiteLabel}>
        {label}
        {required && <span className="text-red-500">*</span>}
      </BodyText>

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={handleFileChange}
        className="hidden"
        aria-invalid={!!validation}
      />

      {previews.length === 0 ? (
        <div
          onClick={handleClick}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            baseClass,

            "border-4 border-dashed bg-transparent cursor-pointer flex flex-col items-center justify-center gap-2 py-8 min-h-96",
            isDragging && "bg-blue-100 border-blue-400 transition-colors",
          )}
        >
          <LuImageUp className="text-7xl text-orange-400" />
          <BodyText textColor="text-neutral-600">
            {isDragging ? "Drop images here" : placeholder}
          </BodyText>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <div
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={cn(
              "flex flex-col gap-3 rounded-md transition-colors",
              isDragging && "bg-blue-50 border-2 border-blue-400 border-dashed",
            )}
          >
            {previews.map((preview, index) => (
              <div
                key={index}
                className="relative group w-full h-80 rounded-md overflow-hidden border border-gray-300"
              >
                <img
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                {!disabled && (
                  <button
                    type="button"
                    onClick={() => handleRemove(index)}
                    className="absolute top-1 right-1 bg-orange-400 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Remove image"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>
          {!disabled && (
            <button
              type="button"
              onClick={handleClick}
              className={cn(
                baseClass,
                "cursor-pointer text-center py-2",
                "hover:bg-neutral-300 transition-colors",
              )}
            >
              <BodyText>
                {multiple ? "Add More Images" : "Change Image"}
              </BodyText>
            </button>
          )}
        </div>
      )}

      {validation && (
        <BodyText size="small" textColor="text-red-500">
          {validation}
        </BodyText>
      )}
    </div>
  );
};

export default ImageInputBase;
