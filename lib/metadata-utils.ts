import type { Viewport } from "next";

/**
 * Shared viewport configuration for all pages
 * This should be imported and used in each page's metadata.ts file
 */
export const sharedViewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};
