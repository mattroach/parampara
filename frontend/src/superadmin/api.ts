import axios from 'axios'

export default function getClient(password: string) {
  const instance = axios.create({
    auth: { username: 'admin', password }
  })

  return {
    toggleSubscription(userId: string, isPro: boolean) {
      return instance.put(`/api/superadmin/user/${userId}/subscription`, { isPro })
    }
  }
}
