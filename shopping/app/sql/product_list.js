module.exports = {
    addProduct: "insert into product_list (product_name,price) values (? , ?)",
    editProduct: "UPDATE product_list SET product_name = ?, price = ? WHERE id=?",
    deleteProduct: "DELETE FROM product_list WHERE id= ?",
    findAll: "Select * from product_list"
}