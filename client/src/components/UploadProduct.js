import React, { useState } from 'react';

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
    <div style={{ textAlign: 'center', margin: '0 auto' }}>
      <div id='product-form' encType="multipart/form-data">
        <div id="choose-product" style={{ width: '100%', padding: '.5rem 0', background: '#6415ff', borderRadius: '0.5rem', color: 'white', fontWeight: 'bold', borderBottom: '1px solid black', borderRight: '1px solid black', fontSize: 'small' }}>
          Choose File
        </div>

        <input
          style={{ width: '100%', padding: '.5rem 0', visibility: '', zIndex: '99', position: 'relative', opacity: '0', top: '-36px' }}
          onChange={handleChange}
          className="file-upload"
          accept='image/*'
          name="product-upload"
          type="file"
          data-form-data="{ 'transformation': {'crop':'fill','width':300px,'height':185px }}"
        />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '185px', width: '300px', boxShadow: '0 0 5px silver', margin: '0 auto' }} className="img-preview">
          {!imgFile ?
            (
              <p>{message}</p>
            ) :
            (
              <img style={{ objectFit: 'cover', height: '185px', width: '300px' }} src={productPreview} alt="your product" />
            )

          }
        </div>

        <button
          onClick={handleSubmit}
          disabled={!imgFile || formState.image ? true : false}
          style={{
            marginTop: '64px', 
            width: '100%',
            padding: '.5rem',
            background: !formState.image ? '#f56565' : 'lightGreen',
            borderRadius: '0.5rem',
            color: !formState.image ? 'white' : 'black',
            fontWeight: 'bold',
            position: 'relative',
            top: '-36px'
          }}
        >
          { loading ? 'Loading' : (!formState.image ? 'Upload File' : 'Success') }
        </button>
      </div>
    </div>
  )
}

export default UploadProduct;