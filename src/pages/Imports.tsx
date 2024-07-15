import { useState } from 'react';
import { Container, Form, Button, Table } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import { addFile, removeFile } from '../redux/fileMgrSlice';
import { RootState } from '../redux/store';

import ConfirmDialog from '../components/ConfirmDialog';

export default function Imports() {
  const [file, setFile] = useState<File | null>(null);
  const [submitResult, setSubmitResult] = useState('');

  const [confirmDialogShown, setConfirmDialogShown] = useState(false);
  const [keyToDelete, setKeyToDelete] = useState<string | null>(null);

  const dispatch = useDispatch();
  const files = useSelector((state: RootState) => state.fileMgr.files);
  const sortedFileNames = Object.keys(files).sort();

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

      dispatch(addFile({ filename: file.name, data: result.response }));

      setFile(null);
      setSubmitResult('OK');
    } catch (error: any) {
      setSubmitResult(`${error.message}`);
    }
  };

  const handleDeleteFile = (filename: any) => {
    dispatch(removeFile({ filename }));
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
    <Container fluid>
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
      <Table>
        <thead>
          <tr>
            <th></th>
            <th>File name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedFileNames.map((key) => {
            const fileType = key.split('.').pop();
            return (
              <tr>
                <td>
                  <i className={`bi bi-filetype-${fileType}`}></i>
                </td>
                <td>{key}</td>
                <td className="d-flex gap-2">
                  <Button
                    variant="outline-danger"
                    onClick={() => {
                      setKeyToDelete(key);
                      setConfirmDialogShown(true);
                    }}
                  >
                    <i className="bi bi-trash"></i>
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <ConfirmDialog
        headerText="Confirm Delete"
        bodyText={`Are you sure you want to delete ${keyToDelete}?`}
        cancelButton={{ text: 'Cancel', variant: 'outline-secondary' }}
        acceptButton={{ text: 'Delete', variant: 'danger' }}
        shown={confirmDialogShown}
        handleClose={handleCloseConfirmDialog}
        handleAccept={handleAcceptConfirmDialog}
      />
    </Container>
  );
}
