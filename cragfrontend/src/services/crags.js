import axios from 'axios'
const baseUrl = 'api/crags'

const getAll = async () => {
    console.log('downloading!!!')
    return await axios.get(baseUrl)
}

const getByRegion = async (region) => {
    return await axios.get(`${baseUrl}/${region.toUpperCase()}`)
}

export default { getByRegion, getAll }
