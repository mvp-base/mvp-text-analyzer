import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { Container, Col } from 'react-bootstrap';

import Dashboard from './pages/Dashboard';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Import from './pages/Import';

export default function App() {
  return (
    <BrowserRouter>
      <Container fluid id="MainLoyout" className="d-flex flex-row vh-100 px-4 py-2">
        <Col xs={2} className="d-flex my-3">
          <Navigation />
        </Col>
        <Col className='d-flex flex-column'>
          <Container className='flex-fill'>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/import" element={<Import />} />
            </Routes>
          </Container>

          <Footer />
        </Col>
      </Container>
    </BrowserRouter>
  );
}
