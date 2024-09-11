// categories/service.ts
import prisma from "../../prisma/client";

// Fetch all categories from the database
export async function getAllCategoriesService() {
  return await prisma.category.findMany({ orderBy: { id: "desc" } });
}
// Fetch categories by id
export async function getCategoryByIdService(id: number) {
  return await prisma.category.findUnique({ where: { id } });
}

// Create a new category
export async function createCategoryService(data: { name: string }) {
  return await prisma.category.create({
    data,
  });
}
// Update a category by ID
export async function updateCategoryService(
  id: number,
  data: { name?: string | undefined }
) {
  return await prisma.category.update({ where: { id }, data });
}

// Delete a category by ID
export async function deleteCategoryByIdService(id: number) {
  await prisma.site.deleteMany({
    where: { categoryId: id },
  });

  return await prisma.category.delete({ where: { id } });
}
