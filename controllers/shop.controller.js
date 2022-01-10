const Product = require('../models/product.model')

exports.getProducts = (req,res,next) => {
    Product.fetchAll().then(([rowData, fieldData]) => {
        // console.log(rowData) // [ [rows], [configs...] ]

        res.render('shop/product-list', {
            pageTitle: 'All Products',
            products: rowData
        })


    }).catch(err => console.log(err))
}