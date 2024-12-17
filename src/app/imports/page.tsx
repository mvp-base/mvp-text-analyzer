'use client';

import { useState } from 'react';
import { Container, Button, Table, Spinner, Toast, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import { RootState } from '../../redux/store';
import { removeFile, clearSelectedFile } from '../../redux/fileMgrSlice';
import { analyzeFile } from '../../util/fileAnalyzer';

import DashboardCard from '@/components/cards/DashboardCard';
import ConfirmDialog from '../../components/ConfirmDialog';
import Header from '../../components/Header';
import ActionCards from '@/components/cards/ActionCards';

import styles from './imports.module.scss';
import FilesTable from '@/components/FilesTable';

const MAX_FILE_SIZE = 5 * 1024 * 1024;

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

  const selectedFile = useSelector(
    (state: RootState) => state.fileMgr.selectedFile
  );

  const handleDeleteFile = (filename: any) => {
    dispatch(removeFile({ filename }));
    if (selectedFile === filename) {
      dispatch(clearSelectedFile());
    }
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
      if (file.size > MAX_FILE_SIZE) {
        setSubmitResult({
          variant: 'warning',
          text: 'File size exceeds 5MB.',
        });
        return;
      }

      setFileProcessing(true);

      analyzeFile(
        file,
        dispatch
      )
        .then((result) => setSubmitResult(result))
        .finally(() => setFileProcessing(false));
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
    disabled: fileProcessing,
  });

  return (
    <Container fluid>
      <Header
        text="Imports"
        description="Upload and analyze text files. Manage imported files."
        size={1}
      />

      <ActionCards />

      <Container className={styles.dashboard}>
        <Header
          text={`Import new file`}
          size={2}
        />
        <div
          {...getRootProps({
            className: `${styles.dropzone} ${fileProcessing && styles.processing}`,
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


      <Container>
        <Header
          text={`Imported files (${Object.keys(files).length})`}
          size={2}
        />
        <FilesTable
          content={files}
          setKeyToDelete={setKeyToDelete}
          setConfirmDialogShown={setConfirmDialogShown}
        />
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

      <Toast
        style={{
          position: 'fixed',
          bottom: '1rem',
          right: '1rem',
        }}
        onClose={() => setSubmitResult(null)}
        show={submitResult !== null}
        delay={5000}
        autohide
        bg={submitResult?.variant}
      >
        <Toast.Body>{submitResult?.text}</Toast.Body>
      </Toast>
    </Container>
  );
}
