import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line

import { ReactComponent as FacebookIcon } from "../../images/facebook-icon.svg";
import { ReactComponent as GithubIcon } from "../../images/github.svg";
import { ReactComponent as YoutubeIcon } from "../../images/youtube-icon.svg";

const Container = tw.div`relative bg-gray-200 -mx-8 -mb-8 px-8`;
const FiveColumns = tw.div`max-w-screen-xl mx-auto py-16 lg:py-20 flex flex-wrap justify-between`;

const Column = tw.div`px-4 md:w-1/5`;
const WideColumn = tw(Column)`text-center md:text-left w-full md:w-2/5 mb-10 md:mb-0`;

const ColumnHeading = tw.h5`font-bold`;

const LinkList = tw.ul`text-sm font-medium`;
const LinkListItem = tw.li`mt-3`;
const Link = tw.a`border-b-2 border-transparent hocus:text-primary-500 hocus:border-primary-500 pb-1 transition duration-300`;

const LogoContainer = tw.div`flex items-center justify-center md:justify-start`;


const CompanyDescription = tw.p`mt-4 max-w-xs font-medium text-sm mx-auto md:mx-0 md:mr-4 `;

const SocialLinksContainer = tw.div`mt-4 `;
const SocialLink = styled.a`
  ${tw`cursor-pointer inline-block p-2 rounded-full bg-gray-700 text-gray-100 hover:bg-gray-900 transition duration-300 mr-4`}
  svg {
    ${tw`w-4 h-4`}
  }
`;

function SimpleFive() {
  return (
    <Container>
      <FiveColumns>
        <WideColumn>
          <LogoContainer>

          </LogoContainer>
          <CompanyDescription>
          </CompanyDescription>
          <SocialLinksContainer>
            <SocialLink href="https://facebook.com" target="_blank">
              <FacebookIcon />
            </SocialLink>
            <SocialLink href="https://github.com/matt-gross-27/buy-local" target="_blank">
              <GithubIcon />
            </SocialLink>
            <SocialLink href="https://www.youtube.com/watch?v=TPszlDVZ9GA" target="_blank">
              <YoutubeIcon />
            </SocialLink>
          </SocialLinksContainer>
        </WideColumn>
        <Column>
          <ColumnHeading>Quick Links</ColumnHeading>
          <LinkList>
            <LinkListItem>
              <Link href="#">FAQs</Link>
            </LinkListItem>
            <LinkListItem>
              <Link href="#">Support</Link>
            </LinkListItem>
            <LinkListItem>
              <Link href="#">About Us</Link>
            </LinkListItem>
          </LinkList>
        </Column>
        <Column>
          <ColumnHeading>Product</ColumnHeading>
          <LinkList>
            <LinkListItem>
              <Link href="/login">Log In</Link>
            </LinkListItem>
            <LinkListItem>
              <Link href="#">Personal</Link>
            </LinkListItem>
            <LinkListItem>
              <Link href="#">Business</Link>
            </LinkListItem>
            <LinkListItem>
              <Link href="#">Team</Link>
            </LinkListItem>
          </LinkList>
        </Column>
        <Column>
          <ColumnHeading>Legal</ColumnHeading>
          <LinkList>
            <LinkListItem>
              <Link href="/privacy-policy">Privacy Policy</Link>
            </LinkListItem>
            <LinkListItem>
              <Link href="/terms-of-service">Terms of Service</Link>
            </LinkListItem>
          </LinkList>
        </Column>
      </FiveColumns>
    </Container>
  );
};
export default SimpleFive;