'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Navbar, Col, Row, Image } from 'react-bootstrap';

import styles from './Navigation.module.scss'
import Button from './Button';

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
      <Row>
        <Col>
          <div className='primaryCard'>
            <Image className={styles.logoImage} src={adaptedLogo} alt="Logo" />
          </div>
        </Col>
        <Col className={styles.logoText}>
          <Row>TEXT</Row>
          <Row>ANALYZER</Row>
        </Col>
      </Row>
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
        <div className={`${styles.profileCard} primaryCard`}>
          <Image rounded className={styles.profileImage} src='/images/profile-default.png'></Image>
          <Row>View Profile</Row>
          <Button text="COMING SOON"></Button>
        </div>
      </div>
    </Navbar>
  );
}
