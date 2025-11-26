import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
  const dateString = String(date);

  let targetDate = new Date(dateString);

  // Check if targetDate is a valid date
  if (isNaN(targetDate.getTime())) {
    return ""; // Return empty string for invalid dates
  }

  const year = targetDate.getFullYear();
  const month = String(targetDate.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
  const day = String(targetDate.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}
