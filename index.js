import express from 'express';
import noteRouter from './routes/notes.js'

const app = express();

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
  res.send("Error Occurred");
})

app.listen(3000)