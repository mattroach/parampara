import MaterialIcon from 'material-icons-react';
import React from 'react';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import styled from 'styled-components';

const IconButton = styled(Button)`
  vertical-align: top;
  padding: 0;
`
type Props = {
  icon: string
  tooltip: string
}

const InlineIconButton: React.FunctionComponent<Props> = ({ icon, tooltip }) => {
  return (
    <OverlayTrigger overlay={(props: any) => <Tooltip {...props} show={props.show.toString()}>{tooltip}</Tooltip>}>
      <IconButton variant="link"><MaterialIcon icon={icon} size={40} /></IconButton>
    </OverlayTrigger>
  )
}

export default InlineIconButton