# Specification

## Summary
**Goal:** Update both ICP and non-ICP Home page hero sections to use the last three uploaded images instead of the currently hardcoded hero image sources.

**Planned changes:**
- Replace the `heroImages` array sources in `frontend/src/pages/HomePage.tsx` with the last 3 uploaded image files.
- Replace the `heroImages` array sources in `frontend/src/nonicp/pages/HomePage.jsx` with the same last 3 uploaded image files.
- Keep the hero section layout/animations and the 3-image structure unchanged (1 large top image, 2 smaller bottom images).

**User-visible outcome:** The Home page hero section (both ICP and non-ICP versions) displays the newly uploaded last-three images with no broken/404 images, while the layout and animations remain the same.
