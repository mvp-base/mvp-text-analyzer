import { Container, Image, Col, Row } from 'react-bootstrap'


import styles from './ActionCards.module.scss'
import Button from '../Button';
import { DropDown } from '../DropDown';


interface IActionCard {
    header: string;
    caption: string;
    image?: string;
}

function ActionCard(props: IActionCard) {
    const { header, caption, image } = props;

    return (
        <Container className={`${styles.container} actionCard`} fluid>
            <Container className={styles.textContainer}>
                <h1>{header}</h1>
                <p>{caption}</p>
            </Container>
            {image && (
                <Container className={styles.imageContainer}>
                    <Image className={styles.coverImage} src={image}></Image>
                </Container>
            )}
            <DropDown color='white' />
        </Container>
    );
}

export default function ActionCards() {
    return (
        <Container className={styles.actionContainer}>
            <Row>
                <Col xs={12} md={4}>
                    <ActionCard header="ACTIVE FILE" caption="number of files imported" image="/images/file.png" />
                </Col>
                <Col xs={12} md={4}>
                    <ActionCard header="IMPORTED FILES" caption="number of files imported" image="/images/file.png" />
                </Col>
                <Col xs={12} md={4}>
                    <ActionCard header="GUIDE" caption="number of files imported" image="/images/file.png" />
                </Col>
            </Row>
        </Container>
    );
}



