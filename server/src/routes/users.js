import express from 'express';

import { createUser } from '../controllers/userController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.post('/create', requireAuth, createUser);

export default router;