"use client";

import { FC, useState, useRef } from "react";
import dayjs from "dayjs";
import BodyText from "../../text/BodyText";
import { cn } from "@/lib/utils";
import {
  BaseInputClass,
  baseInputValidationClass,
  baseInputDisabledClass,
} from "../InputClass";
import CalendarPicker from "./components/CalendarPicker";
import CalendarRangePicker from "./components/CalendarRangePicker";

export type DateInputType = "specific" | "range";

export type DateRange = {
  start: string;
  end: string;
};

export type DateInputBaseProps = {
  label: string;
  whiteLabel?: boolean;
  placeholder?: string;
  initialValue?: string | DateRange;
  validation?: string;
  dateType?: DateInputType;
  disabled?: boolean;
  required?: boolean;
  /** When true, calendar shows a year dropdown (useful for birthdays) */
  enableYearSelect?: boolean;
  onChange?: (value: string | DateRange) => void;
};

const DateInputBase: FC<DateInputBaseProps> = ({
  label,
  whiteLabel = false,
  placeholder = "Select date...",
  initialValue,
  validation,
  dateType = "specific",
  disabled = false,
  required,
  enableYearSelect = false,
  onChange,
}) => {
  const [specificValue, setSpecificValue] = useState<string>(
    dateType === "specific" ? (initialValue as string) || "" : "",
  );

  const [rangeValue, setRangeValue] = useState<DateRange>(
    dateType === "range"
      ? (initialValue as DateRange) || { start: "", end: "" }
      : { start: "", end: "" },
  );

  const [rangeValidation, setRangeValidation] = useState<string>("");
  const [showSpecificCalendar, setShowSpecificCalendar] = useState(false);
  const [showRangeCalendar, setShowRangeCalendar] = useState(false);
  const specificInputRef = useRef<HTMLDivElement>(null);
  const rangeInputRef = useRef<HTMLDivElement>(null);

  const isRangeInvalid = (start: string, end: string): boolean => {
    if (!start || !end) return false;
    return new Date(start) > new Date(end);
  };

  const baseClass = cn(
    BaseInputClass,
    validation || rangeValidation
      ? baseInputValidationClass.invalid
      : baseInputValidationClass.valid,
    disabled && baseInputDisabledClass,
    "cursor-pointer",
  );

  const formatDisplayDate = (dateStr: string): string => {
    if (!dateStr) return "";
    return dayjs(dateStr).format("MMM DD, YYYY");
  };

  const handleSpecificChange = (newValue: string) => {
    setSpecificValue(newValue);
    onChange?.(newValue);
    setShowSpecificCalendar(false);
  };

  const handleRangeChange = (newRange: DateRange) => {
    if (isRangeInvalid(newRange.start, newRange.end)) {
      setRangeValidation("Start date cannot be after end date");
    } else {
      setRangeValidation("");
    }
    setRangeValue(newRange);
    onChange?.(newRange);
  };

  return (
    <div className="flex flex-col gap-1 w-full max-w-110">
      <BodyText weight="semibold" white={whiteLabel}>
        {label}
        {required && <span className="text-red-500">*</span>}
      </BodyText>

      {/* SPECIFIC DATE */}
      {dateType === "specific" && (
        <div className="relative" ref={specificInputRef}>
          <div
            onClick={() =>
              !disabled && setShowSpecificCalendar(!showSpecificCalendar)
            }
            className={baseClass}
            aria-invalid={!!validation || !!rangeValidation}
          >
            <div className="flex items-center justify-between">
              <BodyText textColor="text-neutral-600">
                {specificValue ? formatDisplayDate(specificValue) : placeholder}
              </BodyText>
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>
          {showSpecificCalendar && (
            <CalendarPicker
              value={specificValue}
              onChange={handleSpecificChange}
              onClose={() => setShowSpecificCalendar(false)}
              enableYearSelect={enableYearSelect}
              disabled={disabled}
            />
          )}
        </div>
      )}

      {/* DATE RANGE */}
      {dateType === "range" && (
        <div className="relative" ref={rangeInputRef}>
          <div
            onClick={() =>
              !disabled && setShowRangeCalendar(!showRangeCalendar)
            }
            className={baseClass}
            aria-invalid={!!validation || !!rangeValidation}
          >
            <div className="flex items-center justify-between">
              <BodyText textColor="text-neutral-600">
                {rangeValue.start && rangeValue.end
                  ? `${formatDisplayDate(rangeValue.start)} - ${formatDisplayDate(rangeValue.end)}`
                  : placeholder}
              </BodyText>
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>
          {showRangeCalendar && (
            <CalendarRangePicker
              value={rangeValue}
              onChange={handleRangeChange}
              onClose={() => setShowRangeCalendar(false)}
              disabled={disabled}
            />
          )}
        </div>
      )}

      {(validation || rangeValidation) && (
        <BodyText size="small" textColor="text-red-500">
          {validation || rangeValidation}
        </BodyText>
      )}
    </div>
  );
};

export default DateInputBase;
