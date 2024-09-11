// import { Hono } from "hono";
// // Import routes
// import { Routes } from "./routes/CategoriesRoutes";
// // Initialization of Hono app using route /api
// const app = new Hono();

// app.route("/api", CategoriesRoutes);
// app.route("/api", Routes);

// export default app;

import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import { categoriesRoute } from "./routes/CategoriesRoutes";
import { sitesRoute } from "./routes/SitesRoutes";
// import { contactsRoute } from "./routes/ContactRoutes";
// import { HomePage } from "./homepage";

export default new OpenAPIHono({ strict: false })
  .route("/api/categories", categoriesRoute)
  .route("/api/sites", sitesRoute)
  // .route("/api/contacts", contactsRoute)

  // OpenAPI documentation
  .doc31("/doc", {
    openapi: "3.1.0",
    info: {
      version: "1.0.0",
      title: "Muslim Friendly API",
      description:
        "API for managing categories, sites, and contacts for Muslim Friendly Taiwan tourism",
    },
  })

  // Swagger UI
  .get("/api", swaggerUI({ url: "/doc" }))

  .get("/", (c) =>
    c.html(
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>Welcome to the Tourism API</title>
          <meta
            name="description"
            content="API for Taiwan tourism categories, sites, and contacts"
          />
          <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body>
          <h1>Hai</h1>
        </body>
      </html>
    )
  );
