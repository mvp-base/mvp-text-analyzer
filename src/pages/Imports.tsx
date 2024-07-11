import { useState } from 'react';
import { Container, Form, Button, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { addData, deleteData } from '../redux/dataSlice';
import { RootState } from '../redux/store';

import ConfirmDialog from '../components/ConfirmDialog';

export default function Imports() {
  const [file, setFile] = useState<File | null>(null);
  const [submitResult, setSubmitResult] = useState('');

  const [confirmDialogShown, setConfirmDialogShown] = useState(false);
  const [keyToDelete, setKeyToDelete] = useState<string | null>(null);

  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.data.data);
  const sortedData = Object.keys(data).sort();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const importedFile = e.target.files?.[0] || null;
    setFile(importedFile);
  };

  const readFileContent = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = () => {
        reject(new Error('Error reading file'));
      };
      reader.readAsText(file);
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setSubmitResult('');

    if (!file) {
      setSubmitResult('No file imported.');
      return;
    }

    const fileContent = await readFileContent(file);
    const apiKey = process.env.REACT_APP_TEXT_RAZOR_API_KEY || '';
    const url = '/';
    const data = new URLSearchParams({
      extractors: 'entities,topics',
      text: fileContent,
    }).toString();

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'x-textrazor-key': apiKey,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();

      dispatch(
        addData({ filename: file.name, data: result.response.entities })
      );

      setFile(null);
      setSubmitResult('OK');
    } catch (error: any) {
      setSubmitResult(`${error.message}`);
    }
  };

  const handleDeleteFile = (filename: any) => {
    dispatch(deleteData({ filename }));
  };

  const handleCloseConfirmDialog = () => {
    setConfirmDialogShown(false);
    setKeyToDelete(null);
  };
  const handleAcceptConfirmDialog = () => {
    handleDeleteFile(keyToDelete);
    setKeyToDelete(null);
    setConfirmDialogShown(false);
  };

  return (
    <Container className="my-5">
      <Form id="ImportFileForm" onSubmit={handleSubmit}>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Upload a file</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        {submitResult && <p>{submitResult}</p>}
      </Form>

      <p>Imported Files</p>
      <ListGroup>
        {sortedData.map((key) => {
          const fileType = key.split('.').pop();
          return (
            <ListGroup.Item>
              <i className={`bi bi-filetype-${fileType}`}></i>
              {key}
              <Button
                variant="outline-danger"
                onClick={() => {
                  setKeyToDelete(key);
                  setConfirmDialogShown(true);
                }}
              >
                Delete
              </Button>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
      <ConfirmDialog
        headerText="Confirm Delete"
        bodyText={`Are you sure you want to delete ${keyToDelete}?`}
        cancelButton={{ text: 'Cancel', variant: 'secondary' }}
        acceptButton={{ text: 'Delete', variant: 'danger' }}
        shown={confirmDialogShown}
        handleClose={handleCloseConfirmDialog}
        handleAccept={handleAcceptConfirmDialog}
      />
    </Container>
  );
}
