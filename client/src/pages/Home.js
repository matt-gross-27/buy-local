import React from 'react';
import tw from "twin.macro";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Hero from "components/hero/TwoColumnWithVideo.js";


import MainFeature2 from "components/features/TwoColSingleFeatureWithStats2.js";
// import Testimonial from "components/testimonials/ThreeColumnWithProfileImage.js";
import DownloadApp from "components/cta/DownloadApp.js";
import Footer from "components/footers/SimpleFiveColumn.js";

import firstImage from "images/first-img.jpg";
import GetAllShops from "../components/GetAllShops"

function Home() {
  const Subheading = tw.span`tracking-wider text-sm font-medium`;
  const HighlightedText = tw.span`bg-primary-500 text-gray-100 px-4 transform -skew-x-12 inline-block`;
  const HighlightedTextInverse = tw.span`bg-gray-100 text-primary-500 px-4 transform -skew-x-12 inline-block`;
  // const Description = tw.span`inline-block mt-8`;
  const imageCss = tw`rounded-4xl`;


  return (
    <AnimationRevealPage>
      <div className='container'>
        <Hero
          imageSrc={firstImage}
          imageDecoratorBlob={true}
        />
        {/* TabGrid Component also accepts a tabs prop to customize the tabs and its content directly. Please open the TabGrid component file to see the structure of the tabs props.*/}
        <span id='vendors'></span>
        <GetAllShops />
        <MainFeature2
          subheading={<Subheading>A Reputed Brand</Subheading>}
          heading={<>Why <HighlightedText>Choose Us ?</HighlightedText></>}
          statistics={[
            {
              key: "Orders",
              value: "40+",
            },
            {
              key: "Customers",
              value: "100+"
            },
            {
              key: "Vendors",
              value: "50+"
            }
          ]}
          primaryButtonText="Order Now"
          primaryButtonUrl="#vendors"
          imageInsideDiv={false}
          imageSrc="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEzNzI2fQ&auto=format&fit=crop&w=768&q=80"
          imageCss={Object.assign(tw`bg-cover`, imageCss)}
          imageContainerCss={tw`md:w-1/2 h-auto`}
          imageDecoratorBlob={true}
          imageDecoratorBlobCss={tw`left-1/2 md:w-32 md:h-32 -translate-x-1/2 opacity-25`}
          textOnLeft={true}
        />
        <DownloadApp
          text={<>People around you are already ordering using the <HighlightedTextInverse>Buy Local App.</HighlightedTextInverse></>}
        />

        <Footer />
      </div>
    </AnimationRevealPage>
  );
}

export default Home;