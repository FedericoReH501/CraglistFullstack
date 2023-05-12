const climbookRouter = require('express').Router()

const axios = require('axios')
const { request, response } = require('express')
const allRegions = [3,32,19,5,41,81,1,15,20,9,4,37,111,21,16,6,7,2,29,33]
let array=[]
const fetcher =async (link)=>{
  for (let index = 0; index < allRegions.length; index++) {
    const element= allRegions[index]
    const result = await axios.get(`${link}${element}`)
    array.push(result.data)
  }

}

climbookRouter.get('/',async (request,response)=>{
  //const result = await axios.get(`https://climbook.com/falesie`)
  await fetcher('https://climbook.com/regioni/')
  
  response.status(200).send(array)
  array=[]
})

climbookRouter.put('/',async (request,response)=>{
  console.log(request.body)
  response.status(200).json({result:'daje'})

})

module.exports = climbookRouter