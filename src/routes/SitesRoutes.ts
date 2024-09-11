import { OpenAPIHono } from "@hono/zod-openapi";
import {
  createSiteSchema,
  updateSiteSchema,
  siteIdSchema,
} from "../schema/SiteValidation";
import {
  getAllSitesService,
  getSiteByIdService,
  createSiteService,
  deleteSiteByIdService,
  updateSiteService,
} from "../services/SiteService";

const API_TAG = ["sites"];

export const sitesRoute = new OpenAPIHono();

// Get all sites
sitesRoute.openapi(
  {
    method: "get",
    path: "/",
    description: "Get all sites",
    responses: {
      200: {
        description: "List of sites",
      },
    },
    tags: API_TAG,
  },
  async (c) => {
    const sites = await getAllSitesService();
    return c.json({
      message: "Success",
      data: sites,
    });
  }
);

// Get site by ID
sitesRoute.openapi(
  {
    method: "get",
    path: "/{id}",
    description: "Get site by ID",
    request: {
      params: siteIdSchema,
    },
    responses: {
      200: {
        description: "site details",
      },
      404: {
        description: "site not found",
      },
    },
    tags: API_TAG,
  },
  async (c) => {
    const id = Number(c.req.param("id"));
    const site = await getSiteByIdService(id);

    return site
      ? c.json({
          success: true,
          message: `Site with ID ${id} found`,
          data: site,
        })
      : c.json(
          { success: false, message: `Site with ID ${id} not found` },
          404
        );
  }
);

// Create a new site
sitesRoute.openapi(
  {
    method: "post",
    path: "/",
    description: "Create a new category",
    request: {
      body: {
        content: {
          "application/json": {
            schema: createSiteSchema,
          },
        },
      },
    },
    responses: {
      201: {
        description: "Site created successfully",
      },
    },
    tags: API_TAG,
  },
  async (c) => {
    const data = c.req.valid("json");
    const newSite = await createSiteService(data);
    return newSite
      ? c.json({
          success: true,
          message: `New site has been successfully created`,
          data: newSite,
        })
      : c.json({ success: false, message: `Failed to create new site` }, 404);
  }
);

// Update site by ID (PUT)
sitesRoute.openapi(
  {
    method: "put",
    path: "/{id}",
    description: "Update a category by ID",
    request: {
      params: siteIdSchema,
      body: {
        content: {
          "application/json": {
            schema: updateSiteSchema,
          },
        },
      },
    },
    responses: {
      200: {
        description: "Site updated successfully",
      },
      404: {
        description: "Site not found",
      },
    },
    tags: API_TAG,
  },
  async (c) => {
    const data = c.req.valid("json");
    const id = Number(c.req.param("id"));
    const updatedSite = await updateSiteService(id, data);
    return updatedSite
      ? c.json({
          success: true,
          message: `Site with ID ${id} updated`,
          data: updatedSite,
        })
      : c.json(
          { success: false, message: `Site with ID ${id} not found` },
          404
        );
  }
);

// Delete site by ID
sitesRoute.openapi(
  {
    method: "delete",
    path: "/{id}",
    description: "Delete site by ID",
    request: {
      params: siteIdSchema, // Validate the `id` parameter
    },
    responses: {
      200: {
        description: "Site deleted successfully",
      },
      404: {
        description: "Site not found",
      },
    },
    tags: API_TAG,
  },
  async (c) => {
    const id = Number(c.req.param("id"));
    const deletedSite = await deleteSiteByIdService(id);
    return deletedSite
      ? c.json({
          success: true,
          message: `Site with ID ${id} has been deleted`,
        })
      : c.json(
          { success: false, message: `Site with ID ${id} not found` },
          404
        );
  }
);
