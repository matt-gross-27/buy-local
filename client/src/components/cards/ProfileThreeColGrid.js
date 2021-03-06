import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts.js";
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings";
import {SectionDescription} from "components/misc/Typography";

import { ReactComponent as GithubIcon } from "images/github-icon.svg";
import davitShirkhanyan from "images/davitshirkhanyan.jpg";
import alexGiannini from "images/alexgiannini.png";
import jenniferGomez from "images/jennifergomez.jpg";
import mattMcGinley from "images/mattmcginley.jpg";
import mattGross from "images/mattgross.jpg";

const HeadingContainer = tw.div``
const Heading = tw(SectionHeading)``
const Subheading = tw(SubheadingBase)`text-center mb-3`
const Description = tw(SectionDescription)`mx-auto text-center`
const HighlightedText = tw.span`bg-primary-500 text-gray-100 px-4 transform -skew-x-12 inline-block`;

const Cards = tw.div`flex flex-wrap flex-row justify-center sm:max-w-2xl lg:max-w-5xl mx-auto`
const Card = tw.div`mt-24 w-full sm:w-1/2 lg:w-1/3 flex flex-col items-center`
const CardImage = styled.div`
  ${props => css`background-image: url("${props.imageSrc}");`}
  ${tw`w-64 h-64 bg-contain bg-center rounded`}
`
const CardContent = styled.div`
  ${tw`flex flex-col items-center mt-6`}
  .position {
    ${tw`uppercase font-bold tracking-widest text-xs text-primary-500`}
  }
  .name {
    ${tw`mt-1 text-xl font-medium text-gray-900`}
  }
 `

const CardLinks = styled.div`
  ${tw`mt-6 flex`}
  .link {
    ${tw`mr-8 last:mr-0 text-gray-400 hocus:text-primary-500 transition duration-300`}
    .icon {
      ${tw`fill-current w-6 h-6`}
    }
  }
`

function Team ({
  heading = "Meet the ",
  subheading = "",
  description = "",
  cards = [
    {
      imageSrc: alexGiannini,
      position: "Sr. Developer",
      name: "Alex Giannini",
      links: [
        {
          url: "https://github.com/alexandergiannini",
          icon: GithubIcon,
        },
      ],
    },
    {
      imageSrc: davitShirkhanyan,
      position: "Sr. Developer",
      name: "Davit Shirkhanyan",
      links: [
        {
          url: "https://github.com/davitshirkhanyan",
          icon: GithubIcon,
        },
      ],
    },
    {
      imageSrc: jenniferGomez,
      position: "Sr. Developer",
      name: "Jennifer Gomez",
      links: [
        {
          url: "https://github.com/cleanjenn",
          icon: GithubIcon,
        },
      ],
    },
    {
      imageSrc: mattGross,
      position: "Sr. Developer",
      name: "Matt Gross",
      links: [
        {
          url: "https://github.com/matt-gross-27",
          icon: GithubIcon,
        },
      ],
    },
    {
      imageSrc: mattMcGinley,
      position: "Sr. Developer",
      name: "Matt McGinley",
      links: [
        {
          url: "https://github.com/mmcginley81",
          icon: GithubIcon,
        },
      ],
    },
    
  ]
}) {
  return (
    <Container>
      <ContentWithPaddingXl>
        <HeadingContainer>
          {subheading && <Subheading>{subheading}</Subheading>}
          {heading && <Heading>{heading}<HighlightedText>Team</HighlightedText></Heading> }
          {description && <Description>{description}</Description> }
        </HeadingContainer>
        <Cards>
          {cards.map((card, index) => (
            <Card key={index}>
              <CardImage imageSrc={card.imageSrc} />
              <CardContent>
                <span className="position">{card.position}</span>
                <span className="name">{card.name}</span>
                <CardLinks>
                  {card.links.map((link, linkIndex) => (
                    <a key={linkIndex} className="link" href={link.url}>
                      <link.icon className="icon" />
                    </a>
                  ))}
                </CardLinks>
              </CardContent>
            </Card>
          ))}
        </Cards>
      </ContentWithPaddingXl>
    </Container>
  );
};

export default Team;