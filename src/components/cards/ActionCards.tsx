import { Container, Image, Col, Row } from 'react-bootstrap'
import { ReactNode } from 'react';

import { setSelectedFile } from '@/redux/fileMgrSlice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';

import { DropDown } from '../DropDown';

import styles from './ActionCards.module.scss'

interface IActionCard {
    header: string;
    caption?: string;
    image?: string;
    dropDown?: ReactNode;
}

function ActionCard(props: IActionCard) {
    const { header, caption, image, dropDown } = props;

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
            {dropDown && (
                dropDown
            )}
        </Container>
    );
}

export default function ActionCards() {
    const dispatch = useDispatch();
    const files = useSelector((state: RootState) => state.fileMgr.files);
    const selectedFile: string = useSelector(
        (state: RootState) => state.fileMgr.selectedFile
    );
    const sortedFileNames = Object.keys(files).sort();

    const handleSelectionChange = (selectedItem: string) => {
        dispatch(setSelectedFile(selectedItem));
    };

    return (
        <Container className={styles.actionContainer}>
            <Row>
                <Col xs={12} md={4}>
                    <ActionCard
                        header="ACTIVE FILE"
                        caption={selectedFile || 'No file selected.'}
                        image="/images/file.png"
                        dropDown={
                            <DropDown
                                color='white'
                                content={sortedFileNames}
                                onSelect={handleSelectionChange} />
                        } />
                </Col>
                <Col xs={12} md={4}>
                    <ActionCard header="IMPORTED FILES" caption={`${Object.keys(files).length}`} image="/images/file.png" />
                </Col>
                <Col xs={12} md={4}>
                    <ActionCard header="GUIDE" image="/images/file.png" />
                </Col>
            </Row>
        </Container>
    );
}