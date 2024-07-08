import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import Home from './pages/Home';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Import from './pages/Import';

export default function App() {
  return (
    <BrowserRouter>
      <Container fluid id="MainLoyout" className="d-flex flex-row vh-100">
        <Col xs={2} className="d-flex my-3">
          <Nav />
        </Col>
        <Col className='d-flex flex-column'>
          <Container className='flex-fill'>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/import" element={<Import />} />
            </Routes>
          </Container>

          <Footer />
        </Col>
      </Container>
    </BrowserRouter>
  );
}
