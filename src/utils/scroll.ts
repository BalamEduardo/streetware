/**
 * Simple smooth scroll utility
 * Professional implementation using native browser APIs
 */

export function smoothScrollTo(target: string) {
  const element = document.querySelector(target);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest'
    });
  }
}
