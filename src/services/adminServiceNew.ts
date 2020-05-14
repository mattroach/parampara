import Admin from '../models/Admin'
import emailService from './EmailService'

import { uuid } from '@shared'

type UserDetails = {
  auth0Id: string
  email: string
  displayName: string
  pictureUrl: string
}

const createOrUpdateAdmin = async ({
  auth0Id,
  email,
  displayName,
  pictureUrl
}: UserDetails): Promise<Admin> => {
  const existingUser = await Admin.query().findOne({ auth0Id })
  if (existingUser) {
    console.log('Auth0 user exists!')
    if (
      existingUser.displayName !== displayName ||
      existingUser.pictureUrl !== pictureUrl ||
      existingUser.email !== email
    ) {
      console.log('Updating the user info')
      return await existingUser.$query().patchAndFetch({ displayName, pictureUrl, email })
    }
    return existingUser
  }

  // A legacy user is a pre-auth user
  const existingLegacyUser = await Admin.query().findOne({ email, auth0Id: null })
  if (existingLegacyUser) {
    console.log('Legacy user exists! linking it to auth0')
    return await existingLegacyUser
      .$query()
      .patchAndFetch({ displayName, pictureUrl, email, auth0Id })
  }

  console.log('Created a new auth0 account')
  // New user: create it
  const admin = await Admin.query().insertAndFetch({
    id: uuid(),
    auth0Id,
    email,
    displayName,
    pictureUrl
  })
  emailService.accountCreated(admin)
  return admin
}

export default {
  getById(id: string) {
    return Admin.query().findById(id)
  },

  getByAuth0Id(auth0Id: string) {
    return Admin.query().findOne({ auth0Id })
  },

  createOrUpdateAdmin
}
