# Specification

## Summary
**Goal:** Restore working admin access by fixing the `/admin` redirect, enforcing Internet Identity + backend role checks for `/admin-panel/*`, and enabling granting admin rights to `nikhil44soni7@gmail.com` via an email-to-principal association.

**Planned changes:**
- Fix frontend routing so authenticated admins visiting `/admin` are redirected to `/admin-panel/dashboard`, and remove any navigation to `/admin/dashboard`.
- Protect `/admin-panel/*` with Internet Identity authentication and backend admin-role authorization (replacing the current sessionStorage/hardcoded gate) and show clear messages for unauthenticated/non-admin users.
- Add backend support to associate/save an email address to the caller’s Internet Identity principal.
- Add an admin-only backend method to assign the `#admin` role by email once the email is associated, and expose a UI path for an existing admin to grant admin rights to `nikhil44soni7@gmail.com`.

**User-visible outcome:** Admins can reliably reach the admin dashboard at `/admin-panel/dashboard`, non-admins see clear guidance instead of crashes/authorization traps, and an existing admin can grant admin access to `nikhil44soni7@gmail.com` so that account is recognized as admin after Internet Identity login.
