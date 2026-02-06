# Static Hosting Guide

This project supports two deployment modes:

## 1. ICP (Internet Computer) Deployment (Default)

The default `index.html` loads the full ICP React application with Internet Identity authentication, admin panel, and control panel features.

**Entry point:** `frontend/index.html` → `frontend/src/main.tsx`

**Features:**
- Internet Identity authentication
- Admin panel (`/admin-panel/*`)
- Control panel (`/control/*`)
- Backend integration with Motoko canister
- Dynamic content management

**Deployment:**
