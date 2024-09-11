import { OpenAPIHono } from "@hono/zod-openapi";
import {
  createContactSchema,
  updateContactSchema,
  contactIdSchema,
} from "../schema/ContactValidation";
import {
  getAllContactsService,
  getContactByIdService,
  createContactService,
  deleteContactByIdService,
  updateContactService,
} from "../services/ContactService";

const API_TAG = ["contacts"];

export const contactsRoute = new OpenAPIHono();

// Get all contacts
contactsRoute.openapi(
  {
    method: "get",
    path: "/",
    description: "Get all contacts",
    responses: {
      200: {
        description: "List of contacts",
      },
    },
    tags: API_TAG,
  },
  async (c) => {
    const contacts = await getAllContactsService();
    return c.json({
      message: "Success",
      data: contacts,
    });
  }
);

// Get contact by ID
contactsRoute.openapi(
  {
    method: "get",
    path: "/{id}",
    description: "Get contact by ID",
    request: {
      params: contactIdSchema,
    },
    responses: {
      200: {
        description: "contact details",
      },
      404: {
        description: "contact not found",
      },
    },
    tags: API_TAG,
  },
  async (c) => {
    const id = Number(c.req.param("id"));
    const contact = await getContactByIdService(id);

    return contact
      ? c.json({
          success: true,
          message: `Contact with ID ${id} has been found`,
          data: contact,
        })
      : c.json(
          { success: false, message: `Contact with ID ${id} not found` },
          404
        );
  }
);

// Create a new contact
contactsRoute.openapi(
  {
    method: "post",
    path: "/",
    description: "Create a new contact",
    request: {
      body: {
        content: {
          "application/json": {
            schema: createContactSchema,
          },
        },
      },
    },
    responses: {
      201: {
        description: "Contact created successfully",
      },
    },
    tags: API_TAG,
  },
  async (c) => {
    const data = c.req.valid("json");
    const newContact = await createContactService(data);
    return newContact
      ? c.json({
          success: true,
          message: `New contact has been successfully created`,
          data: newContact,
        })
      : c.json(
          { success: false, message: `Failed to create new contact` },
          404
        );
  }
);

// Update contact by ID (PUT)
contactsRoute.openapi(
  {
    method: "put",
    path: "/{id}",
    description: "Update a contact by ID",
    request: {
      params: contactIdSchema,
      body: {
        content: {
          "application/json": {
            schema: updateContactSchema,
          },
        },
      },
    },
    responses: {
      200: {
        description: "Contact updated successfully",
      },
      404: {
        description: "Contact not found",
      },
    },
    tags: API_TAG,
  },
  async (c) => {
    const data = c.req.valid("json");
    const id = Number(c.req.param("id"));
    const updatedContact = await updateContactService(id, data);
    return updatedContact
      ? c.json({
          success: true,
          message: `Contact with ID ${id} updated`,
          data: updatedContact,
        })
      : c.json(
          { success: false, message: `Contact with ID ${id} not found` },
          404
        );
  }
);

// Delete contact by ID
contactsRoute.openapi(
  {
    method: "delete",
    path: "/{id}",
    description: "Delete contact by ID",
    request: {
      params: contactIdSchema, // Validate the `id` parameter
    },
    responses: {
      200: {
        description: "Contact deleted successfully",
      },
      404: {
        description: "Contact not found",
      },
    },
    tags: API_TAG,
  },
  async (c) => {
    const id = Number(c.req.param("id"));
    const deletedContact = await deleteContactByIdService(id);
    return deletedContact
      ? c.json({
          success: true,
          message: `Contact with ID ${id} has been deleted`,
        })
      : c.json(
          { success: false, message: `Contact with ID ${id} not found` },
          404
        );
  }
);
