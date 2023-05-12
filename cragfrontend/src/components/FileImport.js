import axios from 'axios'


const FileImport = ()=>{
    
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
          const cragName= crag.textContent
          const link = crag.href
          
          const response = await axios.put('climbook',{link}) // ritorna html della falesia
          const doc = parser.parseFromString(response.data, 'text/html');//html con le vie
          //ogni crag ha una tabella con la lista delle vie
          // ogni tabella ha il nome nel link a, grado nel span

          const nomiVie = doc.querySelectorAll("table.cb-table tbody tr a.font-semibold")
          const gradiVie = doc.querySelectorAll("table.cb-table tbody tr span.font-semibold")
          let vieList =[]
          for (let index = 0; index < nomiVie.length; index++) {
            const name = nomiVie[index].textContent
            const grade = gradiVie[index].textContent
            vieList.push({
              name,
              grade
            })
            
          }

          console.log('Crag Name: ',cragName)
          console.log('Regione: ',region)
          console.log('Provincia: ',provincia)
          console.log('Lista Vie:')
          vieList.forEach(v=>console.log(v))
          console.log('---------------------------------------------------------------')
          console.log('---------------------------------------------------------------')
          
        
        }
        //console.log('cragsraw:')
        //cragsRaw.forEach(c=>console.log('Crag Name:',c.textContent,', Regione:',region, ', Provincia:',provincia,', Link:',c.href))
        // posso avere per ogni crag la sua regione e provincia
       // console.log('-------')
      }

      

      
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
