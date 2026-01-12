# Security Policy

## Supported Versions
This is a static, client-only website (HTML/CSS/JS) hosted on GitHub Pages.

We generally support the latest version on the `main` branch.

## Reporting a Vulnerability
If you find a security issue, please report it privately:

- Email: **YOUR_EMAIL_HERE**
- Or WhatsApp: **+994XXXXXXXXX** (if you prefer)

Please include:
- A clear description of the issue
- Steps to reproduce
- Screenshots (if helpful)
- Impact (what could an attacker do?)

We will respond as soon as possible and coordinate a fix.

## Scope / Notes
- This project does **not** have a backend or database.
- It uses **sessionStorage** in the browser tab only (clears when the tab closes).
- No accounts, no server-side storage.

### What *can* be security issues here?
- XSS / unsafe HTML injection
- Malicious links or open redirects
- Exposing sensitive personal info in the repo (phone numbers, keys, etc.)
- Supply-chain risks (if external scripts are added later)

### What is *out of scope*?
- Issues requiring server access (there is no server)
- “Lost data” from closing the tab (expected behavior)
