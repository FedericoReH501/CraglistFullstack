
var xlsx = require("xlsx")
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