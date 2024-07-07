// import { type ClassValue, clsx } from "clsx"
// import { twMerge } from "tailwind-merge"

// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs))
// }
// src/lib/utils.ts
export const cn = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ');
};