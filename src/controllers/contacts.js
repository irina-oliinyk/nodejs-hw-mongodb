import {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getContactsController = async (req, res) => {
  const { _id: userId } = req.user;

  const { page, perPage } = parsePaginationParams(req.query);

  const { sortBy, sortOrder } = parseSortParams(req.query);

  const filter = parseFilterParams(req.query);

  const contacts = await getAllContacts({
    userId,
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;

  const contact = await getContactById(contactId, userId);
  if (!contact) {
    throw createHttpError(404, 'Contacts not found');
  }
  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContactsController = async (req, res) => {
  const { _id: userId } = req.user;
  const newContact = { ...req.body, userId };

  const contact = await createContact(newContact);

  res.status(201).json({
    status: 201,
    message: 'Successfully create a student!',
    data: contact,
  });
};

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;
  console.log('Contact ID:', contactId); // Проверяем, что ID контакта приходит правильно
  console.log('User ID:', userId); // Проверяем, что userId из токена передается
  const result = await updateContact(contactId, req.body, {}, userId);
  if (!result) {
    next(
      createHttpError(
        404,
        'Contact not found or does not belong to the logged-in user',
      ),
    );
    return;
  }

  res.json({
    status: 200,
    message: 'Successfully patched a contact !',
    data: result.contact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;

  const { _id: userId } = req.user;

  const contact = await deleteContact(contactId, userId);

  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(204).send();
};

export const upsertConactController = async (req, res, next) => {
  const { contactId } = req.params;

  const { _id: userId } = req.user;

  const result = await updateContact(contactId, req.body, {
    upsert: true,
    userId,
  });
  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }
  const status = result.isNew ? 201 : 200;
  res.status(status).json({
    status,
    message: 'Successfully upserted a contact!',
    data: result.contact,
  });
};
