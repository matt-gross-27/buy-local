import React from 'react';
import { Image, Transformation } from 'cloudinary-react';

function MyShopProductList(props) {
  const { products, category } = props

  if (products.length === 0) {
    return (
      <section>
        <h4 className="pl-36 mt-3">{category.name}</h4>
        <p className="pl-36">No products with this category yet</p>
      </section>
    )
  }

  return (
    <section>
      <h4 className="pl-36 mt-5">{category.name}</h4>

      {/* This needs to be a product comp */}
      {products.map(product => (
        <div key={product._id} className="d-flex flex-row flex-wrap border mb-3" style={{boxShadow: '3px 3px 3px silver'}}>
          <div className='p-0 col-12 col-md-4 p-1 productImgDiv'>
            <span className='editBtn'>✎</span>
            <Image className='productImg' cloudName='dylyqjirh' publicId={product.image || 'shopping-bags-500x500_vpqouy'}>
              <Transformation height={600} width={972} crop="fill" />
            </Image>
          </div>
          <div className='p-0 col-12 col-md-8 d-flex flex-column justify-content-between'>
            <div className='d-flex flex-wrap'>
              <div className="productLabel pr-0">Name:</div>
              <div className='px-2'>{product.name}</div>
            </div>

            <div className='d-flex flex-wrap'>
              <div className="productLabel pr-0">Price:</div>
              <div className='px-2'>${product.price}</div>
            </div>

            <div className='d-flex flex-wrap'>
              <div className="productLabel pr-0">Description:</div>
              <div className='px-2'>{product.description}</div>
            </div>
            <div className='d-flex flex-wrap'>
              <div className="productLabel pr-0">Stock:</div>
              <div className='px-2'>{product.stock}</div>
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}

export default MyShopProductList;