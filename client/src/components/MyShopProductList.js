import React from 'react';
import MyShopProduct from 'components/MyShopProduct'

function MyShopProductList(props) {
  const { products, category } = props

  if (products.length === 0) {
    return (
      <section>
        <h4 className="pl-36 mt-5">{category.name}</h4>
        <p className="pl-36">No products with this category yet</p>
      </section>
    )
  }

  return (
    <section>
      <h4 className="pl-36 mt-5">{category.name}</h4>

      {/* This needs to be a product comp */}
      {products.map(product => (
        <MyShopProduct key={product._id} product={product}/>
      ))}
    </section>
  )
}

export default MyShopProductList;