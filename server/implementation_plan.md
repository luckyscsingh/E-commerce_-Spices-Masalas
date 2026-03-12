# Production-Level MERN Ecommerce Backend Upgrade

Upgrade the existing spice store backend from a basic Express app to a production-grade architecture with proper MVC structure, Cloudinary image uploads, Redis cart caching, search/filter/pagination, and security hardening.

## Proposed Changes

### Config Layer

#### [NEW] [db.js](file:///c:/Users/lk502/OneDrive/Desktop/Codeofy/E-commerce_-Spices-Masalas/server/src/config/db.js)
MongoDB connection logic extracted from [server.js](file:///c:/Users/lk502/OneDrive/Desktop/Codeofy/E-commerce_-Spices-Masalas/server/server.js). Async function with graceful error handling.

#### [NEW] [cloudinary.js](file:///c:/Users/lk502/OneDrive/Desktop/Codeofy/E-commerce_-Spices-Masalas/server/src/config/cloudinary.js)
Configure and export Cloudinary SDK using `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` from [.env](file:///c:/Users/lk502/OneDrive/Desktop/Codeofy/E-commerce_-Spices-Masalas/server/.env).

#### [NEW] [redis.js](file:///c:/Users/lk502/OneDrive/Desktop/Codeofy/E-commerce_-Spices-Masalas/server/src/config/redis.js)
Create and export an `ioredis` client using `REDIS_URL` from [.env](file:///c:/Users/lk502/OneDrive/Desktop/Codeofy/E-commerce_-Spices-Masalas/server/.env). Includes connection error handling and graceful fallback logging.

---

### Utils

#### [NEW] [asyncHandler.js](file:///c:/Users/lk502/OneDrive/Desktop/Codeofy/E-commerce_-Spices-Masalas/server/src/utils/asyncHandler.js)
Higher-order function wrapping async route handlers to catch errors automatically and forward to `next()`.

#### [NEW] [AppError.js](file:///c:/Users/lk502/OneDrive/Desktop/Codeofy/E-commerce_-Spices-Masalas/server/src/utils/AppError.js)
Custom error class extending `Error` with `statusCode` and `isOperational` properties.

---

### Models (move to `src/models/`)

#### [MODIFY] [Product.js](file:///c:/Users/lk502/OneDrive/Desktop/Codeofy/E-commerce_-Spices-Masalas/server/src/models/Product.js)
- Add a `price` field (alias for `basePrice`, keeps backward compat)
- Add a MongoDB **text index** on [name](file:///c:/Users/lk502/OneDrive/Desktop/Codeofy/E-commerce_-Spices-Masalas/server/middleware/upload.js#9-13) and `description` for search
- Add a `cloudinaryId` field to store the Cloudinary public ID for image deletion

#### [MODIFY] [User.js](file:///c:/Users/lk502/OneDrive/Desktop/Codeofy/E-commerce_-Spices-Masalas/server/src/models/User.js)
Moved to `src/models/`. No functional changes — model is already production-quality.

#### [MODIFY] [Order.js](file:///c:/Users/lk502/OneDrive/Desktop/Codeofy/E-commerce_-Spices-Masalas/server/src/models/Order.js)
Moved to `src/models/`. No functional changes.

---

### Controllers (new `src/controllers/`)

#### [NEW] [productController.js](file:///c:/Users/lk502/OneDrive/Desktop/Codeofy/E-commerce_-Spices-Masalas/server/src/controllers/productController.js)
Extract product logic from routes. Functions:
- `getAllProducts` — supports `?category=`, `?search=`, `?page=&limit=` with paginated response `{ products, totalProducts, currentPage, totalPages }`
- `getProductById`
- `createProduct` — uploads image to Cloudinary, stores URL + cloudinaryId
- `updateProduct` — updates Cloudinary image if new file provided
- `deleteProduct` — deletes from Cloudinary + MongoDB

#### [NEW] [authController.js](file:///c:/Users/lk502/OneDrive/Desktop/Codeofy/E-commerce_-Spices-Masalas/server/src/controllers/authController.js)
Extract auth logic: `register`, `login`, `getProfile`, `adminLogin`.

#### [NEW] [adminController.js](file:///c:/Users/lk502/OneDrive/Desktop/Codeofy/E-commerce_-Spices-Masalas/server/src/controllers/adminController.js)
Extract admin logic: `getStats`, `getAllOrders`, `updateOrderStatus`.

#### [NEW] [orderController.js](file:///c:/Users/lk502/OneDrive/Desktop/Codeofy/E-commerce_-Spices-Masalas/server/src/controllers/orderController.js)
Extract order logic: `createOrder`, `getMyOrders`, `getOrderById`.

#### [NEW] [cartController.js](file:///c:/Users/lk502/OneDrive/Desktop/Codeofy/E-commerce_-Spices-Masalas/server/src/controllers/cartController.js)
Redis-backed cart operations:
- `addToCart` — `POST /api/cart` stores `{ productId, quantity }` in Redis hash by userId
- `removeFromCart` — `DELETE /api/cart/:productId`
- `getCart` — `GET /api/cart` returns all items in the user's Redis cart

---

### Middleware (move to `src/middleware/`)

#### [MODIFY] [auth.js](file:///c:/Users/lk502/OneDrive/Desktop/Codeofy/E-commerce_-Spices-Masalas/server/src/middleware/auth.js)
Moved to `src/middleware/`. Minor update to use `AppError` class.

#### [MODIFY] [upload.js](file:///c:/Users/lk502/OneDrive/Desktop/Codeofy/E-commerce_-Spices-Masalas/server/src/middleware/upload.js)
Switch from disk storage to **memory storage** (`multer.memoryStorage()`) so the buffer can be piped to Cloudinary. Keep file filter + 5MB limit.

#### [NEW] [errorHandler.js](file:///c:/Users/lk502/OneDrive/Desktop/Codeofy/E-commerce_-Spices-Masalas/server/src/middleware/errorHandler.js)
Global Express error handler. Handles `AppError` instances, Mongoose validation errors, cast errors, duplicate key errors, and JWT errors with proper status codes and messages.

---

### Routes (move to `src/routes/`)

All route files become thin — just `router.verb(path, middleware, controller)`.

#### [MODIFY] [productRoutes.js](file:///c:/Users/lk502/OneDrive/Desktop/Codeofy/E-commerce_-Spices-Masalas/server/src/routes/productRoutes.js)
#### [MODIFY] [authRoutes.js](file:///c:/Users/lk502/OneDrive/Desktop/Codeofy/E-commerce_-Spices-Masalas/server/src/routes/authRoutes.js)
#### [MODIFY] [adminRoutes.js](file:///c:/Users/lk502/OneDrive/Desktop/Codeofy/E-commerce_-Spices-Masalas/server/src/routes/adminRoutes.js)
#### [MODIFY] [orderRoutes.js](file:///c:/Users/lk502/OneDrive/Desktop/Codeofy/E-commerce_-Spices-Masalas/server/src/routes/orderRoutes.js)
#### [NEW] [cartRoutes.js](file:///c:/Users/lk502/OneDrive/Desktop/Codeofy/E-commerce_-Spices-Masalas/server/src/routes/cartRoutes.js)
New routes for Redis cart: `POST /`, `DELETE /:productId`, `GET /`.

---

### Server Entry

#### [MODIFY] [server.js](file:///c:/Users/lk502/OneDrive/Desktop/Codeofy/E-commerce_-Spices-Masalas/server/server.js)
- Add `helmet()` for security headers
- Add `morgan("dev")` for request logging
- Add `express-rate-limit` with 100 requests/15 min on API routes
- Mount cart routes at `/api/cart`
- Use `connectDB()` from config
- Add global error handler middleware at the end
- Update all route imports from `src/`

---

### Environment & Dependencies

#### [MODIFY] [.env](file:///c:/Users/lk502/OneDrive/Desktop/Codeofy/E-commerce_-Spices-Masalas/server/.env)
Add placeholders:
```
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
REDIS_URL=redis://localhost:6379
```

#### [MODIFY] [package.json](file:///c:/Users/lk502/OneDrive/Desktop/Codeofy/E-commerce_-Spices-Masalas/server/package.json)
```
npm install cloudinary ioredis helmet express-rate-limit morgan
```
Add `"dev": "npx nodemon server.js"` script.

---

## Verification Plan

### Automated Tests

1. **Server startup test** — Run `node server.js` and verify it starts without crashing (connect to MongoDB, logs "Server running").
   ```
   cd c:\Users\lk502\OneDrive\Desktop\Codeofy\E-commerce_-Spices-Masalas\server
   node server.js
   ```

2. **API smoke tests via curl**:
   ```bash
   # Health check
   curl http://localhost:5000/
   
   # Get all products (pagination)
   curl "http://localhost:5000/api/products?page=1&limit=5"
   
   # Search products
   curl "http://localhost:5000/api/products?search=turmeric"
   
   # Filter by category
   curl "http://localhost:5000/api/products?category=Spices"
   
   # Get product by ID
   curl http://localhost:5000/api/products/<product_id>
   ```

### Manual Verification

> [!IMPORTANT]
> Redis and Cloudinary require running services / valid credentials. After setting up the [.env](file:///c:/Users/lk502/OneDrive/Desktop/Codeofy/E-commerce_-Spices-Masalas/server/.env) with real Cloudinary keys and starting a Redis server, test:

1. **Cloudinary upload** — Use Postman/curl to `POST /api/products` with an image file and verify the returned `image` field is a Cloudinary URL.
2. **Redis cart** — Use Postman/curl to `POST /api/cart`, `GET /api/cart`, `DELETE /api/cart/:productId` and verify cart contents persist in Redis.
3. **Admin login** — Use `POST /api/admin/login` with admin credentials and verify a JWT token is returned, then use the token to access protected admin routes.
