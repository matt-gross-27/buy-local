import React, { useState } from 'react';
import { Image, Transformation } from 'cloudinary-react';

function UploadProduct(props) {
  const { formState, setFormState } = props;
  const [imgFile, setImgFile] = useState('');
  const [productPreview, setProductPreview] = useState('');
  const [message, setMessage] = useState('Preview Product');
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormState({
      ...formState,
      image: null
    });

    const file = event.target.files[0];
    setImgFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      setProductPreview(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dylyqjirh/image/upload'
    const CLOUDINARY_UPLOAD_PRESET = 'btm3uik0'
    const file = imgFile;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    if (file) {

      fetch(CLOUDINARY_URL, {
        method: 'POST',
        body: formData
      })
        .then(res => res.json())
        .then(data => {
          setLoading(false);
          console.log(data.public_id);

          setFormState({
            ...formState,
            image: data.public_id
          });
        })
        .catch(err => console.log(err));
    } else {
      alert('please upload a file!');
    }
    setMessage('Success!')
  }

  return (
    <>

      {!imgFile ?
        (
          <Image className='productImg' cloudName='dylyqjirh' publicId={formState.image || 'shopping-bags-500x500_vpqouy'}>
            <Transformation height={600} width={972} crop="fill" />
          </Image>
        ) :
        (
          // <img style={{ objectFit: 'cover' }} src={productPreview} alt="your product" />

          <Image className='productImg' cloudName='dylyqjirh' src={productPreview} >
            <Transformation height={600} width={972} crop="fill" />
          </Image>
        )
      }

      {!imgFile ? (<>
        <div className={'UploadProductEditBtn'} id="choose-product" style={{width: '100%', padding: '.3rem', background: '#6415ff', color: 'white', fontWeight: 'bold', borderBottom: '1px solid black', borderRight: '1px solid black', fontSize: 'small'}}>
          Change Image File
        </div>
        <input 
          style={{ position: 'absolute', width: '100%', zIndex: '99', opacity: '0', background: 'RED' }}
          onChange={handleChange}
          className="file-upload UploadProductEditBtn"
          accept='image/*'
          name="product-upload"
          type="file"
          data-form-data="{ 'transformation': {'crop':'fill','width':300px,'height':185px }}"
        />
      </>
      ) : (
        <button
          className="UploadProductEditBtn"
          onClick={handleSubmit}
          disabled={!imgFile || formState.image ? true : false}
          style={{position: 'absolute', width: '100%', padding: '.3rem', background: !formState.image ? '#f56565' : 'lightGreen', color: !formState.image ? 'white' : 'black', fontWeight: 'bold', borderBottom: '1px solid black', borderRight: '1px solid black', fontSize: 'small'}}
        >
          {loading ? 'Loading' : (!formState.image ? 'Upload File' : message)}
        </button>
      )}
    </>
  )
}

export default UploadProduct;