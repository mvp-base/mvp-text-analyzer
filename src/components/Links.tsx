import { Container } from 'react-bootstrap';
import styles from './Links.module.scss';

interface ILinks {
  direction: 'row' | 'column';
}

export default function Links(props: ILinks) {
  const { direction } = props;

  return (
    <Container      
      className={`${styles['links-container']} flex-${direction}`}
    >
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
