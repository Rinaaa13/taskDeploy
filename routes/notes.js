import { Router } from 'express';
import * as Note from '../models/note.js';

const router = Router();

router.get('/', (req, res) => {
  const notes = Note.list();
  res.json(notes);
});

router.post('/', (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }
    const note = Note.create(title, content);
    res.status(201).json(note);
});

export default router;