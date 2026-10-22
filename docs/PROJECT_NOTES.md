# Project notes and demo checklist

## Main routes
- `/` — storefront, product discovery and search
- `/product/:id` — product details, related products and reviews
- `/cart` — quantity changes and removal
- `/wishlist` — saved products
- `/login` and `/register` — local mock session
- `/checkout` — mock delivery form and order placement
- `/orders` — order history and status timeline
- `/account` — account summary
- `/admin` — admin-only dashboard, product CRUD, order status and recommendation analytics

## Demo scenario
1. Open the storefront and filter by audio.
2. Search for headphones and add one to the bag.
3. Save a second product to wishlist.
4. Open the AI assistant and ask “Headphones under ₹3000”.
5. Add a review from a product detail page.
6. Register or sign in, then place a demo order.
7. Open orders to show the order record.
8. Sign out, sign in as `admin@shopsphere.ai` with any 4+ character password, and show the dashboard.
9. Edit/add a product and update an order status.
10. Resize the browser to check mobile responsiveness.

## Before submission
- Run `npm run build` and fix any reported build errors.
- Test with network available and with API unavailable.
- Do not claim the checkout, login, analytics, or recommender are production services.
- Capture screenshots at approximately 1440px desktop, 768px tablet and 390px mobile widths.
