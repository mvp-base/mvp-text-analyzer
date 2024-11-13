'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Navbar } from 'react-bootstrap';

import styles from './Navigation.module.scss'

interface INavButton {
  to: string;
  text: string;
  icon?: string;
}

interface INavIcon {
  to: string;
  iconSrc: string;
}

function NavButton(props: INavButton) {
  const { text, icon, to } = props;
  const pathname = usePathname();

  const isActive = pathname === to;

  return (
    <Link href={to}>
      <span className={isActive ? 'active' : ''}>
        <i className={icon}></i> {text}
      </span>
    </Link>
  );
}

function NavIcon(props: INavIcon) {
  const { iconSrc, to } = props;

  return (
    <Link href={to} className={styles.navLink}>
      <img src={iconSrc} alt="Logo" />
    </Link>
  );
}

export default function Navigation() {
  return (
    <Navbar className={`${styles.nav} ${styles.vertical}`}>
      <NavIcon to="/" iconSrc="/images/text-analyzer.svg" />
      <div className="horizontal-separator-dark" />
      <NavButton to="/dashboard" icon="bi bi-bar-chart" text="DASHBOARD" />
      <NavButton to="/imports" icon="bi bi-upload" text="IMPORTS" />
    </Navbar>
  );
}
