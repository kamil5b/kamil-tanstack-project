import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function camelToCapitalSpaced(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1 $2') // Insert space between lC and UC
    .replace(/^./, (match) => match.toUpperCase()); // Capitalize first letter
};