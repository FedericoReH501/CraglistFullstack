import axios from "axios";
const baseUrl = 'api/crags'
const getByRegion = async (region)=>{

  const response = await axios.get(`${baseUrl}/${region}`)
  console.log(response.data)
  return response.data
}

export default {getByRegion}
