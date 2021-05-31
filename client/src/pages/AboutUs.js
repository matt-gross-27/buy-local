import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import tw from "twin.macro";
import Footer from "components/footers/SimpleFiveColumn.js"
import MainFeature1 from "components/features/TwoColWithButton.js";
import TeamCardGrid from "components/cards/ProfileThreeColGrid.js";

const Subheading = tw.span`uppercase tracking-wider text-sm`;
function AboutUs() {
  return (
    <AnimationRevealPage>
      <div className='container'>
      <MainFeature1
        subheading={<Subheading>About Us</Subheading>}
        heading="Eat, Drink, Shop Local"
        buttonRounded={false}
        primaryButtonText="See Github"
        imageSrc="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=768&q=80"
      />

      <TeamCardGrid 
        subheading={<Subheading></Subheading>}
      />
      </div>
      <Footer />
    </AnimationRevealPage>
  );
};
export default AboutUs;