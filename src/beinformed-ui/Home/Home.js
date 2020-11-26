// @flow
import styled from "styled-components";
import { spacer } from "beinformed/theme/utils";

import logo from "./logo.png";

import { Message } from "beinformed/i18n";
import { Heading } from "_component-registry/elements";

const Banner = styled.main`
  height: 325px;
`;

const Center = styled.div`
  position: relative;
  top: 50%;

  text-align: center;

  transform: translateY(-50%);
`;

const Image = styled.img`
  margin-top: ${spacer(-0.3)};
  margin-bottom: ${spacer(0.5)};
`;

/**
 * Render a home page
 */
const Home = () => (
  <Banner className="homepage banner">
    <Center>
      <Image src={logo} alt="Logo of Be Informed" />
      <br />
      <Heading>
        <Message id="Homepage.Header" defaultMessage="Hello" />
      </Heading>
      <p>
        <Message
          id="Homepage.Msg"
          defaultMessage="This is an example homepage"
        />
      </p>
    </Center>
  </Banner>
);

Home.displayName = "BI.Home";

export default Home;
