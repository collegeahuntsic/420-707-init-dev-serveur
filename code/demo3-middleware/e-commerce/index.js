const express = require('express');
const productRouter = require('./routes/product_route');

const app = express();
app.use(express.json());
app.use((req, res, next) => {
    console.log(`${req.method}: ${req.url}`);
    if (req.body) {
        console.log(`Request Body: ${JSON.stringify(req.body)}`);
    }
    next();
})
app.use(productRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ status: 'error', message: err.message });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 