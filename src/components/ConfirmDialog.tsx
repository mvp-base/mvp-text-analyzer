import { Modal, Button, ButtonProps } from 'react-bootstrap';

interface ButtonInterface {
  text: string;
  variant: ButtonProps['variant'];
}

interface ConfirmDialogInterface {
  headerText: string;
  bodyText: string;
  cancelButton: ButtonInterface;
  acceptButton: ButtonInterface;
  shown: boolean;
  handleClose: () => void;
  handleAccept: () => void;
}

export default function ConfirmDialog(props: ConfirmDialogInterface) {
  const {
    headerText,
    bodyText,
    cancelButton,
    acceptButton,
    shown,
    handleClose,
    handleAccept,
  } = props;

  return (
    <Modal show={shown} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{headerText}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{bodyText}</Modal.Body>
      <Modal.Footer>
        <Button variant={cancelButton.variant} onClick={handleClose}>
          {cancelButton.text}
        </Button>
        <Button variant={acceptButton.variant} onClick={handleAccept}>
          {acceptButton.text}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
