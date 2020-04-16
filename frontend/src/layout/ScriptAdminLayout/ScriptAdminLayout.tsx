import { ScriptVersionType } from 'api/types'
import React, { useEffect } from 'react'
import Nav from 'react-bootstrap/Nav'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { RootState } from 'store/rootReducer'
import { loadScript } from 'store/slices/script'
import Loader from '../../components/Loader'
import AdminLayout from '../AdminLayout'
import Header from './components/Header'

type Props = {
  adminId: string
  scriptId: string
}

const ScriptAdminLayout: React.FunctionComponent<Props> = ({
  adminId,
  scriptId,
  children
}) => {
  const scriptLoaded =
    useSelector((state: RootState) => state.scriptStore.script?.id) === scriptId

  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    dispatch(loadScript(scriptId, ScriptVersionType.draft))
  }, [scriptId, dispatch])

  const goBackToDirectory = (event: any) => {
    event.preventDefault()
    history.push(`/u/${adminId}`)
  }

  return (
    <AdminLayout
      adminId={adminId}
      navbarExtra={
        <Nav.Link href="#" onClick={goBackToDirectory}>
          Main menu
        </Nav.Link>
      }
    >
      {scriptLoaded ? <Header /> : <Loader />}
      {scriptLoaded && children}
    </AdminLayout>
  )
}

export default ScriptAdminLayout
