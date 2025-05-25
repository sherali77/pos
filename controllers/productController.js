const Product = require('../models/product');

exports.listProducts = async (req, res) => {
    const products = await Product.find();
    res.render('products/index', { products });
};

exports.newForm = (req, res) => {
    res.render('products/add');
};

exports.createProduct = async (req, res) => {
    await Product.create(req.body);
    res.redirect('/products');
};

exports.editForm = async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.render('products/edit', { product });
};

exports.updateProduct = async (req, res) => {
    await Product.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/products');
};

exports.deleteProduct = async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/products');
};
