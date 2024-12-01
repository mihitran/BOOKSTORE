const Product = require("../../models/product.model");
const ProductCategory = require("../../models/product-category.model");
const createTreeHelper = require("../../helpers/createTree.helper");


module.exports.index = async(req, res) => {
    const productsCategory = await ProductCategory.find({
        deleted: false
    });
    
    const products = await Product.find({
        deleted: false
    });

    console.log(products);
    const newProductsCategory = createTreeHelper.tree(productsCategory);

    console.log(newProductsCategory);

    res.render("client/pages/home/index.pug", {
        pageTitle:"Trang chủ",
        products: products,
        layoutProductsCategory: newProductsCategory
    });
};

