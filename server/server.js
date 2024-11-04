const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid'); // Import uuid for unique ID generation

const app = express();
const port = process.env.PORT || 3000;  // Ensure PORT is used

let products = [];
let orders = [];

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("API deployment successful");
});

// Create a new product
app.post('/product', (req, res) => {
    const { name, price } = req.body; // Assume these are required fields

    // Basic validation
    if (!name || typeof price !== 'number') {
        return res.status(400).send('Name and price are required and price must be a number');
    }

    const product = { id: uuidv4(), name, price }; // Assign a unique ID
    console.log(product);
    products.push(product);

    res.status(201).json(product); // Return the created product
});

// Get all products
app.get('/product', (req, res) => {
    res.json(products);
});

// Get a single product by ID
app.get('/product/:id', (req, res) => {
    const id = req.params.id;
    const product = products.find(p => p.id === id);

    if (product) {
        res.json(product);
    } else {
        res.status(404).send('Product not found');
    }
});

// Delete a product by ID
app.delete('/product/:id', (req, res) => {
    const id = req.params.id;
    products = products.filter(i => i.id !== id);

    res.send('Product is deleted');
});

// Update a product by ID
app.post('/product/:id', (req, res) => {
    const id = req.params.id;
    const { name, price } = req.body;

    // Find the product to update
    const productIndex = products.findIndex(p => p.id === id);
    if (productIndex !== -1) {
        products[productIndex] = { id, name, price };
        res.send('Product is edited');
    } else {
        res.status(404).send('Product not found');
    }
});

// Checkout (Add order)
app.post('/checkout', (req, res) => {
    const order = req.body;
    orders.push(order);

    // Redirect to a URL after processing the order
    res.redirect(302, 'https://assettracker.cf');
});

// Get all orders
app.get('/checkout', (req, res) => {
    res.json(orders);
});

// Start the server
app.listen(port, () => console.log(`Server listening on port ${port}!`));
