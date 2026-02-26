import { Router } from 'express';
import * as Note from '../models/note.js';
import { Post } from '../models/index.js';

const router = Router();

router.get('/', async (req, res, next) => {
    try {
        const notes = await Post.find();
        res.json(notes);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        const note = await Post.findById(id); 
        console.log(id);
        if (!note) return res.status(404).json({ message: "Catatan tidak ditemukan" });
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

router.put('/:id', async (req, res, next) => {
    const id = req.params.id; // Tidak perlu Number()
    const { title, content } = req.body;
    
    try {
        // Parameter: (id, data_baru, options)
        const note = await Post.findByIdAndUpdate(
            id, 
            { title, content }, 
            { new: true } 
        );

        if (!note) return res.status(404).json({ message: "Catatan tidak ditemukan" });
        
        res.json(note);
    } catch (e) {
        next(e);
    }
});

router.post('/', async (req, res, next) => {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }
    try {
        // Gunakan Post.create dari Mongoose untuk simpan ke MongoDB
        const note = await Post.create({
            title: title,
            content: content
        });

        // Kirim respon data yang berhasil dibuat
        res.status(201).json(note);
    } catch (e) {
        // Jika ada error (misal database mati), lempar ke middleware error
        next(e);
    }
    // const note = Note.create(title, content);
    // res.status(201).json(note);
});

router.delete('/:id', async (req, res, next) => {
    const id = req.params.id; // Tidak perlu Number()
    
    try {
        const note = await Post.findByIdAndDelete(id);

        if (!note) return res.status(404).json({ message: "Catatan tidak ditemukan" });

        res.json({ result: 'success', message: 'Catatan berhasil dihapus' });
    } catch (e) {
        next(e);
    }
});

export default router;