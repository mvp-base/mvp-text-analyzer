import { Container, Image } from 'react-bootstrap'


import styles from './DashboardCard.module.scss'


interface IDashboardCard {
    header: string;
    caption: string;
    image?: string;
}

export default function DashboardCard(props: IDashboardCard) {
    const { header, caption, image } = props;

    return (
        <Container className={`${styles.container} primaryCard`} fluid>
            <Container className={styles.textContainer}>
                <h1>{header}</h1>
                <p>{caption}</p>
            </Container>
            {image && <Image className={styles.coverImage} src={image}></Image>}
        </Container>
    );
}