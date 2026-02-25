import { Router } from 'express';
import * as Note from '../models/note.js';

const router = Router();

router.get('/', (req, res) => {
  const notes = Note.list();
  res.json(notes);
});

router.get('/:id', (req, res, next) => {
    const id = Number(req.params.id);
    try {
        const note = Note.get(id);
        res.json(note);
    } catch (e) {
        next(e);
    }
});

// router.get('/:id', (req, res, next) => {
//     const{ tittle, content } = req.body;
//     const note = Note.get(id);
//     res.json(note);
// });

router.post('/', (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }
    const note = Note.create(title, content);
    res.status(201).json(note);
});

router.delete('/:id', (req, res, next) => {
    const id = Number(req.params.id);
    try {
        Note.delete(id);
        res.json({ result: 'success' });
    } catch (e) {
        next(e);
    }
});

export default router;