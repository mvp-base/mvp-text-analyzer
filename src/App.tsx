import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { Container, Col, Row } from 'react-bootstrap';

import styles from './App.module.scss'
import Dashboard from './pages/Dashboard';
import Navigation from './components/Navigation';
import Imports from './pages/Imports';
import Links from './components/Links';

export default function App() {
  return (
    <BrowserRouter>
      <Container fluid id="MainLoyout" className={styles['main-layout']}>
        {/* Mobile Layout */}
        <Row className={styles['mobile-container']}>

        </Row>
        {/* Desktop Layout */}
        <Row className={styles['desktop-container']}>
          <Container className="d-none d-md-flex flex-column flex-grow-1 m-0 p-0">
            <Row>
              <Links direction="row" />
            </Row>
            <Row className="">
              <Col md="auto" className="d-flex flex-column">
                <Navigation />
              </Col>
              <Col className="d-flex flex-column body">
                <Container fluid className="d-flex flex-fill m-0">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/imports" element={<Imports />} />
                  </Routes>
                </Container>
              </Col>
            </Row>
          </Container>
        </Row>
      </Container>
    </BrowserRouter>
  );
}
