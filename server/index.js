const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const data = require("./data");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
// Rasmlar base64 ko'rinishida JSON ichida keladi — limitni oshiramiz (5MB rasm ~6.7MB base64).
app.use(express.json({ limit: "10mb" }));

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "MegaMart API",
      version: "1.0.0",
      description:
        "Backend REST API for the MegaMart storefront (banners, products, categories, brands, daily essentials, footer).",
    },
    servers: [{ url: `http://localhost:${PORT}`, description: "Local server" }],
    components: {
      schemas: {
        Banner: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            eyebrow: { type: "string", example: "Best Deal Online on smart watches" },
            title: { type: "string", example: "SMART WEARABLE." },
            subtitle: { type: "string", example: "UP TO 80% OFF" },
            image: { type: "string" },
            bg: { type: "string", example: "#2b3450" },
          },
        },
        Product: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            name: { type: "string", example: "Galaxy S22 Ultra" },
            category: { type: "string", example: "Smartphones" },
            price: { type: "integer", example: 32999 },
            oldPrice: { type: "integer", example: 74999 },
            discount: { type: "integer", example: 56 },
            save: { type: "integer", example: 32999 },
            image: { type: "string" },
          },
        },
        Category: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            name: { type: "string", example: "Mobile" },
            image: { type: "string" },
          },
        },
        Brand: {
          type: "object",
          properties: {
            id: { type: "integer" },
            name: { type: "string" },
            title: { type: "string" },
            subtitle: { type: "string" },
            image: { type: "string" },
            bg: { type: "string" },
            color: { type: "string" },
          },
        },
        DailyEssential: {
          type: "object",
          properties: {
            id: { type: "integer" },
            name: { type: "string" },
            subtitle: { type: "string" },
            image: { type: "string" },
          },
        },
        Footer: {
          type: "object",
          properties: {
            brand: { type: "string" },
            contact: { type: "object" },
            popularCategories: { type: "array", items: { type: "string" } },
            customerServices: { type: "array", items: { type: "string" } },
            copyright: { type: "string" },
          },
        },
        User: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            login: { type: "string", example: "admin" },
            name: { type: "string", example: "Administrator" },
            role: { type: "string", enum: ["admin", "user"], example: "admin" },
          },
        },
      },
    },
  },
  apis: ["./index.js"],
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/api-docs.json", (_req, res) => res.json(swaggerSpec));

/**
 * @openapi
 * /:
 *   get:
 *     summary: API health/info
 *     tags: [Meta]
 *     responses:
 *       200:
 *         description: API is running
 */
app.get("/", (_req, res) => {
  res.json({
    name: "MegaMart API",
    docs: `http://localhost:${PORT}/api-docs`,
    endpoints: [
      "/api/banners",
      "/api/products",
      "/api/categories",
      "/api/brands",
      "/api/daily-essentials",
      "/api/nav-categories",
      "/api/footer",
    ],
  });
});

/**
 * @openapi
 * /api/banners:
 *   get:
 *     summary: Get hero banner slides
 *     tags: [Banners]
 *     responses:
 *       200:
 *         description: List of banners
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/Banner' }
 */
app.get("/api/banners", (_req, res) => res.json(data.banners));

/**
 * @openapi
 * /api/products:
 *   get:
 *     summary: Get products (optionally filter by category)
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema: { type: string }
 *         description: Filter by category name, e.g. "Smartphones"
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/Product' }
 */
app.get("/api/products", (req, res) => {
  const { category } = req.query;
  let list = data.products;
  if (category) {
    list = list.filter(
      (p) => p.category.toLowerCase() === String(category).toLowerCase()
    );
  }
  res.json(list);
});

/**
 * @openapi
 * /api/products/{id}:
 *   get:
 *     summary: Get a single product by id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: A product
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Product' }
 *       404:
 *         description: Not found
 */
app.get("/api/products/:id", (req, res) => {
  const product = data.products.find((p) => p.id === Number(req.params.id));
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
});

/**
 * @openapi
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, price]
 *             properties:
 *               name: { type: string, example: "Galaxy A54 (8GB | 128 GB)" }
 *               category: { type: string, example: "Smartphones" }
 *               price: { type: integer, example: 24999 }
 *               oldPrice: { type: integer, example: 38999 }
 *               discount: { type: integer, example: 35 }
 *               save: { type: integer, example: 14000 }
 *               image: { type: string }
 *     responses:
 *       201:
 *         description: Created product
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Product' }
 *       400:
 *         description: Validation error
 */
app.post("/api/products", (req, res) => {
  const { name, category, price, oldPrice, discount, save, image } =
    req.body || {};

  if (!name || price === undefined) {
    return res.status(400).json({ message: "name and price are required" });
  }

  const nextId = data.products.reduce((max, p) => Math.max(max, p.id), 0) + 1;
  const product = {
    id: nextId,
    name,
    category: category ?? "Smartphones",
    price: Number(price),
    oldPrice: oldPrice !== undefined ? Number(oldPrice) : Number(price),
    discount: discount !== undefined ? Number(discount) : 0,
    save: save !== undefined ? Number(save) : 0,
    image:
      image ??
      `https://picsum.photos/seed/${encodeURIComponent(name)}/400/400`,
  };

  data.products.push(product);
  data.save();
  res.status(201).json(product);
});

/**
 * @openapi
 * /api/products/{id}:
 *   patch:
 *     summary: Partially update an existing product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               category: { type: string }
 *               price: { type: integer }
 *               oldPrice: { type: integer }
 *               discount: { type: integer }
 *               save: { type: integer }
 *               image: { type: string }
 *     responses:
 *       200:
 *         description: Updated product
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Product' }
 *       404:
 *         description: Not found
 */
app.patch("/api/products/:id", (req, res) => {
  const product = data.products.find((p) => p.id === Number(req.params.id));
  if (!product) return res.status(404).json({ message: "Product not found" });

  const allowed = [
    "name",
    "category",
    "price",
    "oldPrice",
    "discount",
    "save",
    "image",
  ];
  const numeric = ["price", "oldPrice", "discount", "save"];

  for (const key of allowed) {
    if (req.body && req.body[key] !== undefined) {
      product[key] = numeric.includes(key)
        ? Number(req.body[key])
        : req.body[key];
    }
  }

  data.save();
  res.json(product);
});

/**
 * @openapi
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Deleted product
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Product' }
 *       404:
 *         description: Not found
 */
app.delete("/api/products/:id", (req, res) => {
  const index = data.products.findIndex((p) => p.id === Number(req.params.id));
  if (index === -1)
    return res.status(404).json({ message: "Product not found" });
  const [removed] = data.products.splice(index, 1);
  data.save();
  res.json(removed);
});

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     summary: Log in with login (username) and password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [login, password]
 *             properties:
 *               login: { type: string, example: "admin" }
 *               password: { type: string, example: "admin123" }
 *     responses:
 *       200:
 *         description: Authenticated user
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/User' }
 *       401:
 *         description: Invalid credentials
 */
app.post("/api/auth/login", (req, res) => {
  const { login, password } = req.body || {};
  const found = data.users.find(
    (u) => u.login === login && u.password === password
  );
  if (!found) {
    return res.status(401).json({ message: "Login yoki parol noto'g'ri" });
  }
  const { password: _pw, ...safe } = found;
  res.json(safe);
});

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     summary: Register a new (regular) user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [login, password]
 *             properties:
 *               name: { type: string, example: "John Doe" }
 *               login: { type: string, example: "john" }
 *               password: { type: string, example: "secret123" }
 *     responses:
 *       201:
 *         description: Created user
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/User' }
 *       409:
 *         description: Login already taken
 */
app.post("/api/auth/register", (req, res) => {
  const { name, login, password } = req.body || {};
  if (!login || !password) {
    return res.status(400).json({ message: "login va password majburiy" });
  }
  if (data.users.some((u) => u.login === login)) {
    return res.status(409).json({ message: "Bu login band" });
  }
  const nextId = data.users.reduce((max, u) => Math.max(max, u.id), 0) + 1;
  const newUser = {
    id: nextId,
    login,
    password,
    name: name || login,
    role: "user",
  };
  data.users.push(newUser);
  data.save();
  const { password: _pw, ...safe } = newUser;
  res.status(201).json(safe);
});

/**
 * @openapi
 * /api/categories:
 *   get:
 *     summary: Get top categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: List of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/Category' }
 */
app.get("/api/categories", (_req, res) => res.json(data.categories));

/**
 * @openapi
 * /api/brands:
 *   get:
 *     summary: Get top electronics brands
 *     tags: [Brands]
 *     responses:
 *       200:
 *         description: List of brands
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/Brand' }
 */
app.get("/api/brands", (_req, res) => res.json(data.brands));

/**
 * @openapi
 * /api/daily-essentials:
 *   get:
 *     summary: Get daily essentials
 *     tags: [DailyEssentials]
 *     responses:
 *       200:
 *         description: List of daily essentials
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/DailyEssential' }
 */
app.get("/api/daily-essentials", (_req, res) => res.json(data.dailyEssentials));

/**
 * @openapi
 * /api/nav-categories:
 *   get:
 *     summary: Get top navigation categories
 *     tags: [Meta]
 *     responses:
 *       200:
 *         description: List of nav category names
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { type: string }
 */
app.get("/api/nav-categories", (_req, res) => res.json(data.navCategories));

/**
 * @openapi
 * /api/footer:
 *   get:
 *     summary: Get footer content
 *     tags: [Meta]
 *     responses:
 *       200:
 *         description: Footer content
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Footer' }
 */
app.get("/api/footer", (_req, res) => res.json(data.footer));

app.listen(PORT, () => {
  console.log(`MegaMart API running on http://localhost:${PORT}`);
  console.log(`Swagger docs on http://localhost:${PORT}/api-docs`);
});
