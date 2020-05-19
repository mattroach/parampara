import axios from '../api/authAxios'

export default {
  toggleSubscription(userId: string, tier: string) {
    return axios.put(`/api/superadmin/user/${userId}/subscription`, { tier })
  },
  async getUsers() {
    const response = await axios.get('/api/superadmin/getUsers')
    return response.data
  }
}
