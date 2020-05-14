import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import AppNavBar from './AppNavBar'
import { loadAdmin } from 'store/slices/admin'
import AuthFailureMonitor from './AuthFailureMonitor'

type Props = {
  navbarExtra?: React.ReactNode
}

const AdminLayout: React.FunctionComponent<Props> = ({ children, navbarExtra }) => {
  const dispatch = useDispatch()
  const admin = useSelector(state => state.adminStore.admin)

  useEffect(() => {
    require('./index.css')

    dispatch(loadAdmin())
  }, [dispatch])

  return (
    <>
      <AuthFailureMonitor />
      {admin ? (
        <>
          <AppNavBar extra={navbarExtra} />
          {children}
        </>
      ) : (
        <Loader />
      )}
    </>
  )
}

export default AdminLayout
