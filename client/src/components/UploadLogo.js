import React, { useState } from 'react';

function UploadLogo(props) {
  const { formState, setFormState, initialPreview } = props;
  const [imgFile, setImgFile] = useState('');
  const [logoPreview, setLogoPreview] = useState(initialPreview);
  const [message, setMessage] = useState('Preview Logo');
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormState({
      ...formState,
      logo: null
    });

    const file = event.target.files[0];
    setImgFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      setLogoPreview(reader.result);
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
            logo: data.public_id
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
      <div id='logo-form' encType="multipart/form-data">
        <div style={{ width: '100%', padding: '.5rem 0', background: '#6415ff', borderRadius: '0.5rem', color: 'white', fontWeight: 'bold', borderBottom: '1px solid black', borderRight: '1px solid black', fontSize: 'small' }}>
          Choose File
        </div>

        <input
          style={{ width: '100%', padding: '.5rem 0', visibility: '', zIndex: '99', position: 'relative', opacity: '0', top: '-36px' }}
          onChange={handleChange}
          className="file-upload"
          accept='image/*'
          name="logo-upload"
          type="file"
          data-form-data="{ 'transformation': {'crop':'fill','width':300,'height':300, radius='max' }}"
        />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '300px', width: '300px', boxShadow: '0 0 5px silver', margin: '0 auto', borderRadius: '100%' }} className="img-preview">
          {!imgFile ?
            (
              initialPreview ? (
                <img alt='logo preview' style={{ objectFit: 'cover', height: '300px', width: '300px', borderRadius: '100%' }} src={`https://res.cloudinary.com/dylyqjirh/image/upload/v1621788774/${initialPreview}`}/>
              ) : (
                <p>{message}</p>
              )
            ) :
            (
              <img style={{ objectFit: 'cover', height: '300px', width: '300px', borderRadius: '100%' }} src={logoPreview} alt="your logo" />
            )

          }
        </div>

        <button
          onClick={handleSubmit}
          disabled={!imgFile || formState.logo ? true : false}
          style={{
            marginTop: '64px', 
            width: '100%',
            padding: '.5rem',
            background: !formState.logo ? '#f56565' : 'lightGreen',
            borderRadius: '0.5rem',
            color: !formState.logo ? 'white' : 'black',
            fontWeight: 'bold',
            position: 'relative',
            top: '-36px'
          }}
        >
          { loading ? 'Loading' : (!formState.logo ? 'Upload File' : 'Success') }
        </button>
      </div>
    </div>
  )
}

export default UploadLogo;