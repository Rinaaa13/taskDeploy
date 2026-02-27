import express from 'express';
import noteRouter from './routes/notes.js';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.use(cors());

const URI = 'mongodb+srv://sarahdb:sar25db1@coderin.8ktkdkr.mongodb.net/?appName=coderin';

// ... (kode import express & mongoose kamu yang tadi)

// async function main() {
//   try {
//     // 1. Membuat satu data
//     const created = await Post.create({
//       title: "First Title",
//       content: "Ini konten pertama"
//     });
//     console.log("Data tunggal berhasil dibuat:", created);

//     // 2. Membuat banyak data sekaligus (Bulk Create)
//     const multipleCreated = await Post.create([
//       { title: "Item 1", content: "Konten 1" },
//       { title: "Item 2", content: "Konten 2" }
//     ]);
//     console.log("Banyak data berhasil dibuat:", multipleCreated);

//   } catch (err) {
//     console.error("Gagal mengisi data:", err);
//   }
// }

// Jalankan fungsi main setelah koneksi DB berhasil
mongoose.connect(URI)
  .then(() => {
    console.log('✅ Berhasil terhubung ke MongoDB');
    // Contoh cek apakah model Post bisa dipakai
    console.log('Model yang tersedia:', mongoose.modelNames());
    // main(); 
  })
  .catch(err => console.error('❌ Gagal koneksi:', err));

app.use(express.json());
// app.use((req, res, next) => {
//   console.log(`Request ${req.path} harus lewat sini`);
//   next();
// });
// const auth = (req, res, next) => {
//   console.log('Auth middleware dijalankan');
//   next();
// };
app.use((req, res, next) => {
  if (false) {
    next(new Error('Not Found'));
    return;  
  }
  next();
});

// app.use(auth);
app.get('/', (req, res) => {
  res.send('Halo, nama saya Sarah');
});

app.get('/say/:greeting', (req, res) => {
  const { greeting } = req.params;
  res.send(greeting);
});

app.get('/work/:studing', (req, res) => {
  const { studing } = req.params;
  res.send(studing);
});

// app.get('/',(req, res, next) => {
//   res.send('Hello Express');
// })

app.get('/protected', (req, res) => {
  return res.status(401).send('Unauthorized');
});

app.use('/notes', noteRouter);

app.use((err, req, res, next) => {
  res.status(500);
  res.json({
    result: 'fail',
    error: err.message,
  });
});

app.listen(3000)