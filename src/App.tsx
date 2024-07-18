import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { Container, Col, Row } from 'react-bootstrap';

import Dashboard from './pages/Dashboard';
import Navigation from './components/Navigation';
import Imports from './pages/Imports';
import Links from './components/Links';

export default function App() {
  return (
    <BrowserRouter>
      <Container fluid id="MainLoyout" className="d-flex vh-100 m-0">
        {/* Mobile Layout */}
        <Row className="d-md-none m-0"></Row>
        {/* Desktop Layout */}
        <Row className="d-none d-md-flex flex-grow-1 m-0">
          <Container className="d-none d-md-flex flex-column flex-grow-1 m-0 p-0">
            <Row className="m-0 py-2">
              <Links direction="row" />
            </Row>
            <Row className="flex-grow-1 m-0 p-0">
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
