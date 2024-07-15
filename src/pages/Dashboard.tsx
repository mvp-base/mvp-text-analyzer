import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedFile } from '../redux/fileMgrSlice';
import { RootState } from '../redux/store';
import { Container, Form } from 'react-bootstrap';

function EmptyDashboardContent() {
  return (
    <Container fluid>
      <p>Please, select imported file to display analyzed data.</p>
    </Container>
  );
}

interface DashboardContentProps {
  data: Object;
}

function DashboardContent({ data }: DashboardContentProps) {
  return <Container fluid></Container>;
}

export default function Dashboard() {
  const dispatch = useDispatch();
  const files = useSelector((state: RootState) => state.fileMgr.files);
  const sortedFileNames = Object.keys(files).sort();
  const selectedFile = useSelector(
    (state: RootState) => state.fileMgr.selectedFile
  );

  const handleSelectionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    dispatch(setSelectedFile(event.target.value));
  };

  return (
    <Container fluid>
      <h1>Dashboard</h1>
      <Form.Select value={selectedFile} onChange={handleSelectionChange}>
        <option value="">No file selected</option>
        {sortedFileNames.map((key) => {
          return <option>{key}</option>;
        })}
      </Form.Select>
      <Container fluid>
        {selectedFile === '' || selectedFile === null ? (
          <EmptyDashboardContent />
        ) : (
          <DashboardContent data={files[selectedFile]} />
        )}
      </Container>
    </Container>
  );
}
