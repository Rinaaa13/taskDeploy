import { Router } from 'express';
import * as Note from '../models/note.js';

const router = Router();

router.get('/', (req, res) => {
  const notes = Note.list();
  res.json(notes);
});

export default router;