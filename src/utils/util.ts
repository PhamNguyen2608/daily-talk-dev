import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  try {
    const mergedClasses = twMerge(clsx(inputs));

    if (process.env.NODE_ENV === "development") {
      console.debug("[cn Debug]:", { inputs, mergedClasses });
    }

    return mergedClasses;
  } catch (error) {
    console.error("[cn Error]: Failed to process class names.", { inputs, error });
    return ""; 
  }
}
