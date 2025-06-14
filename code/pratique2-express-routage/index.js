const express = require('express');
const categorieRoute = require('./routes/categoriesRoute')
const productsRoute = require('./routes/productsRoute')
const app = express();
app.use(express.json());

app.use(categorieRoute)
app.use(productsRoute)

app.listen(3000, () => {
    console.log('Server is running on port 3000...');
});
