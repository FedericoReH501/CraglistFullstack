import axios from 'axios'
const baseUrl = 'api/users'
let token = null


const setToken = (newtoken) => {
  token = `Bearer ${newtoken}`
}

const updateFavs= async(user,regions)=>{
  
  const confing = {
    headers:{Authorization: token,}
  }
  const response = await axios.put(`${baseUrl}/favs/${user.id}`,{favRegions:regions},confing)
  return response
}


export default {updateFavs,setToken}