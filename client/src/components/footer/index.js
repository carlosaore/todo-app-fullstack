import styled from 'styled-components';

const FooterWrapper = styled.footer`
  width: 100%;
  height: 50px;
  background: aqua;
  display: flex;
`

const Footer = () => (
    <FooterWrapper>
        <p>This is the footer</p>
    </FooterWrapper>
);

export default Footer;