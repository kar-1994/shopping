var express = require('express');
var routes = express.Router();
var bodyParser = require('body-parser');
var cartRepo = require('./cartRepo');
const cors = require('cors');
routes.use(cors());

routes.use(bodyParser.json());
routes.get('/add/product/:id/cart', (req, res) => {
    cartRepo.addToCart(req.params.id).then((data) => {
        res.json({ message: 'Product Added TO Cart' })
    }).catch(err => {
        console.log(err);
        res.json({ message: 'Can\'t add product ' });
    })
})

routes.get('/get/products/user/:id', (req, res) => {
    cartRepo.addToCart(req.params.id).then((data) => {
        res.json(data);
    }).catch(err => {
        console.log(err);
        res.json([]);
    })
})
module.exports = routes;
