import React from 'react';
import { Image, Transformation } from 'cloudinary-react';

function Logo(props) {
  const { logo, logoScale } = props;

  return (
    <div className="logoDiv" style={{ height: logoScale, textAlign: "center", width: '100%', backgroundColor: 'white' }}>
      <Image cloudName='dylyqjirh' publicId={logo} style={{boxShadow: '0 0 5px silver', borderRadius: '100%'}}>
        <Transformation height={logoScale} width={logoScale} crop="fill" radius="max" />
      </Image>
    </div>
  )
}

export default Logo;