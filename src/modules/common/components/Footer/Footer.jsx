import styled from "styled-components";

const StyledFooter = styled.footer`
  margin-top: auto;

  & p {
    font-size: 1.4rem;
    color: var(--color-light--1);
  }
`;

function Footer() {
  return (
    <StyledFooter>
      <p>&copy; Copyright {new Date().getFullYear()} by WorldWise Inc.</p>
    </StyledFooter>
  );
}

export default Footer;
