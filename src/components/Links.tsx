import { Container } from 'react-bootstrap';

interface ILinks {
  direction: 'row' | 'column';
}

export default function Links(props: ILinks) {
  const { direction } = props;

  return (
    <Container fluid className={`d-flex flex-${direction} gap-3 justify-content-end px-4`}>
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
