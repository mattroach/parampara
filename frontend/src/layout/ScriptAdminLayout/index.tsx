import { ScriptVersionType } from 'api/types'
import React, { useEffect } from 'react'
import Nav from 'react-bootstrap/Nav'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { loadScript } from 'store/slices/script'
import Loader from '../../components/Loader'
import AdminLayout from '../AdminLayout'
import Header from './components/Header'

type Props = {
  scriptId: string
}

const ScriptAdminLayout: React.FunctionComponent<Props> = ({ scriptId, children }) => {
  const scriptLoaded = useSelector(state => state.scriptStore.script?.id) === scriptId

  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    dispatch(loadScript(scriptId, ScriptVersionType.draft))
  }, [scriptId, dispatch])

  const goBackToDirectory = (event: any) => {
    event.preventDefault()
    history.push('/account')
  }

  return (
    <AdminLayout
      navbarExtra={
        <Nav.Link href="#" onClick={goBackToDirectory}>
          Main menu
        </Nav.Link>
      }
    >
      {scriptLoaded ? (
        <>
          <Header />
          {children}
        </>
      ) : (
        <Loader />
      )}
    </AdminLayout>
  )
}

export default ScriptAdminLayout
