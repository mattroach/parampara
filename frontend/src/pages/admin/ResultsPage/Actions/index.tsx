import React from 'react'
import DeleteAction from './DeleteAction'
import ExportAction from './ExportAction'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Actions: React.FunctionComponent = () => {
  return (
    <Row>
      <Col>
        <DeleteAction />
      </Col>
      <Col style={{ textAlign: 'right' }}>
        <ExportAction />
      </Col>
    </Row>
  )
}

export default Actions
