import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleContactClick = () => {
  const email = "joyfulpettransportreservations@gmail.com";
  const subject = encodeURIComponent("Hello there");
  const body = encodeURIComponent("I would like to inquire about...");

  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;

  window.open(gmailUrl, "_blank");
};
