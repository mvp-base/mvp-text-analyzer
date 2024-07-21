import { Popover, OverlayTrigger } from 'react-bootstrap';

interface IInfoPopOver {
  content: string;
}

export default function InfoPopOver(props: IInfoPopOver) {
  const { content } = props;

  const popover = (
    <Popover id="popover-trigger-focus">
      <Popover.Body>{content}</Popover.Body>
    </Popover>
  );

  return (
    <OverlayTrigger
      trigger={['hover', 'focus']}
      placement="bottom"
      overlay={popover}
    >
      <i
        className={`bi fs-5 bi-info-circle`}
        style={{ cursor: 'pointer' }}
      />
    </OverlayTrigger>
  );
}
