const Product = require('../models/product.model')

exports.getAddProduct = (req,res,next) => {
    res.render('shop/add-edit-product', {
        pageTitle: 'Add Product',
        editing: false
    })
}

exports.postAddProduct = (req,res,next) => {
    const { title, imageUrl, description, price } = req.body

    const product = new Product(title, imageUrl, description, price)
    product.save()
    res.redirect('/')
}

//sql
// exports.getEditProduct = (req,res,next) => {
//     const editMode = req.query.edit
//     if(!editMode) res.redirect('/')

//     const prodId = req.params.productId
//     Product.findById(prodId)
//     .then(([rowData, fieldData]) => {
//         console.log(rowData[0]);
//         res.render('shop/add-edit-product', {
//             pageTitle: 'Edit Product',
//             editing: editMode,
//             product: rowData[0]
//         })
//     })
//     .catch(err => console.log(err))
// }

//MongoDB
exports.getEditProduct = (req,res,next) => {
    const editMode = req.query.edit
    if(!editMode) res.redirect('/')

    const prodId = req.params.productId
    Product.findById(prodId)
    .then((product) => {
        console.log(product);
        res.render('shop/add-edit-product', {
            pageTitle: 'Edit Product',
            editing: editMode,
            product: product
        })
    })
    .catch(err => console.log(err))
}

exports.postEditProduct = (req,res,next) => {
    const prodId = req.body.productId
    const {title, imageUrl, description, price} = req.body
    const updatedProduct = new Product(title, imageUrl, description, price)
    updatedProduct.edit(prodId)
    res.redirect('/')
}

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId
    console.log(prodId);
    Product.deleteById(prodId)
    res.redirect('/')
}