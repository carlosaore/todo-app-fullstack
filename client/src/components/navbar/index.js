import styled from 'styled-components';

const NavbarWrapper = styled.nav`
  width: 100%;
  height: 50px;
  background: aqua;
  display: flex;
`

const Navbar = () => (
    <NavbarWrapper>
        <p>This is the navbar</p>
    </NavbarWrapper>
);

export default Navbar;