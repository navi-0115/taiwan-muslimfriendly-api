import { Hono } from "hono";

import {
  createCategory,
  deleteCategoryById,
  getAllCategories,
  getCategoryById,
} from "../services/CategoryService";

// Initialize router
const categories = new Hono();

// Category
// Routes to post a new category
categories.post("/category", createCategory);
categories.get("/categories", getAllCategories);
// Routes to get category by id
categories.get("/categories/:id", getCategoryById);
// Routes to delete single category
categories.delete("/categories/:id", deleteCategoryById);

export const CategoriesRoutes = categories;
