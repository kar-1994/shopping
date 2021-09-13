const mysqlPool = require('../../config/mysql');
const sql_cart = require('../../sql/cart');

function addToCart(productId) {
    return new Promise((resolve, reject) => {
        mysqlPool.getConnection((err, con) => {
            if (err) reject(err);
            con.query(sql_cart.addToCart,[productId, 1],
                (err, result) => {
                    if (err) reject(err);

                    con.release();
                    resolve(result)
                });
        })
    });
}
function findByUserId(uid){
return new Promise((resolve,reject)=>{
    mysqlPool.getConnection((err,con)=>{
        if(err) reject(err);
        con.query(sql_cart.findByUser, [uid],
            (err,result)=>{
                if (err) reject(err);

                con.release();
                resolve(result)  
            })
    })
})
}

module.exports = {
    addToCart: addToCart,
    findByUserId: findByUserId
}