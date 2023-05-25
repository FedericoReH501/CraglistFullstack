import axios from 'axios'
const baseUrl = 'api/user'
let token = null


const setToken = (newtoken) => {
  token = `Bearer ${newtoken}`
}

const createNew = async (newUser)=>{
  const response = await axios.post(baseUrl,newUser)
  return response.data
}

const updateFavs= async(user,regions)=>{
  
  setToken(user.token)
  const confing = {
    headers:{Authorization: token,}
  }
  const updatedUser = {...user,favsRegions:regions}
  const response = await axios.put(`${baseUrl}/${user.id}`,updatedUser,confing)
  console.log('response:',response)
  return response
}


export default {updateFavs,setToken,createNew}