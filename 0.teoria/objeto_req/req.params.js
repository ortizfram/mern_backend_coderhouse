const express = require('express');
const app = express();

// Define a route handler with a route parameter
app.get('/param/:id', (req, res) => { // pass it in the link without :
  // Access the value of the userId parameter using req.params.userId
  const userId = req.params.id;
  res.send(`User ID: ${userId}`);
});


app.listen(8080, () => {
  console.log(`Server listening on port ${PORT}`);
});
