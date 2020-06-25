import Admin from '@models/Admin'

const SUPER_ADMINS = [
  'google-oauth2|101956130892002953490', // matt
  'google-oauth2|104429525881832195132', // jonah
  'google-oauth2|113983007899279312528' // amelia
]

export default function({ auth0Id, email }: Admin) {
  if (auth0Id && SUPER_ADMINS.includes(auth0Id)) {
    return true
  }

  if (email.includes('@getparampara.com') && process.env.NODE_ENV !== 'production') {
    return true
  }

  return false
}
