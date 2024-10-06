import { NavLink, Link } from "react-router-dom";

import styled from "styled-components";

import styles from "./PageNavBar.module.css";

import { Logo } from "@common/components";

/// Navbar USING CSS-IN-JS (STYLED-COMPONENTS)
/* const LinkContainer = styled.ul`
  list-style: none;
  display: flex;
  gap: 2rem;

  & .active {
    color: red;
  }
`;

const StylesNavLink = styled(NavLink)`
  color: black;
`;

function NavBar() {
  return (
    <div>
      <LinkContainer>
        <li>
          <StylesNavLink to="/">Go to - Home Page</StylesNavLink>
        </li>
        <li>
          <StylesNavLink to="/product">Go to - Product Page</StylesNavLink>
        </li>
        <li>
          <StylesNavLink
            to="/pricing"
            className={({ isActive, isPending }) =>
              isActive ? "activeLink" : ""
            }
          >
            Go to - Pricing Page
          </StylesNavLink>
        </li>
      </LinkContainer>
    </div>
  );
} */

/// Navbar USING CSS-MODULES

function NavBar() {
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/login" className={styles.ctaLink}>
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
