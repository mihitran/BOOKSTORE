const Product = require("../../models/product.model")
const ProductCategory = require("../../models/product-category.model");

//[GET] /product
module.exports.index = async(req, res) => {
    // console.log(req.query.category);
    
    let find = {}

    if(req.query.category){
        find.category = req.query.category;
    }

    let keyword = "";

    if(req.query.keyword){
        keyword = req.query.keyword;

        const regax = new RegExp(keyword, "i");
        find.title = regax;
    }

    const products = await Product.find(find);

    // console.log(products);

    res.render("client/pages/product/index.pug", {
        pageTitle:"Danh sách sản phẩm",
        products: products,
        keyword: keyword
    });
};

//[GET] /product/slug
module.exports.detail = async(req, res) => {
    // console.log(req.query.category);
    try {
        const find = {
            deleted : false,
            slug : req.params.slug,
            status: "active"
        }

        const product = await Product.findOne(find);
        console.log(product);

        res.render("client/pages/product/detail", {
            pageTitle: product.title,
            products: product,
        }); 
    } catch(error){
        res.redirect(`/products`);
    }
};