import { Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import logo from '../assets/images/text-analyzer.svg';

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
      className={({ isActive }) => `navlink ${isActive && 'active-nav-link'}`}
    >
      <span>
        <i className={icon}></i> {text}
      </span>
    </NavLink>
  );
}

export default function Navigation() {
  return (
    <Navbar className="nav">
      <img src={logo} className="d-inline-block align-top" alt="Logo" />
      <div className="horizontal-separator bg-white" />
      <NavEntry to="/" icon="bi bi-bar-chart" text="DASHBOARD" />
      <NavEntry to="/imports" icon="bi bi-upload" text="IMPORTS" />
    </Navbar>
  );
}
