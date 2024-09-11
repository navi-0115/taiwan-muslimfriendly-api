import prisma from "../../prisma/client";

// Fetch all contacts from the database
export async function getAllContactsService() {
  return await prisma.contact.findMany({ orderBy: { id: "desc" } });
}

// Fetch contact by id
export async function getContactByIdService(id: number) {
  return await prisma.contact.findUnique({ where: { id } });
}

// Create a new contact
export async function createContactService(data: {
  name: string;
  address: string;
  phone: string;
}) {
  // Check if a contact with the same phone number already exists
  const existingContact = await prisma.contact.findFirst({
    where: {
      phone: data.phone,
    },
  });

  if (existingContact) {
    throw new Error("A contact with this phone number already exists.");
  }

  return await prisma.contact.create({
    data,
  });
}

// Update a contact by ID
export async function updateContactService(
  id: number,
  data: { name?: string; address?: string; phone?: string }
) {
  return await prisma.contact.update({ where: { id }, data });
}

// Delete a contact by ID
export async function deleteContactByIdService(id: number) {
  // Check if the contact exists
  const existingContact = await prisma.contact.findUnique({
    where: { id },
  });

  if (!existingContact) {
    return null;
  }

  // Delete the contact
  return await prisma.contact.delete({
    where: { id },
  });
}
