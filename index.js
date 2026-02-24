const express = require('express');
const app = express();

// app.use((req, res, next) => {
//   console.log(`Request ${req.path} harus lewat sini`);
//   next();
// });
// const auth = (req, res, next) => {
//   console.log('Auth middleware dijalankan');
//   next();
// };
// app.use(auth);
// // app.get('/', (req, res) => {
// //   res.send('Halo, nama saya Sarah');
// // });
app.use((req, res, next) => {
  if (false) {
    next(new Error('Not Found'));
    return;  
  }
  next();
});
app.get('/say/:greeting', (req, res) => {
  const { greeting } = req.params;
  res.send(greeting);
});

app.get('/work/:studing', (req, res) => {
  const { studing } = req.params;
  res.send(studing);
});

app.get('/',(req, res, next) => {
  res.send('Hello Express');
})

app.use((err, req, res, next) => {
  res.send("Error Occurred");
})

app.listen(3000)