import { Container, Image, Col, Row } from 'react-bootstrap'
import { ReactNode } from 'react';

import { setSelectedFile } from '@/redux/fileMgrSlice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { useRouter } from "next/navigation";

import DropDown from '../DropDown';
import Button from '../Button';

import styles from './ActionCards.module.scss'

interface IActionCard {
    header: string;
    caption?: string;
    image?: string;
    button?: ReactNode;
}

function ActionCard(props: IActionCard) {
    const { header, caption, image, button } = props;

    return (
        <Container className={`${styles.cardContainer} actionCard`} fluid>
            <Col className={`${styles.sideContainer} ${styles.imageContainer}`}>
                {image && (
                    <Image className={styles.coverImage} src={image} alt='action-image'></Image>
                )}
            </Col>
            <Col className={styles.middleContainer}>
                <h1>{header}</h1>
                <p>{caption}</p>
            </Col>
            <Col className={styles.sideContainer}>
                {button && (
                    button
                )}
            </Col>
        </Container>
    );
}

export default function ActionCards() {
    const router = useRouter();
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
        <Container>
            <Row>
                <Col xs={12} md={4}>
                    <ActionCard
                        header="ACTIVE FILE"
                        caption={selectedFile || 'No file selected.'}
                        image="/images/active_file.png"
                        button={
                            <DropDown
                                color='white'
                                content={sortedFileNames}
                                onSelect={handleSelectionChange} />
                        } />
                </Col>
                <Col xs={12} md={4}>
                    <ActionCard
                        header="IMPORTED FILES"
                        caption={`${Object.keys(files).length}`}
                        image="/images/edit_file.png"
                        button={
                            <Button
                                text={<i className='bi bi-file-earmark-arrow-up'></i>}
                                style='round'
                                color='yellow'
                                onClick={() => router.push("/imports")}
                            />
                        }
                    />
                </Col>
                <Col xs={12} md={4}>
                    <ActionCard header="GUIDE" image="/images/blank_file.png" />
                </Col>
            </Row>
        </Container>
    );
}