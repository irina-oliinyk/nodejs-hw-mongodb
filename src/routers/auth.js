import express from 'express';
import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  registerUserSchema,
  loginUserSchema,
  requestResetPasswordSchema,
  resetPasswordSchema,
  loginWithGoogleOAuthSchema,
} from '../validation/auth.js';
import {
  registerUserController,
  loginUserController,
  logoutUserController,
  refreshUserSessionController,
  requestResetPasswordController,
  resetPasswordController,
  loginWithGoogleController,
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';

import { getGoogleOAuthUrlController } from '../controllers/auth.js';

const router = Router();
const jsonParser = express.json();

router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

router.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

router.post('/logout', ctrlWrapper(logoutUserController));

router.post('/refresh', ctrlWrapper(refreshUserSessionController));

router.post(
  '/send-reset-email',
  jsonParser,
  validateBody(requestResetPasswordSchema),
  ctrlWrapper(requestResetPasswordController),
);

router.post(
  '/reset-pwd',
  jsonParser,
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);

router.get('/get-oauth-url', ctrlWrapper(getGoogleOAuthUrlController));

router.post(
  '/confirm-oauth',
  validateBody(loginWithGoogleOAuthSchema),
  ctrlWrapper(loginWithGoogleController),
);

export default router;
