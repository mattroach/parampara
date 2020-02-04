import React from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { RootState } from '../../../store/rootReducer';
import { loadScripts } from '../../../store/slices/scripts';

const StyledTable = styled(Table)`
  td {
    vertical-align: middle;
  }
  tr th:nth-last-child(1) {
    text-align: right;
  }
`

type State = {

}

type Props = {
  adminId: string
  loadScripts: typeof loadScripts
} & ReturnType<typeof mapStateToProps>


class Scripts extends React.Component<Props, State> {

  componentDidMount() {
    this.props.loadScripts(this.props.adminId)
  }


  render() {
    const { adminId, scripts } = this.props

    if (!scripts)
      return <Spinner animation="border" />

    return (
      <StyledTable responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Created on</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {scripts.map((script, i) => <tr key={i}>
            <td><Link to={`/builder/${adminId}/${script.id}`}>
              {script.title ? script.title : 'Unnamed script'}
            </Link></td>
            <td><DateFormatted datetime={script.created} /></td>
            <th><Button variant="danger" size="sm">Delete</Button></th>
          </tr>)}
        </tbody>
      </StyledTable>
    )
  }
}

const DateFormatted: React.FunctionComponent<{ datetime: string }> = ({ datetime }) => {
  const date = new Date(datetime)
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return <>{date.toLocaleDateString('en-US', options)}</>
}

function mapStateToProps(state: RootState) {
  return { scripts: state.scriptsStore.scripts }
}

// @ts-ignore
export default connect(mapStateToProps, { loadScripts })(Scripts)