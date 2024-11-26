import { Container, Image } from 'react-bootstrap'


import styles from './ActionCard.module.scss'


interface IActionCard {
    header: string;
    caption: string;
    image: string;
}

export default function ActionCard(props: IActionCard) {
    const { header, caption, image } = props;

    return (
        <Container className={`${styles.container} actionCard`} fluid>
            <Container className={styles.textContainer}>
                <h1>{header}</h1>
                <p>{caption}</p>
            </Container>
            <Image className={styles.coverImage} src={image}></Image>
        </Container>
    );
}