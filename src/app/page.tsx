import { Container, Row, Col } from 'react-bootstrap';

export default function Home() {
  return (
    <Container>
    <Row>
      <Col xs={1} md={5}>
        <div style={{ backgroundColor: 'lightblue', padding: '1rem' }}>
          Content 1
        </div>
      </Col>
      <Col xs={12} md={4}>
        <div style={{ backgroundColor: 'lightgreen', padding: '1rem' }}>
          Content 2
        </div>
      </Col>
      <Col xs={12} md={4}>
        <div style={{ backgroundColor: 'lightcoral', padding: '1rem' }}>
          Content 3
        </div>
      </Col>
      <Col xs={12} md={4}>
        <div style={{ backgroundColor: 'lightcoral', padding: '1rem' }}>
          Content 3
        </div>
      </Col>
    </Row>
  </Container>
  );
}
