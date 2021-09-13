module.exports = {
    addToCart: 'INSERT INTO my_cart (product_id,user_id) VALUES(? , ?)',
    findByUser: 'select * from my_cart where user_id = ? '
}