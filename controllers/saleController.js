const Sale = require('../models/sales');
const Product = require('../models/product');

exports.salesHistory = async (req, res) => {
    const sales = await Sale.find().populate('items.productId');
    res.render('sales/index', { sales });
};

exports.processSale = async (req, res) => {
    const { items } = req.body; // { productId: quantity }
    let total = 0;
    const saleItems = [];

    for (let id in items) {
        const quantity = parseInt(items[id]);
        if (quantity > 0) {
            const product = await Product.findById(id);
            if (product.stock >= quantity) {
                product.stock -= quantity;
                await product.save();

                saleItems.push({ productId: id, quantity });
                total += product.price * quantity;
            }
        }
    }

    await Sale.create({ items: saleItems, total });
    res.redirect('/sales');
};
