var express = require('express');
var routes = express.Router();
var bodyParser = require('body-parser');
var cors = require('cors');
const productRepo = require('./productRepo');

routes.use(bodyParser.json());
routes.use(cors())

routes.post("/add/product", (req, res) => {
    productRepo.addProductList(req.body).then((result) => {
        res.json({message: "Product added successfully."});
    }).catch((err) => {
        console.log(err);
        res.json({message: 'Unable to create product'});
    });
});

routes.post("/edit/product", (req, res) => {
    productRepo.editProductList(req.body).then((result) => {
        res.json({message: "Product  info Updated!"});
    }).catch((err) => {
        console.log(err);
        res.json({message: 'Unable to edit product'});
    });
});

routes.delete("/delete/product/:id", (req, res) => {
    productRepo.deleteProductById(req.params.id).then((result) => {
        res.json({message: "Product removed!"});
    }).catch((err) => {
        console.log(err);
        res.json({message: 'Unable to delete product'});
    });
});

routes.get("/find/all/products", (req, res) => {
    productRepo.findAll().then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
        res.json([]);
    });
});

module.exports = routes;