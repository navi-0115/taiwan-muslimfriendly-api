import { OpenAPIHono } from "@hono/zod-openapi";
import { zValidator } from "@hono/zod-validator";
import {
  createCategorySchema,
  updateCategorySchema,
  categoryIdSchema,
} from "../schema/CategoryValidation";
import {
  getAllCategoriesService,
  getCategoryByIdService,
  createCategoryService,
  deleteCategoryByIdService,
  updateCategoryService,
} from "../services/CategoryService";

const API_TAG = ["Categories"];

export const categoriesRoute = new OpenAPIHono();

// Get all categories
categoriesRoute.openapi(
  {
    method: "get",
    path: "/",
    description: "Get all categories",
    responses: {
      200: {
        description: "List of categories",
      },
    },
    tags: API_TAG,
  },
  async (c) => {
    const categories = await getAllCategoriesService();
    return c.json({
      message: "Success",
      data: categories,
    });
  }
);

// Get category by ID
categoriesRoute.openapi(
  {
    method: "get",
    path: "/:id",
    description: "Get category by ID",
    request: {
      params: categoryIdSchema, // Validate the `id` parameter
    },
    responses: {
      200: {
        description: "Category details",
      },
      404: {
        description: "Category not found",
      },
    },
    tags: API_TAG,
  },
  async (c) => {
    const id = Number(c.req.valid("param"));
    const category = await getCategoryByIdService(id);
    return category
      ? c.json({
          success: true,
          message: `Category with ID ${id} found`,
          data: category,
        })
      : c.json(
          { success: false, message: `Category with ID ${id} not found` },
          404
        );
  }
);

// Create a new category
categoriesRoute.openapi(
  {
    method: "post",
    path: "/",
    description: "Create a new category",
    request: {
      body: {
        content: {
          "application/json": {
            schema: createCategorySchema,
          },
        },
      },
    },
    responses: {
      201: {
        description: "Category created successfully",
      },
    },
    tags: API_TAG,
  },
  async (c) => {
    const data = c.req.valid("json");
    const newCategory = await createCategoryService(data);
    return c.json(
      {
        success: true,
        message: "Category created successfully",
        data: newCategory,
      },
      201
    );
  }
);

// Update category by ID (PATCH)
categoriesRoute.openapi(
  {
    method: "patch",
    path: "/:id",
    description: "Update a category by ID",
    request: {
      params: categoryIdSchema, // Validate the `id` parameter
      body: {
        content: {
          "application/json": {
            schema: updateCategorySchema,
          },
        },
      },
    },
    responses: {
      200: {
        description: "Category updated successfully",
      },
      404: {
        description: "Category not found",
      },
    },
    tags: API_TAG,
  },
  async (c) => {
    const { id } = c.req.valid("param");
    const data = c.req.valid("json");
    const updatedCategory = await updateCategoryService(Number(id), data);
    return updatedCategory
      ? c.json({
          success: true,
          message: "Category updated",
          data: updatedCategory,
        })
      : c.json({ success: false, message: "Category not found" }, 404);
  }
);

// Delete category by ID
categoriesRoute.openapi(
  {
    method: "delete",
    path: "/:id",
    description: "Delete category by ID",
    request: {
      params: categoryIdSchema, // Validate the `id` parameter
    },
    responses: {
      200: {
        description: "Category deleted successfully",
      },
      404: {
        description: "Category not found",
      },
    },
    tags: API_TAG,
  },
  async (c) => {
    const { id } = c.req.valid("param");
    const deletedCategory = await deleteCategoryByIdService(Number(id));
    return deletedCategory
      ? c.json({ success: true, message: "Category deleted" })
      : c.json({ success: false, message: "Category not found" }, 404);
  }
);
