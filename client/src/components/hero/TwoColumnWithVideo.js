import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
//eslint-disable-next-line
import { css } from "styled-components/macro";

import Header from "../headers/light.js";

import { ReactComponent as SvgDecoratorBlob1 } from "../../images/svg-decorator-blob-1.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "../../images/dot-pattern.svg";
import DesignIllustration from "../../images/design-illustration.svg";


const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col lg:flex-row md:items-center max-w-screen-xl mx-auto py-20 md:py-24`;
const LeftColumn = tw.div`relative lg:w-6/12 lg:pr-12 flex-shrink-0 text-center lg:text-left`;
const RightColumn = tw.div` mt-12 lg:mt-0 ml-4 flex flex-col justify-center`;

const Heading = tw.h1`font-black text-purple-300 md:text-5xl leading-snug max-w-3xl`;
const Paragraph = tw.p`my-5 lg:my-8 text-sm lg:text-base font-medium text-gray-600 max-w-lg mx-auto lg:mx-0`;
const HighlightedText = tw.span`bg-primary-500 text-gray-100 px-4 transform -skew-x-12 inline-block`;

const Actions = tw.div`flex flex-col items-center sm:flex-row justify-center lg:justify-start mt-8`;


const IllustrationContainer = tw.div`flex justify-center md:justify-end items-center relative max-w-3xl lg:max-w-none`;

// Random Decorator Blobs (shapes that you see in background)
const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none opacity-5 absolute left-0 bottom-0 h-64 w-64 transform -translate-x-2/3  -z-10`}
`;
const DecoratorBlob2 = styled(SvgDecoratorBlob2)`
  ${tw`pointer-events-none fill-current text-primary-500 opacity-25 absolute w-32 h-32 right-0 bottom-0 transform translate-x-10 translate-y-10 -z-10`}
`;


function HeroDisplay ({
  heading = "Eat, Drink, Shop  ",
 description="Support local independent homemakers! Purchasing through Buy Local proceeds will go directly to amazing unique vendors in your community!",
  imageSrc=DesignIllustration,
  imageDecoratorBlob = false,
}) {

  return (
    <>
      <Header />
      <Container>
        <TwoColumn>
           <LeftColumn> 
            <Heading>{heading}
            <HighlightedText>Local</HighlightedText>
            </Heading>
            <Paragraph>{description}</Paragraph>
            <Actions>
              {/* <PrimaryButton as="a" href={primaryButtonUrl}>{primaryButtonText}</PrimaryButton> */}
             {/* <WatchVideoButton onClick={toggleModal}>
                <span className="playIconContainer">
                  <PlayIcon className="playIcon" />
                </span>
                <span className="playText">{watchVideoButtonText}</span>
              </WatchVideoButton> */}
            </Actions>
          </LeftColumn>
          <RightColumn>
            <IllustrationContainer>
              <img
                src={imageSrc}
                alt="Hero"
              />
              {imageDecoratorBlob && <DecoratorBlob2 />}
            </IllustrationContainer>
          </RightColumn>
        </TwoColumn>
        <DecoratorBlob1 />

      </Container>
    </>
  );
};
export default HeroDisplay;