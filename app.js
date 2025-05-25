const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();

mongoose.connect('mongodb://localhost:27017/mini-pos', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const productRoutes = require('./routes/productRoutes');
const saleRoutes = require('./routes/saleRoutes');

app.use('/products', productRoutes);
app.use('/sales', saleRoutes);

app.get('/', (req, res) => {
    res.redirect('/products');
});

app.listen(3000, () => {
    console.log('POS running on http://localhost:3000');
});
