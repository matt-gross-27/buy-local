import React from 'react';
import Logo from '../components/Logo'
import UploadLogo from '../components/UploadLogo'

function TestCloudinary() {
  return (
    <>
      <h2>Display Logo</h2>
      <Logo logo="Screen_Shot_2021-05-18_at_7.22.02_PM_gu1bfi" logoScale={300} />
      <h2>Upload Logo</h2>
      <UploadLogo />
    </>
  )
}

export default TestCloudinary;