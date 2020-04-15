import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'
import Loader from '../components/Loader'
import AppNavBar from './AppNavBar'
import { loadAdmin } from 'store/slices/admin'

type Props = {
  adminId: string
  navbarExtra?: React.ReactNode
}

const AdminLayout: React.FunctionComponent<Props> = ({
  children,
  adminId,
  navbarExtra
}) => {
  const dispatch = useDispatch()
  const admin = useSelector((state: RootState) => state.adminStore.admin)

  useEffect(() => {
    require('./index.css')

    dispatch(loadAdmin(adminId))
  }, [dispatch, adminId])

  if (!admin) return <Loader />

  return (
    <>
      <AppNavBar extra={navbarExtra} adminId={adminId} />
      {children}
    </>
  )
}

export default AdminLayout
