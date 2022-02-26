const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const db = require('./db/connection')
const apiRoutes = require('./routes/apiRoutes')


app.use((req, res)=>{
  res.status(404).end(); 
})


db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });