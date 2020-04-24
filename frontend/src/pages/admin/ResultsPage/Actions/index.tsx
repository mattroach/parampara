import React from 'react'
import DeleteAction from './DeleteAction'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Actions: React.FunctionComponent = () => {
  return (
    <Row>
      <Col>
        <DeleteAction />
      </Col>
      <Col style={{ textAlign: 'right', height: 38 }}>{/* <ExportAction /> */}</Col>
    </Row>
  )
}

export default Actions
