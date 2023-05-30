import axios from 'axios'
const baseUrl = 'api/user'
let token = null

const setToken = (newtoken) => {
    token = `Bearer ${newtoken}`
}

const createNew = async (newUser) => {
    const response = await axios.post(baseUrl, newUser)
    return response.data
}

const updateFavs = async (user) => {
    setToken(user.token)

    const confing = {
        headers: { Authorization: token },
    }
    const response = await axios.put(`${baseUrl}/${user.id}`, user, confing)

    return response
}

export default { updateFavs, setToken, createNew }
