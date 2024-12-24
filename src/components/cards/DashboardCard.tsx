import { Container, Image } from 'react-bootstrap'


import styles from './DashboardCard.module.scss'
import React from 'react';


interface IDashboardCard {
    header?: string;
    caption: JSX.Element;
    image?: string;
}

export default function DashboardCard(props: IDashboardCard) {
    const { header, caption, image } = props;

    return (
        <Container className={`${styles.container} primaryCard`}>
            <Container className={styles.textContainer}>
                {header && <h1>{header}</h1>}
                {caption}
            </Container>
            {image && <Image className={styles.coverImage} src={image} alt='dashboard-image'></Image>}
        </Container>
    );
}