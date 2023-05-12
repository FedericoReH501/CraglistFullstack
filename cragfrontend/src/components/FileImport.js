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
    
    const arrayData = result.data
    for (let index = 0; index < arrayData.length; index++) {//per ogni pagina di regione
      const province =[]
      const element = arrayData[index];
      const doc = parser.parseFromString(element, 'text/html');
      //doc contiene html della pagina, il nome regione e' nel titolo 
      //ogni provincia e' contenuta in una tabella
      const stringRegion = doc.querySelectorAll("title")[0].textContent
      const regionLength = stringRegion.length
      const region = stringRegion.slice(8,regionLength-11)
      // salvo il nome della regione dal titolo della pagina
      // ogni tabella contiene nel thead il nome della provincia nel tbody la lista delle crags
      const tablesRaw = doc.querySelectorAll("table.w-full") // trovo tutte le tabelle

      for (let index = 0; index < tablesRaw.length; index++) {// per ogni tabella(provincia)
        const tab = tablesRaw[index]
        const provincia = tab.querySelectorAll("thead th.px-0")[0].textContent
        province.push(provincia)
        // ogni tbody contiene nome della crag, contenuto in un tr
        const cragsRaw = tab.querySelectorAll("tbody tr a") // lista dei tr contenenti il nome della falesia in a
        for (let index = 0; index < cragsRaw.length; index++) { // per ogni crag
          const crag = cragsRaw[index];
          const link = crag.href
          console.log('try')
          const response = await axios.put('climbook',{link})
          console.log('passed')
        }
        console.log('cragsraw:')
        cragsRaw.forEach(c=>console.log('Crag Name:',c.textContent,', Regione:',region, ', Provincia:',provincia,', Link:',c.href))
        // posso avere per ogni crag la sua regione e provincia
        console.log('-------')
      }

      
      
      const provinceRaw = doc.querySelectorAll("th.px-0")
      provinceRaw.forEach(r=>{
        if(r.className ==='px-0 py-0 md:py-1 text-xl font-bold'){
          province.push(r.textContent)}
        })
      
    }

    const doc = parser.parseFromString(result.data, 'text/html');
    
    const regions = doc.querySelectorAll("title")
    

    for (let index = 0; index < regions.length; index++) {

      const elem = regions[index]
      const string = elem.textContent
      const length = string.length
       
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
