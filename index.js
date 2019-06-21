const express = require('express');
const app = express();
const PORT = process.envPORT || 5000;

app.get('/', (req, res) =>{
  res.send('Hello world')
})
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));

