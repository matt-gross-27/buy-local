import React, { useState, useEffect } from 'react';

function UploadLogo() {
  const [imgFile, setImgFile] = useState('');
  const [logoPreview, setLogoPreview] = useState('');
  const [message, setMessage] = useState('Preview Logo');
  
  const handleChange = (event) => {
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
          console.log(data);
        })
        .catch(err => console.log(err));
    } else {
      alert('please upload a file!');
    }
    setMessage('Success!')
  }
  
  return (
    <div style={{ textAlign: 'center', margin: '50px 0' }}>
      <div style={{ display: 'flex', alignItems:'center', justifyContent:'center', height: '300px', width: '300px', boxShadow: '0 0 5px silver', margin: '30px auto', borderRadius: '100%'}} className="img-preview">
        {!imgFile ?
          (
            <p>{message}</p>
          ) :
          (
            <img style={{ objectFit: 'cover', height: '300px', width: '300px', borderRadius: '100%' }} src={logoPreview} alt="your logo" />
          )

        }
      </div>

      <form id='logo-form' encType="multipart/form-data" onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          className="file-upload"
          accept='image/*'
          name="logo-upload"
          type="file"
          data-form-data="{ 'transformation': {'crop':'fill','width':300,'height':300, radius='max' }}"
        />
        <button disabled={!imgFile ? true : false} type='submit'>
          Upload File
        </button>
      </form>
    </div>
  )
}

export default UploadLogo;