import axios from 'axios'

var xlsx = require("xlsx")
const FileImport = ()=>{
    
  
  let html = ''
  const iterator = (file)=>{
    for (let index = 1; index < 18; index++) {
      const name = file[`A${index}`].v
      const grade = file[`B${index}`].v

      const result = {
        name,
        grade
      }
      
      //for(let i =1,)
    }
  }
  function handleFile(e) {
        e.preventDefault()
         if (e.target.file.files) {
          const reader = new FileReader()
          
          reader.onload = (e) => {
            
               const data = e.target.result
               const workbook = xlsx.read(data, {type: '"array'})
               const sheetName= workbook.SheetNames[0]
               //console.log('name', sheetName)
               //console.log(workbook.Sheets[sheetName]['A1'].v)
              const file = workbook.Sheets[sheetName]
              
              iterator(file)
               // organize xlsx data into desired format
          
          }
          reader.readAsArrayBuffer(e.target.file.files[0])
    
         }
         

    }

  const download = async (e)=>{
    e.preventDefault()
    const result = await axios.get('climbook')
    
    let parser = new DOMParser();
    const doc = parser.parseFromString(result.data, 'text/html');

    const regions = doc.querySelectorAll("title")

    for (let index = 0; index < regions.length; index++) {
      const elem = regions[index]
      const string = elem.textContent
      const length = string.length
        console.log(string.slice(8,length-11))
    }
  }

  return(

    
    <div>
      <form onSubmit={(e)=>download(e)}>
        <input 
      type='file' 
      id='fileUpload' 
      name='file'
      accept='.xls,.xlsx'
     // onChange={(e)=> handleFile(e)}
      >
      </input>
      <button type='submit' id='uploadExcell'>upload</button>
      <button>convert</button>
      <pre id='jsonData'></pre>
      </form>
      
    </div>
  )

}
export default FileImport
