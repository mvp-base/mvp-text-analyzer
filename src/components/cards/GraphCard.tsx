import { Container, Col, Row } from 'react-bootstrap'
import React from 'react';

import styles from './GraphCard.module.scss'

interface IGraphCard {
    header?: string;
    caption?: string;
    graph: JSX.Element;
}

export default function GraphCard(props: IGraphCard) {
    const { header, caption, graph } = props;
    return (
        <Container fluid className={`${styles.container} primaryCard`}>
            {header && <h1>{header}</h1>}
            {caption && caption}
            <div className={styles.body}>
                {graph}
            </div>
        </Container>
    );
}