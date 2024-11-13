import { Router } from 'express';
import {
  getStudentsByIdController,
  getStudentsController,
  createContactsController,
  patchContactController,
  deleteContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/', ctrlWrapper(getStudentsController));

router.get('/:contactId', ctrlWrapper(getStudentsByIdController));

router.post('/', ctrlWrapper(createContactsController));

router.patch('/:contactId', ctrlWrapper(patchContactController));

router.delete('/:contactId', ctrlWrapper(deleteContactController));

router.put('/:contactId', ctrlWrapper());

export default router;
