import AnimationRevealPage from "helpers/AnimationRevealPage.js";
// import tw from "twin.macro";

import Footer from "components/footers/SimpleFiveColumn";
import ContactUsForm from "components/forms/TwoColContactUsWithIllustrationFullForm.js";

function ContactUs() {
  return (
    <AnimationRevealPage>
      <div className='container'>
      <ContactUsForm />
      </div>
      <Footer />
    </AnimationRevealPage>
  );
};
export default ContactUs;