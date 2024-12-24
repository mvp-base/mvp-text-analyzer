import { useState } from "react";
import { Table, Container, Row, Col } from "react-bootstrap";

import Button from "./Button";
import { IDashboardData } from "@/interfaces/global";
import DashboardCard from "./cards/DashboardCard";

import styles from "./FilesTable.module.scss";

interface IFilesTable {
    content: Record<string, IDashboardData>;
    setKeyToDelete: React.Dispatch<React.SetStateAction<string | null>>;
    setConfirmDialogShown: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FilesTable(props: IFilesTable) {
    const COLLAPSED_SIZE = 5;
    const [tableCollapsed, setTableCollapsed] = useState<boolean>(true);

    const { content, setKeyToDelete, setConfirmDialogShown } = props;
    const displayedContent = tableCollapsed ? Object.entries(content).slice(0, COLLAPSED_SIZE) : Object.entries(content)

    const handleSeeMore = () => {
        setTableCollapsed(prevState => !prevState);
    };

    if (displayedContent.length != 0) {
        return (
            <Table className={styles.table}>
                <thead>
                    <tr className={styles.bold}>
                        <th>File</th>
                        <th>File name</th>
                        <th>Date</th>
                        <th className={styles.seeMore}>
                            <Button
                                text="See more"
                                style="primary"
                                onClick={() => handleSeeMore()}
                            />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {displayedContent.map(([key, file]) => {
                        const fileType = key.split('.').pop();
                        const formatedDate = new Date(file.exportDate);

                        return (
                            <tr key={key}>
                                <td>
                                    {key} <i className={`bi bi-filetype-${fileType}`}></i>
                                </td>
                                <td className={styles.bold}>
                                    {file.name}
                                </td>
                                <td>
                                    {formatedDate.toLocaleDateString()}
                                </td>
                                <td className="text-end">
                                    <Button
                                        text={<i className="bi bi-trash"></i>}
                                        style="square"
                                        color="red"
                                        onClick={() => {
                                            setKeyToDelete(key);
                                            setConfirmDialogShown(true);
                                        }}
                                    />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        );
    } else {
        return (
            <Container>
                <Row className={styles.infoContainer}>
                    <Col xs={12} md={6}>
                        <DashboardCard
                            header='No File Imported'
                            caption={
                                <p>Please, first import a file.</p>
                            }
                        />
                    </Col>
                </Row>
            </Container>
        );

    }

}

