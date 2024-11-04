import { Router } from 'express';
import {
  getStudentsByIdController,
  getStudentsController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/', ctrlWrapper(getStudentsController));

router.get('/:contactId', ctrlWrapper(getStudentsByIdController));

export default router;
