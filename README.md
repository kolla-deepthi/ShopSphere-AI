# ShopSphere AI — Personalized Shopping, Powered by Intelligence

A responsive React + Vite e-commerce frontend built for a student project demo. It includes product discovery, search/filter/sort, product details, wishlist, cart, mock checkout, order tracking, reviews, local mock authentication, a rule-based shopping assistant, and an admin dashboard.

## Quick start

1. Install **Node.js LTS** from https://nodejs.org/ if it is not already installed.
2. Extract this ZIP file.
3. Open the extracted `shopsphere-ai` folder in VS Code.
4. Open **Terminal → New Terminal**.
5. Run:

   ```bash
   npm install
   npm run dev
   ```

6. Open the local URL shown in the terminal (normally `http://localhost:5173`).

For a production build, run `npm run build`.

## Demo access

- **Admin email:** `admin@shopsphere.ai`
- **Password:** any password with 4 or more characters
- Customer accounts can be created through Register.

This is mock authentication saved in your browser's local storage. Do not use real passwords or personal information.

## What works

- Product catalogue, search, category selection, price and rating filters, sorting and pagination.
- Product details, related products, wishlist and cart with local persistence.
- Demo checkout with address form and mock order creation.
- Order history and status progression in the admin view.
- Product reviews saved locally.
- Rule-based shopping assistant with budget/category/rating/affordability intent matching.
- Admin dashboard with simulated revenue, stock alerts, product CRUD, order status changes, and recommendation strategy overview.
- Responsive layouts for desktop, tablet and mobile.

## Data and architecture notes

- The app attempts to load products from the public DummyJSON products API. If the request fails or the network is unavailable, seeded sample products remain available.
- Cart, wishlist, mock session, orders, reviews, and assistant analytics are stored in browser `localStorage`.
- Checkout is simulated. No payment provider is connected and no real payment is collected.
- Recommendation behavior is rule-based and explainable. The admin screen lists nine strategy modules; some strategies are mock representations rather than trained recommender models.
- Admin analytics are local demo analytics. Revenue and conversion are not real business metrics.
- This project uses React + Vite and plain CSS (rather than the Next.js/Tailwind stack suggested as an option in the brief) to keep the implementation straightforward.

## Suggested submission checklist

- [ ] Test the main user flows locally.
- [ ] Take screenshots at desktop, tablet, and mobile widths.
- [ ] Add any required architecture/API/testing documentation from your assignment.
- [ ] Push the project to GitHub.
- [ ] Deploy the `dist` build to a free static host (for example, Netlify or Vercel).
- [ ] Add the live deployment URL and demo video/presentation if required by your evaluator.

## Known limitations

This is a frontend demo, not a production commerce platform. It has no real backend, database, payment integration, secure authentication, inventory reservation, or live recommendation model. Browser local storage is device/browser-specific. The public DummyJSON API may return product fields/categories that vary from the seeded demo data.
