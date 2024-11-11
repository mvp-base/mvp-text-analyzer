import { Container } from 'react-bootstrap';
import InfoPopOver from './InfoPopOver';

interface IPageHeader {
  text: string;
  description: string;
}

export default function PageHeader(props: IPageHeader) {
  const { text, description } = props;

  return (
    <Container fluid>
      <h1>{text}</h1>
      <InfoPopOver content={description} />
    </Container>
  );
}
