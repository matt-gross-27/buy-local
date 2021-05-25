import React from 'react';
import { Image, Transformation } from 'cloudinary-react';

function MyShopProductList(props) {
  const { products, category, key } = props

  if (products.length === 0) {
    return (
      <section>
        <h4 className="pl-36">{category.name}</h4>
        <p className="pl-36">No products with this category yet</p>
      </section>
    )
  }

  return (
    <section>
      <h4 className="pl-36">{category.name}</h4>

      {/* This needs to be a product comp */}
      {products.map(product => (
        <div key={product._id} className="product d-flex pl-36 mb-3">
          <div>
            <Image style={{ objectFit: 'cover', height: '120px' }} cloudName='dylyqjirh' publicId={product.image || 'shopping-bags-500x500_vpqouy'}>
              <Transformation height={600} width={972} crop="fill" />
            </Image>
          </div>
          <div className='d-flex flex-column justify-content-between'>
            
            <div className='d-flex'>
              <div className="productLabel">Name:</div>
              <div>{product.name}</div>
            </div>

            <div className='d-flex'>
              <div className="productLabel">Price:</div>
              <div>{product.price}</div>
            </div>

            <div className='d-flex'>
              <div className="productLabel">Description:</div>
              <div>{product.description}</div>
            </div>
            <div className='d-flex'>
              <div className="productLabel">Stock:</div>
              <div>{product.stock}</div>
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}

export default MyShopProductList;