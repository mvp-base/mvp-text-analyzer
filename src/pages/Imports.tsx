import { useState, useRef } from 'react';
import { Container, Form, Button, Table } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import { addFile, removeFile } from '../redux/fileMgrSlice';
import { RootState } from '../redux/store';

import ConfirmDialog from '../components/ConfirmDialog';

interface RowData {
  id: number;
  row: string;
  entities: any[];
  topics: any[];
  language: string;
}

interface TopicData {
  label: string;
  count: number;
  wikiLink: string;
}

interface FinalDataInterface {
  globalStats: TopicData[];
  rows: RowData[];
}

export default function Imports() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
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

  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      setFile(null);
    }
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

    const finalData: FinalDataInterface = {
      globalStats: [],
      rows: [],
    };
    const fileContent = await readFileContent(file);
    const contentRows = fileContent.split('\n');
    const apiKey = process.env.REACT_APP_TEXT_RAZOR_API_KEY || '';
    const url = '/';

    const promises = contentRows.map(async (row, index) => {
      const data = new URLSearchParams({
        extractors: 'entities,topics',
        text: row,
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

        //Parse Coarse Topics and save global stats
        result.response.coarseTopics.forEach((topic: any) => {
          const { label, wikiLink } = topic;
          const globalTopic = finalData.globalStats.find(
            (stats) => stats.label === label
          );

          if (globalTopic) {
            globalTopic.count++;
          } else {
            finalData.globalStats.push({
              label: label,
              count: 1,
              wikiLink: wikiLink,
            });
          }
        });
        //Filter only 6 most common topics
        finalData.globalStats.sort((a, b) => b.count - a.count);
        finalData.globalStats = finalData.globalStats.slice(0, 6);
        //Save Row data
        finalData.rows[index] = {
          id: index,
          row: row,
          entities: result.response.entities,
          topics: result.response.topics,
          language: result.response.language,
        };
      } catch (error: any) {
        console.log(error.message);
      }
    });

    try {
      await Promise.all(promises);
      dispatch(addFile({ filename: file.name, data: finalData }));
      setSubmitResult('OK');
    } catch (error: any) {
      console.error('Error fetching data:', error.message);
    }
    setFile(null);
    resetFileInput();
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
          <Form.Control
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
          />
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
          {sortedFileNames.map((key, index) => {
            const fileType = key.split('.').pop();
            return (
              <tr key={index}>
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
