import { Container } from 'react-bootstrap';
import InfoPopOver from './InfoPopOver';

import styles from './Header.module.scss'

interface IHeader {
  text: string;
  description?: string;
  size: 1 | 2 | 3;
}

export default function Header(props: IHeader) {
  const { text, description, size } = props;

  return (
    <Container className={styles.container} fluid>
      {size == 1 && <h1 id='actionCardHeader' className={styles.header}>{text}</h1>}
      {size == 2 && <h2 id='actionCardHeader' className={styles.header}>{text}</h2>}
      {size == 3 && <h3 id='actionCardHeader' className={styles.header}>{text}</h3>}
      {description && <InfoPopOver content={description} />}
    </Container>
  );
}
