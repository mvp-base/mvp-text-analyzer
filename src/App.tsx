import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { Container, Col, Row } from 'react-bootstrap';

import Dashboard from './pages/Dashboard';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Imports from './pages/Imports';

export default function App() {
  return (
    <BrowserRouter>
      <Container fluid id="MainLoyout" className="vh-100 d-flex flex-column">
        <Row className="flex-fill m-0 my-4">
          <Col xs="auto" className='d-flex flex-column'>
            <Navigation />
          </Col>
          <Col className="d-flex flex-column">
            <Container fluid className="d-flex flex-fill m-0">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/imports" element={<Imports />} />
              </Routes>
            </Container>
            <Footer />
          </Col>
        </Row>
      </Container>
    </BrowserRouter>
  );
}
