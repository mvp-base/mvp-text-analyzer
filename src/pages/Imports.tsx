import { useState } from 'react';
import { Container, Form, Button, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addData, deleteData } from '../redux/dataSlice';
import { RootState } from '../redux/store';

export default function Imports() {
  const [file, setFile] = useState<File | null>(null);
  const [submitResult, setSubmitResult] = useState('');

  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.data.data);

  console.log(data);

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

    if (!file) {
      setSubmitResult('No file imported.');
      return;
    }

    const fileContent = await readFileContent(file);
    const apiKey = process.env.REACT_APP_TEXT_RAZOR_API_KEY || '';
    const url = '/';
    const data = new URLSearchParams({
      extractors: 'entities,sentences',
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
        {Object.keys(data).map((key) => {
          const fileType = key.split('.').pop();
          return (
            <ListGroup.Item>
              <i className={`bi bi-filetype-${fileType}`}></i>
              {key}
              <Button
                variant="outline-danger"
                onClick={() => handleDeleteFile(key)}
              >
                Delete
              </Button>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </Container>
  );
}
