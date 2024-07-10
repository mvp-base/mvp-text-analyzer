import { Container, Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import textLogo from '../assets/images/text-logo.svg';

type NavigationButtonType = {
  to: string;
  text: string;
  icon?: string;
};

function NavEntry(props: NavigationButtonType) {
  const { text, icon, to } = props;

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `d-flex gap-3 p-2 m-2 rounded-3 text-primary fw-bold ${
          isActive ? 'active-nav-link' : 'inactive-nav-link'
        }`
      }
    >
      <i className={icon}></i> {text}
    </NavLink>
  );
}

export default function Navigation() {
  return (
    <Navbar className="d-flex flex-column bg-white shadow flex-fill rounded-3 overflow-hidden p-0">
      <Container
        fluid
        className="d-flex justify-content-center bg-tetriary py-3"
      >
        <NavLink to="/" className="text-white">
        <img src={textLogo} className="App-logo" alt="logo" />
        </NavLink>
      </Container>
      <Nav className="d-flex flex-column w-100 my-2" id="MainNav">
        <NavEntry to="/" icon="bi bi-bar-chart" text="DASHBOARD" />
        <NavEntry to="/imports" icon="bi bi-upload" text="IMPORTS" />
      </Nav>
    </Navbar>
  );
}
