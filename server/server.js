const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

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

app.post('/product', (req, res) => {
    const product = req.body;

    // output the product to the console for debugging
    console.log(product);
    products.push(product);

    res.send('Product is added to the database');
});

app.get('/product', (req, res) => {
    res.json(products);
});

app.get('/product/:id', (req, res) => {
    // reading id from the URL
    const id = req.params.id;

    // searching products for the id
    for (let product of products) {
        if (product.id === id) {
            res.json(product);
            return;
        }
    }

    // sending 404 when not found something is a good practice
    res.status(404).send('Product not found');
});

app.delete('/product/:id', (req, res) => {
    // reading id from the URL
    const id = req.params.id;

    // remove item from the products array
    products = products.filter(i => {
        return i.id !== id;  // Simplified filter function
    });

    // sending 404 when not found something is a good practice
    res.send('Product is deleted');
});

app.post('/product/:id', (req, res) => {
    // reading id from the URL
    const id = req.params.id;
    const newProduct = req.body;

    // find and update the product in the products array
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === id) {
            products[i] = newProduct;
            res.send('Product is edited');
            return;  // Return to avoid sending multiple responses
        }
    }

    // sending 404 when not found something is a good practice
    res.status(404).send('Product not found');
});

app.post('/checkout', (req, res) => {
    const order = req.body;

    // output the order to the console for debugging
    orders.push(order);

    res.redirect(302, 'https://assettracker.cf');
});

app.get('/checkout', (req, res) => {
    res.json(orders);
});

// Start the server
app.listen(port, () => console.log(`Server listening on port ${port}!`));
