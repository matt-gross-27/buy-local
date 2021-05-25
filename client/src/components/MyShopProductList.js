import React from 'react';
import { Image, Transformation } from 'cloudinary-react';

function MyShopProductList(props) {
  const {products, category} = props

  if (products.length === 0) {
    return (
      <section>
      <h4 className="pl-36">{category.name}</h4>
      <p className="pl-36">No products in this category yet</p>
      </section>
    )
  }

  return (
    <section>
      <h4 className="pl-36">{category.name}</h4>

      {/* This needs to be a product comp */}
      {products.map}
      <div className="product d-flex pl-36 mb-3">
        <div>
          <Image style={{ objectFit: 'cover', height: '120px' }} cloudName='dylyqjirh' publicId={products[0].image || 'shopping-bags-500x500_vpqouy'}>
            <Transformation height={600} width={972} crop="fill" />
          </Image>
        </div>
        <div className='d-flex flex-column justify-content-between'>
          <div className='d-flex'><div className="productLabel">Name:</div>        <div>{products[0].name}</div>   </div>
          <div className='d-flex'><div className="productLabel">Price:</div>       <div>{products[0].price}</div>    </div>
          <div className='d-flex'><div className="productLabel">Description:</div> <div>{products[0].description}</div>          </div>
          <div className='d-flex'><div className="productLabel">Stock:</div>       <div>{products[0].stock}</div>    </div>
        </div>
      </div>
    </section>
  )
}

export default MyShopProductList;