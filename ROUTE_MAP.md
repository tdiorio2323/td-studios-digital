# Route Map

This document provides a comprehensive overview of the routing structure for the TD Studios Cannabis Menu React application.

## Architecture Overview

The application uses React Router DOM with a dual routing architecture:

1. **CoreLayout Routes** - TD Studios main website with unified header/footer
2. **Standalone Routes** - Cannabis app functionality and brand pages without layout
3. **Developer Routes** - Development tools and builders
4. **Dynamic Routes** - Parameterized routes for auth cards

## Route Categories

### 1. CoreLayout Routes (TD Studios Main Site)

These routes use the CoreLayout wrapper (`src/layouts/CoreLayout.tsx`) which provides:
- Sticky header with TD STUDIOS logo
- Navigation menu: HOME, WEB, DEV, SOCIAL, PORTFOLIO, CONTACT
- Shopping cart integration (on shop/checkout pages)
- Footer with company information

```
/ (CoreLayout)
├── / → Home (index route)
├── /web → Web
├── /dev → Dev
├── /social → Social
├── /portfolio → Portfolio
├── /shop → Shop
├── /mylar-designs → MylarDesigns
├── /custom-designs → CustomDesigns
├── /social-content → SocialMediaContent
├── /digital-assets → DigitalAssets
├── /custom-mylar-form → CustomMylarForm
├── /custom-websites → CustomWebsiteForm
├── /referral → Referral
├── /contact → Contact
├── /custom-design-form → CustomDesignForm
└── /checkout → Checkout
```

### 2. Cannabis App Routes (Standalone)

Administrative and authentication routes without CoreLayout:

```
/admin → Admin (SuperAdminDashboard)
/brand → Brand (BrandDashboard)
/auth → Auth (Authentication page)
```

### 3. Brand Routes (Standalone)

Individual brand/dispensary pages without CoreLayout:

```
/tdstudios → Tdlist
/bagman_ny → BagmanNy
/punkiez → Punkiez
/tdlinkage → MbDesigns
/tddesigns → TdDesigns
/quickprintz → Quickprintz
/quickprintz/form → QuickprintzForm (nested route)
/katya → Katya
/karol → Karol
/luci → Luci
/willow → Willow
/eldondolla → EldonDolla
/bagmanform → BagmanForm
/show → Show
/tdreferall → TdReferral
```

### 4. Developer Routes (Standalone)

Development tools accessible in development mode:

```
/__builder → Builder (Page builder interface)
/__auth-builder → AuthBuilder (Auth card builder)
/__card-editor → MassCardEditor (Mass card editor)
/__components → ComponentLibrary (Component library)
/__ping → Simple router test endpoint
```

### 5. Dynamic Routes

Parameterized routes that handle dynamic content:

```
/:slug → DynamicAuthCard (Catches any slug for auth cards)
```

**Dynamic Route Details:**
- Uses `useParams<{ slug: string }>()` to extract slug parameter
- Looks up auth card data from `src/data/authCards.json`
- Falls back to "Card Not Found" if slug doesn't match any auth card
- **Important:** This route is positioned ABOVE the catch-all `*` route but BELOW all specific routes to prevent conflicts

### 6. Catch-All Route

```
/* → NotFound (404 page for unmatched routes)
```

## Route Hierarchy Tree

```
App (Root)
├── ErrorBoundary
├── QueryClientProvider
├── TooltipProvider
├── CartProvider
└── Routes
    ├── CoreLayout Routes
    │   ├── / (Home - index route)
    │   ├── /web (Web)
    │   ├── /dev (Dev)
    │   ├── /social (Social)
    │   ├── /portfolio (Portfolio)
    │   ├── /shop (Shop)
    │   ├── /mylar-designs (MylarDesigns)
    │   ├── /custom-designs (CustomDesigns)
    │   ├── /social-content (SocialMediaContent)
    │   ├── /digital-assets (DigitalAssets)
    │   ├── /custom-mylar-form (CustomMylarForm)
    │   ├── /custom-websites (CustomWebsiteForm)
    │   ├── /referral (Referral)
    │   ├── /contact (Contact)
    │   ├── /custom-design-form (CustomDesignForm)
    │   └── /checkout (Checkout)
    ├── Cannabis App Routes (Standalone)
    │   ├── /admin (Admin)
    │   ├── /brand (Brand)
    │   └── /auth (Auth)
    ├── Brand Routes (Standalone)
    │   ├── /tdstudios (Tdlist)
    │   ├── /bagman_ny (BagmanNy)
    │   ├── /punkiez (Punkiez)
    │   ├── /tdlinkage (MbDesigns)
    │   ├── /tddesigns (TdDesigns)
    │   ├── /quickprintz (Quickprintz)
    │   ├── /quickprintz/form (QuickprintzForm)
    │   ├── /katya (Katya)
    │   ├── /karol (Karol)
    │   ├── /luci (Luci)
    │   ├── /willow (Willow)
    │   ├── /eldondolla (EldonDolla)
    │   ├── /bagmanform (BagmanForm)
    │   ├── /show (Show)
    │   └── /tdreferall (TdReferral)
    ├── Developer Routes (Standalone)
    │   ├── /__builder (Builder)
    │   ├── /__auth-builder (AuthBuilder)
    │   ├── /__card-editor (MassCardEditor)
    │   ├── /__components (ComponentLibrary)
    │   └── /__ping (Router test)
    ├── Dynamic Routes
    │   └── /:slug (DynamicAuthCard)
    └── Catch-All
        └── /* (NotFound)
```

## Component Import Map

### Pages Directory (`src/pages/`)

All page components are imported directly from their respective files:

| Route | Component File | Import Path |
|-------|---------------|-------------|
| `/` | Home.tsx | `./pages/Home` |
| `/admin` | Admin.tsx | `./pages/Admin` |
| `/auth` | Auth.tsx | `./pages/Auth` |
| `/brand` | Brand.tsx | `./pages/Brand` |
| `/shop` | Shop.tsx | `./pages/Shop` |
| `/checkout` | Checkout.tsx | `./pages/Checkout` |
| `/web` | Web.tsx | `./pages/Web` |
| `/dev` | Dev.tsx | `./pages/Dev` |
| `/social` | Social.tsx | `./pages/Social` |
| `/portfolio` | Portfolio.tsx | `./pages/Portfolio` |
| `/contact` | Contact.tsx | `./pages/Contact` |
| `/referral` | Referral.tsx | `./pages/Referral` |
| `/mylar-designs` | MylarDesigns.tsx | `./pages/MylarDesigns` |
| `/custom-designs` | CustomDesigns.tsx | `./pages/CustomDesigns` |
| `/social-content` | SocialMediaContent.tsx | `./pages/SocialMediaContent` |
| `/digital-assets` | DigitalAssets.tsx | `./pages/DigitalAssets` |
| `/custom-mylar-form` | CustomMylarForm.tsx | `./pages/CustomMylarForm` |
| `/custom-websites` | CustomWebsiteForm.tsx | `./pages/CustomWebsiteForm` |
| `/custom-design-form` | CustomDesignForm.tsx | `./pages/CustomDesignForm` |
| `/__builder` | Builder.tsx | `./pages/Builder` |
| `/__auth-builder` | AuthBuilder.tsx | `./pages/AuthBuilder` |
| `/:slug` | DynamicAuthCard.tsx | `./pages/DynamicAuthCard` |
| `/tdstudios` | Tdlist.tsx | `./pages/Tdlist` |
| `/bagman_ny` | BagmanNy.tsx | `./pages/BagmanNy` |
| `/punkiez` | Punkiez.tsx | `./pages/Punkiez` |
| `/tdlinkage` | MbDesigns.tsx | `./pages/MbDesigns` |
| `/tddesigns` | TdDesigns.tsx | `./pages/TdDesigns` |
| `/quickprintz` | Quickprintz.tsx | `./pages/Quickprintz` |
| `/quickprintz/form` | QuickprintzForm.tsx | `./pages/QuickprintzForm` |
| `/katya` | Katya.tsx | `./pages/Katya` |
| `/karol` | Karol.tsx | `./pages/Karol` |
| `/luci` | Luci.tsx | `./pages/Luci` |
| `/willow` | Willow.tsx | `./pages/Willow` |
| `/eldondolla` | EldonDolla.tsx | `./pages/EldonDolla` |
| `/bagmanform` | BagmanForm.tsx | `./pages/BagmanForm` |
| `/show` | Show.tsx | `./pages/Show` |
| `/tdreferall` | TdReferral.tsx | `./pages/TdReferral` |
| `/*` | NotFound.tsx | `./pages/NotFound` |

### Components Directory (`src/components/`)

Key components imported for routing functionality:

| Component | Import Path | Usage |
|-----------|-------------|-------|
| CustomerApp | `./components/CustomerApp` | Cannabis shopping interface |
| AuthPage | `./components/AuthPage` | Authentication handling |
| CheckoutFlow | `./components/CheckoutFlow` | Purchase process |
| SuperAdminDashboard | `./components/SuperAdminDashboard` | Admin management |
| BrandDashboard | `./components/BrandDashboard` | Brand/dispensary management |
| MassCardEditor | `./components/MassCardEditor` | Bulk card editing tool |
| ComponentLibrary | `./components/ComponentLibrary` | Component showcase |
| ErrorBoundary | `./components/ErrorBoundary` | Error handling wrapper |

### Layouts Directory (`src/layouts/`)

| Layout | Import Path | Usage |
|--------|-------------|-------|
| CoreLayout | `./layouts/CoreLayout` | TD Studios unified layout wrapper |

## Authentication & Access Control

### Role-Based Routing

The application implements role-based access through Supabase authentication:

- **Admin Role** → `/admin` dashboard (SuperAdminDashboard)
- **Brand Role** → `/brand` dashboard (BrandDashboard)
- **Customer/Default** → TD Studios pages with shopping functionality

### Protected Routes

- `/admin` - Requires admin role
- `/brand` - Requires brand role
- Developer routes (`/__*`) - Development environment only

## Navigation Patterns

### CoreLayout Navigation

The CoreLayout provides consistent navigation across TD Studios pages:

```typescript
const navigationLinks = [
  { to: "/", label: "HOME" },
  { to: "/web", label: "WEB" },
  { to: "/dev", label: "DEV" },
  { to: "/social", label: "SOCIAL" },
  { to: "/portfolio", label: "PORTFOLIO" },
  { to: "/contact", label: "CONTACT" },
];
```

### Cart Integration

Shopping cart functionality is integrated into:
- `/shop` - Product browsing and cart management
- `/checkout` - Purchase completion
- CoreLayout header shows cart count on these pages

### Mobile Navigation

- Hamburger menu with slide-out navigation
- Body scroll lock when mobile menu is open
- Cart access through mobile menu on enabled pages

## Dynamic Route Parameters

### DynamicAuthCard Route (`/:slug`)

**Parameters:**
- `slug: string` - Extracted using `useParams<{ slug: string }>()`

**Data Source:**
- Looks up auth card data from `src/data/authCards.json`
- Matches `slug` parameter against `card.slug` property

**Fallback Behavior:**
- Displays "Card Not Found" message if slug doesn't match
- Returns 404-style error page with slug information

## Key Files

| File | Purpose |
|------|---------|
| `src/App.tsx` | Main routing configuration |
| `src/layouts/CoreLayout.tsx` | TD Studios unified layout |
| `src/pages/*.tsx` | Individual page components |
| `src/components/ErrorBoundary.tsx` | Application error handling |
| `src/hooks/useCart.tsx` | Global cart state management |
| `src/data/authCards.json` | Auth card data for dynamic routes |

## Route Resolution Priority

Routes are resolved in this order (first match wins):

1. **Exact CoreLayout Routes** - `/`, `/shop`, `/contact`, etc.
2. **Standalone App Routes** - `/admin`, `/brand`, `/auth`
3. **Brand Routes** - `/tdstudios`, `/bagman_ny`, etc.
4. **Developer Routes** - `/__builder`, `/__auth-builder`, etc.
5. **Dynamic Auth Card Route** - `/:slug` (catches any unmatched slug)
6. **Catch-All Route** - `/*` (404 for everything else)

## Development Notes

- All routes are defined in `src/App.tsx`
- CoreLayout routes use React Router's nested routing with `<Outlet />`
- Cart state persists across CoreLayout routes via `CartProvider`
- Mobile-responsive navigation with body scroll locking
- Error boundaries wrap the entire application for robust error handling
- TypeScript types are generated for Supabase integration in `src/supabase/types.ts`