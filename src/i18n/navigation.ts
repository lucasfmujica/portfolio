import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Locale-aware drop-in replacements for next/link + the navigation hooks.
// Import <Link>, useRouter, usePathname, redirect from here (not next/*) so
// links stay correct when more locales are added.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
