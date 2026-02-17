"use client";

import { FC, useState, useRef, useEffect } from "react";
import dayjs from "dayjs";
import BodyText from "../../../text/BodyText";
import { cn } from "@/lib/utils";

type CalendarPickerProps = {
  value: string;
  onChange: (date: string) => void;
  onClose: () => void;
  min?: string;
  max?: string;
  disabled?: boolean;
};

const CalendarPicker: FC<CalendarPickerProps> = ({
  value,
  onChange,
  onClose,
  min,
  max,
  disabled,
}) => {
  const [currentMonth, setCurrentMonth] = useState(() => {
    if (value) {
      return dayjs(value).startOf("month").toDate();
    }
    return dayjs().startOf("month").toDate();
  });

  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const getDaysInMonth = (date: Date) => {
    return dayjs(date).daysInMonth();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return dayjs(date).startOf("month").day();
  };

  const formatDate = (date: Date): string => {
    return dayjs(date).format("YYYY-MM-DD");
  };

  const isDateDisabled = (date: Date): boolean => {
    const dateStr = formatDate(date);
    if (min && dateStr < min) return true;
    if (max && dateStr > max) return true;
    return false;
  };

  const isDateSelected = (date: Date): boolean => {
    return value === formatDate(date);
  };

  const handleDateClick = (day: number) => {
    const date = dayjs(currentMonth).date(day).toDate();
    if (!isDateDisabled(date)) {
      onChange(formatDate(date));
      onClose();
    }
  };

  const handlePrevMonth = () => {
    setCurrentMonth(
      dayjs(currentMonth).subtract(1, "month").startOf("month").toDate(),
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      dayjs(currentMonth).add(1, "month").startOf("month").toDate(),
    );
  };

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);
  const days: (number | null)[] = Array(firstDay).fill(null);
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const todayStr = dayjs().format("YYYY-MM-DD");
  const currentMonthName = dayjs(currentMonth).format("MMMM");
  const currentYear = dayjs(currentMonth).format("YYYY");

  return (
    <div
      ref={calendarRef}
      className="absolute z-50 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 p-4 w-[320px]"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={handlePrevMonth}
          disabled={disabled}
          className="p-1 hover:bg-gray-100 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <BodyText weight="semibold">
          {currentMonthName} {currentYear}
        </BodyText>
        <button
          type="button"
          onClick={handleNextMonth}
          disabled={disabled}
          className="p-1 hover:bg-gray-100 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Week Days Header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day) => (
          <div key={day} className="text-center py-2">
            <BodyText size="small" className="text-gray-600 font-medium">
              {day}
            </BodyText>
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          if (day === null) {
            return <div key={`empty-${index}`} className="aspect-square" />;
          }

          const date = dayjs(currentMonth).date(day).toDate();
          const dateStr = formatDate(date);
          const isSelected = isDateSelected(date);
          const isDisabled = isDateDisabled(date);
          const isToday = dateStr === todayStr;

          return (
            <button
              key={day}
              type="button"
              onClick={() => handleDateClick(day)}
              disabled={isDisabled || disabled}
              className={cn(
                "aspect-square rounded-md transition-colors flex items-center justify-center",
                "hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300",
                isSelected &&
                  "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-400",
                !isSelected && !isDisabled && "hover:bg-gray-100 text-gray-900",
                isDisabled && "opacity-40 cursor-not-allowed text-gray-400",
                isToday &&
                  !isSelected &&
                  "border-2 border-blue-300 font-semibold",
              )}
            >
              <BodyText size="small">{day}</BodyText>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarPicker;
