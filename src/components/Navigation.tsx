import { Navbar } from 'react-bootstrap';
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
        `d-flex flex-column align-items-center m-2 rounded-3 text-white fw-bold ${
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
    <Navbar className="d-flex flex-column flex-fill bg-primary card rounded-3 mx-2">
      <NavEntry to="/" icon="bi bi-bar-chart" text="DASHBOARD" />
      <NavEntry to="/imports" icon="bi bi-upload" text="IMPORTS" />
    </Navbar>
  );
}
