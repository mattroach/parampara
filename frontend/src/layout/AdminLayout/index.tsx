import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import SignedInNavBar from './SignedInNavBar'
import { loadAdmin } from 'store/slices/admin'
import AuthFailureMonitor from './AuthFailureMonitor'

type Props = {
  navbarExtra?: React.ReactNode
}

const AdminLayout: React.FunctionComponent<Props> = ({ children, navbarExtra }) => {
  const dispatch = useDispatch()
  const isLoading = useSelector(state => !state.adminStore.admin)
  const initAuthFailure = useSelector(state => state.adminStore.initAuthFailure)

  useEffect(() => {
    require('./index.css')
    dispatch(loadAdmin())
  }, [dispatch])

  useEffect(() => {
    if (initAuthFailure) {
      //returnTo is not currently used - the backend should handle the redirect in non-dev mode anyways
      window.location.href =
        '/login?returnTo=' + encodeURIComponent(window.location.pathname)
    }
  }, [initAuthFailure])

  if (isLoading || initAuthFailure) {
    return <Loader />
  }

  return (
    <>
      <AuthFailureMonitor />
      <SignedInNavBar extra={navbarExtra} />
      {children}
    </>
  )
}

export default AdminLayout
