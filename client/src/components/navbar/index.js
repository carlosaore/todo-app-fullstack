import styled from 'styled-components';

const NavbarWrapper = styled.nav`
  width: 100%;
  height: 50px;
  background: aqua;
  display: flex;
`

const Navbar = (props) => {

    const handleResetBoard = () => {
        fetch(`/api/board/reset`, {
            method: 'PUT',
        }).then(res => res.json())
        .then(res => console.log(res))
        .catch(error => console.error(error))
        .then(props.getData());
    };

    return (
        <NavbarWrapper>
            <p>This is the navbar</p>
            <button onClick={handleResetBoard}>Reset board (warning: no take-backsies)</button>
        </NavbarWrapper>
    )
};

export default Navbar;