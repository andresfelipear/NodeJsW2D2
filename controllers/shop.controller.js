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

exports.getAddProduct = (req,res,next) => {
    res.render('shop/add-product', {
        pageTitle: 'Add Product'
    })
}

exports.postAddProduct = (req,res,next) => {
    const { title, imageUrl, description, price } = req.body

    const product = new Product(null, title, imageUrl, description, price)
    product.save()
    res.redirect('/')
}