# eBazaar Frontend

This README is the source-of-truth for the current code in this repository.

## 1. Project Overview

`eBazaar` is a frontend e-commerce web app built with React and Vite.

Current scope in this repository:
- Product listing and product detail pages
- Cart management with Redux Toolkit + persisted cart
- Google sign-in using Firebase Authentication
- Stripe checkout trigger from the cart page
- GitHub Pages deployment support

Important: this repository is frontend-only. It consumes:
- Public product API: `https://fakestoreapiserver.reactbd.com/products`
- Payment backend endpoint: `https://eBazaar-api-backend/pay` (external; not included here)

## 2. Current Feature Set (As Implemented)

- Browse products (home/shop) from loader-fetched API data
- Product detail route using slug-like title id
- Add to cart from listing and detail pages
- Increase/decrease/remove cart items
- Persist cart and signed-in user in local storage (`redux-persist`)
- Google sign-in/sign-out flow
- Checkout button with Stripe popup (`react-stripe-checkout`)
- Responsive header with desktop and mobile navigation
- Light/dark theme toggle (UI state in layout component)
- Static footer links to a "Page Under Construction" route

## 3. Architecture Summary

### Frontend Runtime
- React 19 + Vite 7
- React Router data router (`createBrowserRouter`, route `loader`)
- Redux Toolkit for global app state
- `redux-persist` for local persistence
- Tailwind CSS v4 for styling
- Axios for HTTP calls

### App Flow
1. `src/main.jsx` boots app and wraps it in Redux `Provider` + `PersistGate`.
2. `src/App.jsx` defines router, shared `Layout` (Header/Outlet/Footer), and route loaders.
3. `src/api/Api.jsx` fetches product data for `Home` and `Product`.
4. `Home` passes products to grid components.
5. `ProductCard`/`Product` dispatch `addToCart` to Redux slice.
6. `Cart` computes totals from Redux state and triggers Stripe checkout/token callback.
7. `Login` handles Google authentication and stores user info in Redux.

## 4. Tech Stack

### Core
- `react`, `react-dom`
- `vite`, `@vitejs/plugin-react`
- `react-router-dom`
- `@reduxjs/toolkit`, `react-redux`
- `redux-persist`
- `tailwindcss`, `@tailwindcss/vite`
- `axios`
- `firebase`
- `react-stripe-checkout`
- `react-toastify`
- `react-icons`, `lucide-react`

### Tooling
- ESLint 9 with `@eslint/js`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`
- GitHub Pages deploy via `gh-pages`

### Installed but not currently used in source code
- `dotenv`
- `prop-types`
- `react-icon`

## 5. Routes Map

Defined in `src/App.jsx`:

- `/` -> `Home` (loader: `productsData`)
- `/shop` -> `Home` (loader: `productsData`)
- `/product/:id` -> `Product` (loader: `productsData`)
- `/cart` -> `Cart`
- `/login` -> `Login`
- `/not-available` -> static "Page Under Construction"

Router `basename` is `/eBazaar`, and Vite `base` is `/eBazaar/` for GitHub Pages hosting.

## 6. State Management

Slice: `src/redux/bazarSlice.jsx`

State shape:
- `productData: []`
- `userInfo: null | { _id, name, email, image }`

Actions:
- Cart: `addToCart`, `increamentQuantity`, `decrementQuantity`, `deleteItem`, `resetCart`
- User: `addUser`, `removeUser`

Persistence:
- Configured in `src/redux/store.jsx` using `redux-persist/lib/storage` (local storage)

## 7. External Services and API Contracts

### Product API
- URL: `https://fakestoreapiserver.reactbd.com/products`
- Used by route loader in `src/api/Api.jsx`
- Expected response usage: `response.data` array of product objects with fields like:
  - `_id`, `title`, `image`, `price`, `oldPrice`, `description`, `category`, `isNew`

### Firebase Auth
- Config in `src/firebase.config.js`
- Used for Google sign-in/out in `src/pages/Login.jsx`

### Payment API
- Frontend posts to: `https://eBazaar-api-backend/pay`
- Payload currently: `{ amount: totalAmt * 100, token }`
- This backend is required for successful checkout and is not part of this repo

## 8. Environment Variables

Create a `.env` at repository root:

```bash
VITE_APP_FIREBASE_API_KEY=your_key
VITE_APP_FIREBASE_AUTH_DOMAIN=your_domain
VITE_APP_FIREBASE_PROJECT_ID=your_project_id
VITE_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_APP_FIREBASE_APP_ID=your_app_id

# Current code expects this exact name in firebase.config.js:
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
```

Note: with Vite, variables usually use `VITE_` prefix. Current code uses `REACT_APP_FIREBASE_MESSAGING_SENDER_ID`; either keep this variable name for now or refactor code to `VITE_APP_FIREBASE_MESSAGING_SENDER_ID`.

## 9. How To Start Everything

### Prerequisites

- Node.js (20+ recommended for Vite 7)
- npm

### Install

```bash
npm install
```

If you get `'vite' is not recognized`, dependencies are not installed yet. Run `npm install`.

### Run Frontend (Development)

```bash
npm run dev
```

Because base path is `/eBazaar/`, use:
- `http://localhost:5173/eBazaar/`

### Build Frontend (Production)

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Deploy to GitHub Pages

```bash
npm run deploy
```

This runs:
- `predeploy`: `npm run build`
- `deploy`: `gh-pages -d dist`

Ensure `homepage` in `package.json` stays aligned with your GitHub Pages URL.

### Start "Everything" (Frontend + Required Services)

For full user journey (including login and payment), you need:
1. Frontend app from this repo
2. Firebase project configured with Google Auth provider enabled
3. Reachable payment backend implementing `/pay`

Without (3), checkout requests will fail even though cart UI works.

## 10. Project Structure

```text
eBazaar/
  public/
    m-icon.svg
    vite.svg
  src/
    api/
      Api.jsx
    assets/
      react.svg
    components/
      Banner.jsx
      CartItem.jsx
      Footer.jsx
      Header.jsx
      HeroSection.css
      Newnav.css
      newnav.jsx
      Product.jsx
      ProductCard.jsx
      Products.jsx
    pages/
      Cart.jsx
      Home.jsx
      Login.jsx
    redux/
      bazarSlice.jsx
      store.jsx
    App.css
    App.jsx
    firebase.config.js
    index.css
    main.jsx
    postcss.config.js
    tailwind.config.js
  .gitignore
  eslint.config.js
  index.html
  package-lock.json
  package.json
  README.md
  vite.config.js
```

## 11. Module Reference (File-by-File)

### Root

- `package.json`: scripts, dependencies, deploy metadata (`homepage`)
- `vite.config.js`: React + Tailwind plugin, `base: "/eBazaar/"`
- `eslint.config.js`: lint rules for JS/JSX
- `index.html`: HTML template and root mount
- `.gitignore`: excludes env, build artifacts, editor files

### App Bootstrap

- `src/main.jsx`: app entrypoint, Redux provider, persisted state gate
- `src/App.jsx`: layout, dark mode toggle state, router and routes
- `src/index.css`: Tailwind import entry
- `src/App.css`: currently empty

### Config

- `src/firebase.config.js`: Firebase app initialization from env variables
- `src/tailwind.config.js`: Tailwind content config
- `src/postcss.config.js`: PostCSS plugin config

### API Layer

- `src/api/Api.jsx`: axios loader function fetching product list

### Redux

- `src/redux/store.jsx`: persisted Redux store configuration
- `src/redux/bazarSlice.jsx`: cart and user reducers/actions

### Pages

- `src/pages/Home.jsx`: receives loader data and renders banner + product grid
- `src/pages/Cart.jsx`: cart totals, checkout guard, Stripe payment trigger
- `src/pages/Login.jsx`: Google sign-in and sign-out UI/logic

### Components

- `src/components/Header.jsx`: fixed top nav, cart badge, auth link, theme toggle
- `src/components/newnav.jsx`: mobile hamburger menu with links/cart badge
- `src/components/Newnav.css`: custom hamburger and menu styles
- `src/components/Banner.jsx`: slide carousel with CTA links
- `src/components/Products.jsx`: product section wrapper + map to cards
- `src/components/ProductCard.jsx`: card UI, product detail navigation, add-to-cart action
- `src/components/Product.jsx`: product detail page, quantity selector, add-to-cart
- `src/components/CartItem.jsx`: cart line items, quantity controls, remove flow, empty state
- `src/components/Footer.jsx`: footer nav and branding
- `src/components/HeroSection.css`: unused CSS file (legacy/unused asset)

### Assets

- `public/m-icon.svg`: favicon/logo mark
- `public/vite.svg`: default Vite asset
- `src/assets/react.svg`: default React asset (currently unused by active UI)

## 12. Known Gaps and Technical Debt (Current State)

- README before this update was out of sync with actual codebase
- `firebase.config.js` logs API key in console (should be removed)
- Mixed env naming (`REACT_APP_...` inside Vite project)
- Stripe public test key hardcoded in `src/pages/Cart.jsx`
- Payment backend URL hardcoded (should use env-based API base URL)
- No loading/error/empty states for product API failures
- No protected routes for checkout/account pages
- No backend order lifecycle in this repo
- No automated tests yet (unit/integration/e2e)
- No CI pipeline or quality gate defined in repo

## 13. Next Phase Development Roadmap (Toward Production)

Use this as a practical implementation plan.

### Phase 1: Stabilize Core (Immediate)

- Move all service keys/URLs to env variables
- Fix Firebase messaging sender env naming to Vite convention
- Remove sensitive debug logs
- Introduce central API client with base URL + interceptors
- Add robust loading/error UI states for all async screens
- Add route-level error boundaries in React Router
- Add TypeScript migration plan (or strong runtime validation)

### Phase 2: Commerce MVP Backend Integration

- Build/attach real backend (Node/Nest/Go/etc.) with:
  - Product catalog service
  - User accounts and sessions
  - Cart persistence server-side
  - Orders and payments service
  - Inventory and stock reservation
- Replace fake store API with owned product APIs
- Replace `react-stripe-checkout` flow with Stripe Payment Intents + webhook-confirmed orders
- Persist orders and show order history in UI

### Phase 3: User and Catalog Experience

- Advanced product search (text + filters + sort + pagination)
- Product variants (size/color), SKU-based inventory
- Wishlist and recently viewed items
- Product reviews and ratings (moderated)
- Personalization/recommendations
- Saved addresses and profile management

### Phase 4: Admin and Operations

- Admin dashboard:
  - Product CRUD
  - Inventory adjustments
  - Price/discount management
  - Order management and fulfillment statuses
- Role-based access control (admin/support/customer)
- Audit logs for critical business actions

### Phase 5: Production-Grade Engineering

- Testing:
  - Unit tests (reducers, utilities, components)
  - Integration tests (page flows)
  - End-to-end tests (login, add-to-cart, checkout)
- CI/CD:
  - Lint + test + build gates on pull requests
  - Automated preview deployments
  - Automated production deployment with rollback strategy
- Observability:
  - Structured logging
  - Error tracking (Sentry)
  - Metrics and dashboards (latency, conversion funnel, failures)
- Performance:
  - Image optimization/CDN
  - Route-based code splitting
  - Caching strategy and API optimization
  - Lighthouse targets and bundle budgets

### Phase 6: Security, Compliance, and Scale

- Security:
  - HTTP security headers and CSP
  - Input validation/sanitization
  - Rate limiting and abuse detection
  - Secret management via vault/provider
- Compliance:
  - Privacy policy and cookie consent
  - PCI scope reduction (tokenized checkout)
  - Regional tax and invoicing support
- Scale:
  - Stateless services + queue-driven order processing
  - Database indexing and read/write patterns
  - Multi-region readiness for high traffic

## 14. Production Feature Checklist

Use this as a one-page target list:

- Authentication (email, social, MFA, password reset)
- Authorization (RBAC + protected APIs/routes)
- Product catalog with variants, stock, media management
- Search/filter/sort/pagination
- Wishlist and recommendations
- Cart persistence across devices
- Secure checkout with webhook-verified payment
- Tax, shipping, coupons, and invoices
- Order history, tracking, cancellation, returns
- Admin panel for catalog/orders/users/promotions
- Notifications (email/SMS/push)
- Analytics and event instrumentation
- Accessibility (WCAG), SEO metadata, structured data
- Internationalization and multi-currency
- Testing pyramid + CI/CD pipelines
- Monitoring, alerting, and incident response
- Backup/restore and disaster recovery plan

## 15. Recommended Immediate Action Items

1. Add `.env` and remove hardcoded keys/URLs.
2. Stand up or connect the real payment backend for `/pay`.
3. Add test baseline (Redux slice + cart page integration).
4. Add CI with lint/build/test before any further feature expansion.
