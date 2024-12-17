import { Table, Container, Row, Col } from "react-bootstrap";
import Button from "./Button";
import { IDashboardData } from "@/interfaces/global";
import DashboardCard from "./cards/DashboardCard";

interface IFilesTable {
    content: Record<string, IDashboardData>;
    setKeyToDelete: React.Dispatch<React.SetStateAction<string | null>>;
    setConfirmDialogShown: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FilesTable(props: IFilesTable) {
    const { content, setKeyToDelete, setConfirmDialogShown } = props;

    if (Object.keys(content).length != 0) {
        return (
            <Table>
                <thead>
                    <tr>
                        <th>File</th>
                        <th>File name</th>
                        <th>Date created</th>
                        <th className="text-end">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(content).map(([key, file]) => {
                        const fileType = key.split('.').pop();
                        const formatedDate = new Date(file.exportDate);

                        return (
                            <tr key={key}>
                                <td>
                                    {key} <i className={`bi bi-filetype-${fileType}`}></i>
                                </td>
                                <td>
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
                <Row>
                    <Col xs={12} md={6}>
                        <DashboardCard header='No File Imported' caption='Please, first import a file.' />
                    </Col>
                </Row>
            </Container>
        );

    }

}


