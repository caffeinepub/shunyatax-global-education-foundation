# Specification

## Summary
**Goal:** Hide the global site header only on admin panel routes under `/admin-panel/*`, without impacting public pages or the `/admin` login route.

**Planned changes:**
- Update the shared public Layout to detect routes that start with `/admin-panel` and conditionally not render the global Header component on those routes.
- Ensure the Header continues to render unchanged on all other routes, including public pages and `/admin` (admin login).
- Verify the admin panel’s own UI elements (e.g., AdminLayout mobile header/sidebar) remain intact and visually unaffected.

**User-visible outcome:** When visiting any `/admin-panel/*` page, the global site header is hidden; on all other pages (including `/admin`), the header appears exactly as before.
