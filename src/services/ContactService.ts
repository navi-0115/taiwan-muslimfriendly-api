// sites/service.ts
import prisma from "../../prisma/client";

// Fetch all sites from the database
export async function getAllSitesService() {
  return await prisma.site.findMany({ orderBy: { id: "desc" } });
}
// Fetch sites by id
export async function getSiteByIdService(id: number) {
  return await prisma.site.findUnique({ where: { id } });
}

// Create a new site
export async function createSiteService(data: {
  name: string;
  description: string;
  categoryId: number;
  contactId: number;
}) {
  const existingSite = await prisma.site.findUnique({
    where: {
      contactId: data.contactId,
    },
  });

  if (existingSite) {
    throw new Error("A site with this contact already exists.");
  }

  return await prisma.site.create({
    data,
  });
}
// Update a site by ID
export async function updateSiteService(
  id: number,
  data: { name?: string | undefined }
) {
  return await prisma.site.update({ where: { id }, data });
}

// Delete a site by ID
export async function deleteSiteByIdService(id: number) {
  // Check if the site exists
  const existingSite = await prisma.site.findUnique({
    where: { id },
  });

  if (!existingSite) {
    return null;
  }

  // Delete the site
  return await prisma.site.delete({
    where: { id },
  });
}
