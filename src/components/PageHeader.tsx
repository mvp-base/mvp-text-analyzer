import { Container } from 'react-bootstrap';
import InfoPopOver from './InfoPopOver';
import styles from './PageHeader.module.scss';

interface IPageHeader {
  text: string;
  description: string;
}

export default function PageHeader(props: IPageHeader) {
  const { text, description } = props;

  return (
    <Container fluid className={styles['page-header-container']}>
      <h1>{text}</h1>
      <InfoPopOver content={description} />
    </Container>
  );
}
