'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Navbar, Image } from 'react-bootstrap';

import styles from './Navigation.module.scss'

interface INavButton {
  to: string;
  text: string;
  icon?: string;
}

function NavButton(props: INavButton) {
  const { text, icon, to } = props;

  const pathname = usePathname();
  const isActive = pathname === to;

  const adaptedIcon = isActive ? `${icon}-fill` : icon;

  return (
    <Link href={to} style={{ textDecoration: 'none' }}>
      <span className={`${styles.navLink} ${isActive && styles.active}`}>
        <i className={`${styles.buttonImage} ${adaptedIcon}`}></i>
        {text}
      </span>
    </Link>
  );
}

function NavHome() {
  const pathname = usePathname();
  const isActive = pathname === '/';

  const adaptedLogo = isActive ? '/images/ta-logo-fill.png' : '/images/ta-logo.png';

  return (
    <Link href="/" className={`${styles.navLink} ${isActive && styles.active}`}>
      <span className={`${styles.navLink} ${isActive && styles.active}`}>
        <Image className={styles.logoImage} src={adaptedLogo} alt="Logo" />
        <p className={styles.logoText}>TEXT <br /> ANALYZER</p>
      </span>
    </Link >
  );
}

export default function Navigation() {
  return (
    <Navbar className={styles.nav}>
      <div className={styles.navSide}>
        <NavHome />
      </div>
      <div className={styles.navBody} >
        <NavButton to="/dashboard" icon="bi bi-grid-1x2" text="DASHBOARD" />
        <NavButton to="/imports" icon="bi bi-file-earmark-arrow-up" text="IMPORTS" />
      </div>
      <div className={styles.navSide}>
        <a
          href="https://github.com/vanm30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className={`bi bi-github ${styles.extLink}`}></i>
        </a>
        <a
          href="https:/linkedin.com/in/vanm30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className={`bi bi-linkedin ${styles.extLink}`}></i>
        </a>
      </div>
    </Navbar>
  );
}
