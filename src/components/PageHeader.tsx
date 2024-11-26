import { Container } from 'react-bootstrap';
import InfoPopOver from './InfoPopOver';

import styles from './PageHeader.module.scss'

interface IPageHeader {
  text: string;
  description: string;
}

export default function PageHeader(props: IPageHeader) {
  const { text, description } = props;

  return (
    <Container className={styles.container} fluid>
      <h1 id='actionCardHeader' className={styles.header}>{text}</h1>
      <InfoPopOver content={description} />
    </Container>
  );
}
