import { Hono } from "hono";
// Import GET all places controller
import {
  getAllLocations,
  getLocationById,
  deleteLocationById,
} from "../services/SiteService";

// Initialize router
const sites = new Hono();

// Location
// Routes to get all locations
sites.get("/locations", getAllLocations);
// Routes to get place by id
sites.get("/locations/:id", getLocationById);
// Routes to create single Location
// sites.post("/locations", ...createLocation);
// Routes to delete single Location
sites.delete("/locations/:id", deleteLocationById);
// Routes to update single Location
// router.patch("/locations/:id", updateLocationById);

export const SitesRoutes = sites;
