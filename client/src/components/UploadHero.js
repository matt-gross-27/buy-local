import React, { useState } from 'react';

function UploadHero(props) {
  const { formState, setFormState } = props;
  const [imgFile, setImgFile] = useState('');
  const [heroPreview, setHeroPreview] = useState('');
  const [message, setMessage] = useState('Preview Hero');

  const handleChange = (event) => {
    setFormState({
      ...formState,
      hero: null
    });

    const file = event.target.files[0];
    setImgFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      setHeroPreview(reader.result);
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
          console.log(data.public_id);

          setFormState({
            ...formState,
            hero: data.public_id
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
      <div id='hero-form' encType="multipart/form-data">
        <div id="choose-hero" style={{ width: '100%', padding: '.5rem 0', background: '#6415ff', borderRadius: '0.5rem', color: 'white', fontWeight: 'bold', borderBottom: '1px solid black', borderRight: '1px solid black', fontSize: 'small' }}>
          Choose File
        </div>

        <input
          style={{ width: '100%', padding: '.5rem 0', visibility: '', zIndex: '99', position: 'relative', opacity: '0', top: '-36px' }}
          onChange={handleChange}
          className="file-upload"
          accept='image/*'
          name="hero-upload"
          type="file"
          data-form-data="{ 'transformation': {'crop':'fill','width':300px,'height':185px }}"
        />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '185px', width: '300px', boxShadow: '0 0 5px silver', margin: '0 auto' }} className="img-preview">
          {!imgFile ?
            (
              <p>{message}</p>
            ) :
            (
              <img style={{ objectFit: 'cover', height: '185px', width: '300px' }} src={heroPreview} alt="your hero" />
            )

          }
        </div>

        <button
          onClick={handleSubmit}
          disabled={!imgFile || formState.hero ? true : false}
          style={{
            marginTop: '64px', 
            width: '100%',
            padding: '.5rem',
            background: !formState.hero ? '#f56565' : 'lightGreen',
            borderRadius: '0.5rem',
            color: !formState.hero ? 'white' : 'black',
            fontWeight: 'bold',
            position: 'relative',
            top: '-36px'
          }}
        >
          {!formState.hero ? 'Upload File' : 'Success'}
        </button>
      </div>
    </div>
  )
}

export default UploadHero;