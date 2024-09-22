import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledNavLink = styled(Link)`
  & img {
    height: 5.2rem;
  }
`;

function Logo() {
  return (
    <StyledNavLink to="/">
      <img src="/logo.png" alt="travel-diary-logo" />
    </StyledNavLink>
  );
}

export default Logo;
