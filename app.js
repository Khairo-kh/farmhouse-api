const express = require('express');

const app = express();

// app.get('/', (req, res) => {
//   res.status(200).json({ message: 'Hello!' });
// });

app.get("/api/v1/tours", (req, res) => {
  
})

const port = 3000;
app.listen(port, () => {
  console.log(`app running on port ${port} ...`);
});
