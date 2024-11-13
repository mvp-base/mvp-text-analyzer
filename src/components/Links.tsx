import { Container } from 'react-bootstrap';

export default function Links() {

  return (    
    <Container>
      <a
        href="https://github.com/vanm30"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="bi bi-github fs-2 link-light"></i>
      </a>
      <a
        href="https:/linkedin.com/in/vanm30"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="bi bi-linkedin fs-2 link-light"></i>
      </a>
    </Container>
  );
}
