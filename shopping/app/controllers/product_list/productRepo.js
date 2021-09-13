const mysqlPool = require('../../config/mysql');
const sql_product = require('../../sql/product_list');

function addProductList(product) {
    return new Promise( (resolve, reject) => {
        mysqlPool.getConnection((err, con) => {
            if(err) reject(err);
            con.query(sql_product.addProduct, 
                [product.product_name, product.price], 
                (err, result) => {
                    if(err) reject(err);
                    
                    con.release();
                    resolve(result);
            });
        });
    });
}
function editProductList(product) {
    return new Promise( (resolve, reject) => {
        console.log(product)
        mysqlPool.getConnection((err, con) => {
            if(err) reject(err);
            con.query(sql_product.editProduct,
                [product.product_name, product.price, product.id],
                (err, result) => {
                    if(err){
                        reject(err);
                    } 
                    
                    con.release();
                    resolve(result);
            });
        })
    });
}

function deleteProductById(id) {
    return new Promise( (resolve, reject) => {
        mysqlPool.getConnection((err, con) => {
            if(err) reject(err);
            con.query(sql_product.deleteProduct, [id],
                (err, result) => {
                    if(err){
                        reject(err);
                    } 
                    
                    con.release();
                    console.log(result)
                    resolve(result);
            });
        })
    });
}
function findAll () {
    return new Promise( (resolve, reject) => {
        mysqlPool.getConnection((err, con) => {
            if(err) reject(err);
            con.query(sql_product.findAll, 
                (err, result) => {
                    if(err){
                        reject(err);
                    } 
                    
                    con.release();
                    console.log(result)
                    resolve(result);
            });
        })
    }); 
}
module.exports = {
    addProductList : addProductList,
    editProductList: editProductList,
    deleteProductById: deleteProductById,
    findAll: findAll
}