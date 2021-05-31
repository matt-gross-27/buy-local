import React, { useState } from 'react';
import { Image, Transformation } from 'cloudinary-react';
import UploadProductEdit from '../components/UploadProductEdit'
import { UPDATE_PRODUCT } from '../utils/mutations'
import { useMutation } from '@apollo/react-hooks'
import { GET_SHOP_BY_ID } from 'utils/queries';

function MyShopProduct({ product }) {
  const { _id, name, price, description, stock, image, category } = product
  const [editable, setEditable] = useState(false);
  const [updateProduct] = useMutation(UPDATE_PRODUCT, {
    refetchQueries: [{
      query: GET_SHOP_BY_ID
    }]
  });

  const [formState, setFormState] = useState({
    _id: _id,
    name: name,
    price: price,
    description: description,
    stock: stock,
    image: image,
    categoryName: category.name
  });

  const editProduct = async (e) => {
    if (editable) {
      try {
        await updateProduct({
          variables: {...formState}
        });
        setEditable(!editable)
      } catch (error) {
        console.log(error)
      }
    } else {
      setEditable(!editable)
    }
  }

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    if (name === 'price') {
      setFormState({
        ...formState,
        [name]: Math.round(parseFloat(value) * 100)/100
      });
    }
    else if (name === 'stock') {
      setFormState({
        ...formState,
        [name]: parseInt(value)
      });

    } else {
      setFormState({
        ...formState,
        [name]: value
      });
    }
  }


  if (!editable) {
    return (
      <div className="d-flex flex-row flex-wrap border mb-3" style={{ boxShadow: '3px 3px 3px silver' }}>
        <div className='p-3 col-12 col-md-5 p-1 productImgDiv'>
          <span className='editBtn' onClick={editProduct}>🔒</span>
          <Image className='productImg' cloudName='dylyqjirh' publicId={image || 'shopping-bags-500x500_vpqouy'}>
            <Transformation height={600} width={972} crop="fill" />
          </Image>
        </div>
        <div className='p-3 col-12 col-md-7 d-flex flex-column justify-content-around'>
          <div className='d-flex flex-wrap'>
            <div className="font-weight-bold pr-0">Name:</div>
            <div className='px-2'>{name}</div>
          </div>

          <div className='d-flex flex-wrap'>
            <div className="font-weight-bold pr-0">Price:</div>
            <div className='px-2'>${price}</div>
          </div>

          <div className='d-flex flex-wrap'>
            <div className="font-weight-bold pr-0">Description:</div>
            <div className='px-2'>{description}</div>
          </div>
          <div className='d-flex flex-wrap'>
            <div className="font-weight-bold pr-0">Stock:</div>
            <div className='px-2'>{stock}</div>
          </div>
        </div>
      </div>
    )
  } else {

    return (
      <div className="d-flex flex-row flex-wrap border border-warning mb-3" style={{ boxShadow: '3px 3px 3px silver' }}>
        <div className='p-3 col-12 col-md-5 p-1 productImgDiv border border-warning'>
          <span className='editBtn' onClick={editProduct}>🔓</span>
          <UploadProductEdit formState={formState} setFormState={setFormState} />
        </div>

        <div className='p-3 col-12 col-md-7 d-flex flex-column justify-content-between'>
          <div className='d-flex flex-wrap'>
            <div className="productLabel pr-0">Name:</div>
            <input name='name' className='px-2 product-input' placeholder={name} value={formState.name} onChange={handleChange} />
          </div>

          <div className='d-flex flex-wrap'>
            <div className="productLabel pr-0">Price:</div>
            <input type= 'number' name='price' className='px-2 product-input' placeholder={price} step="0.01" value={isNaN(formState.price) || formState.price < 0 ? 0 : formState.price} onChange={handleChange} />
          </div>

          <div className='d-flex flex-wrap'>
            <div className="productLabel pr-0">Description:</div>
            <textarea name='description' className='px-2 w-100 product-input' placeholder={description} value={formState.description} onChange={handleChange} />
          </div>
          <div className='d-flex flex-wrap'>
            <div className="productLabel pr-0">Stock:</div>
            <input type='number' name='stock' className='px-2 product-input' placeholder={stock} value={isNaN(formState.stock) || formState.stock < 0 ? 0 : formState.stock} onChange={handleChange} />
          </div>
          <div className='d-flex flex-wrap'>
            <div className="productLabel pr-0">Category:</div>
            <input name='categoryName' className='px-2 product-input' placeholder={category.name} value={formState.categoryName} onChange={handleChange} />
          </div>
        </div>
      </div>
    )
  }
}

export default MyShopProduct;