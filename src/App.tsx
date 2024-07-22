import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { Container, Col, Row } from 'react-bootstrap';

import styles from './App.module.scss';
import Dashboard from './pages/Dashboard';
import Navigation from './components/Navigation';
import Imports from './pages/Imports';
import Links from './components/Links';

export default function App() {
  return (
    <BrowserRouter>
      <Container fluid id="MainLayout" className={styles['main-layout']}>
        {/* Mobile Layout */}
        <Container fluid className={styles['mobile-container']}>
          <Row xs="auto">
            <Navigation direction="row" />
          </Row>
          <Row id="Body" className={styles['body']}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/imports" element={<Imports />} />
            </Routes>
          </Row>
        </Container>
        {/* Desktop Layout */}
        <Container fluid className={styles['desktop-container']}>
          <Row>
            <Links direction="row" />
          </Row>
          <Row className={styles['nav-body-container']}>
            <Col xs="auto">
              <Navigation direction="column" />
            </Col>
            <Col id="Body" className={styles['body']}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/imports" element={<Imports />} />
              </Routes>
            </Col>
          </Row>
        </Container>
      </Container>
    </BrowserRouter>
  );
}
