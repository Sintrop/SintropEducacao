import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function bigNumberToFloat(value: string): number {
  return parseFloat(String(value).replace("n", ""));
}
