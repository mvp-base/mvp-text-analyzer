import { useState } from 'react';
import { Container, Button, Table, Row, Spinner, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useDropzone } from 'react-dropzone';

import { addFile, removeFile } from '../redux/fileMgrSlice';
import { RootState } from '../redux/store';

import ConfirmDialog from '../components/ConfirmDialog';

import { IDashboardData } from '../interfaces/global';

interface IResults {
  variant: string;
  text: string;
}

export default function Imports() {
  const dispatch = useDispatch();

  const [fileProcessing, setFileProcessing] = useState(false);
  const [submitResult, setSubmitResult] = useState<IResults | null>(null);

  const [confirmDialogShown, setConfirmDialogShown] = useState(false);
  const [keyToDelete, setKeyToDelete] = useState<string | null>(null);

  const files = useSelector((state: RootState) => state.fileMgr.files);
  const sortedFileNames = Object.keys(files).sort();

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

  const handleImport = async (file: any) => {
    setSubmitResult(null);

    if (!file) {
      setSubmitResult({ variant: 'warning', text: 'No file imported.' });
      return;
    }

    setFileProcessing(true);

    const dashboardData: IDashboardData = {
      globalTopics: [],
      rows: [],
    };
    const fileContent = await readFileContent(file);
    const fileRows = fileContent.split('\n');

    const apiKey = process.env.REACT_APP_TEXT_RAZOR_API_KEY || '';
    const url = '/';

    const promise = fileRows.map(async (row, index) => {
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
          throw new Error(`${response.statusText}`);
        }

        const result = await response.json();

        //Parse Coarse Topics and save global stats
        result.response.coarseTopics.forEach((topic: any) => {
          const { label, wikiLink } = topic;
          const globalTopic = dashboardData.globalTopics.find(
            (stats) => stats.label === label
          );

          if (globalTopic) {
            globalTopic.count++;
          } else {
            dashboardData.globalTopics.push({
              label: label,
              count: 1,
              wikiLink: wikiLink,
            });
          }
        });
        //Filter only 6 most common topics
        dashboardData.globalTopics.sort((a, b) => b.count - a.count);
        dashboardData.globalTopics = dashboardData.globalTopics.slice(0, 6);

        //Save Row data
        dashboardData.rows[index] = {
          id: index,
          rowText: row,
          entities: result.response.entities,
          topics: result.response.topics,
          language: result.response.language,
        };
      } catch (error: any) {
        console.log(error.message);
      }
    });

    try {
      await Promise.all(promise);
      dispatch(addFile({ filename: file.name, data: dashboardData }));
      setSubmitResult({
        variant: 'success',
        text: 'File successfully imported!',
      });
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setFileProcessing(false);
    }
  };

  const handleDeleteFile = (filename: any) => {
    dispatch(removeFile({ filename }));
  };

  const handleCloseConfirmDeleteDialog = () => {
    setConfirmDialogShown(false);
    setKeyToDelete(null);
  };

  const handleAcceptConfirmDeleteDialog = () => {
    handleDeleteFile(keyToDelete);
    setKeyToDelete(null);
    setConfirmDialogShown(false);
  };

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      handleImport(file);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
    disabled: fileProcessing,
  });

  return (
    <Container
      className="d-flex flex-column justify-content-start align-items-center"
      fluid
    >
      {/* <Container fluid className="body-header">
        <h1>File managements</h1>
      </Container> */}

      <Container className="cardTransparent">
        <h2>Import new file</h2>

        <div
          {...getRootProps({
            className: `dropzone ${fileProcessing ? 'processing' : ''}`,
          })}
        >
          <input {...getInputProps()} />

          {fileProcessing ? (
            <>
              <p className="text-highlight">Analyzing</p>
              <Spinner variant="primary" animation="border" />
            </>
          ) : (
            <>
              <i className="bi bi-upload fs-3"></i>
              <p>
                Drop your file here or{' '}
                <span className="text-highlight">Click to select</span>
              </p>
              <p className="text-soft"> Supported file is only .TXT</p>
            </>
          )}
        </div>
      </Container>

      <Container className="cardTransparent">
        {submitResult && (
          <Alert
            variant={submitResult.variant}
            onClose={() => setSubmitResult(null)}
            dismissible
          >
            <p>{submitResult.text}</p>
          </Alert>
        )}
      </Container>

      <Container className="card">
        <h2>Imported files ({sortedFileNames.length})</h2>
        <Table>
          {sortedFileNames.length !== 0 ? (
            <>
              <thead>
                <tr>
                  <th>File name</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedFileNames.map((key, index) => {
                  const fileType = key.split('.').pop();
                  return (
                    <tr key={index}>
                      <td>
                        <i className={`bi bi-filetype-${fileType}`}></i> {key}
                      </td>
                      <td className="text-end">
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
            </>
          ) : (
            <p>No files imported yet.</p>
          )}
        </Table>
      </Container>

      <ConfirmDialog
        headerText="Confirm Delete"
        bodyText={`Are you sure you want to delete ${keyToDelete}?`}
        cancelButton={{ text: 'Cancel', variant: 'outline-secondary' }}
        acceptButton={{ text: 'Delete', variant: 'danger' }}
        shown={confirmDialogShown}
        handleClose={handleCloseConfirmDeleteDialog}
        handleAccept={handleAcceptConfirmDeleteDialog}
      />
    </Container>
  );
}
