
import axios from 'axios'
import { saveAs } from 'file-saver';

function Crag(name, region, sectors,access,expo,kind,location,parking) {
  this.name = name
  this.region = region
  this.sectors=sectors
  this.access=access
  this.exposition=expo
  this.kind=kind
  this.parkingGps=parking
  this.locationGps=location
}
const craglist=[]

let access = null
let expo = null
let kind = null
let location = null
let parking = null
  
  const infoParser =(infoTitle)=>{
    switch(infoTitle[0].split(' ')[0]){
    case 'Esposizione:':
      expo = infoTitle.join(' ').slice(20)
      break
    case 'Accesso:':
      
      access= infoTitle.join(' ').slice(9)
      break
    case 'Tipo':
      kind = infoTitle.join(' ').slice(13) 
      
      break
    case 'Latitudine/Longitudine':
        if(location) {
          parking = infoTitle.join(' ').slice(24,-17)
        }
        else{
          location = infoTitle.join(' ').slice(24,-20)
        }
      break
    default:
      return null;
  }
  }

let parser = new DOMParser();
const FalesiaScraper = ()=>{ 
  const download = async (e)=>{
    e.preventDefault()
    const result = await axios.get('falesia')
    
    const arrayData = result.data

    for (let index = 0; index < arrayData.length; index++) {//per ogni regione
      const element = arrayData[index];
      const doc = parser.parseFromString(element, 'text/html');
      //doc contiene html della pagina, il nome regione e' nel titolo 
      //ogni provincia e' contenuta in una tabella
      const stringRegion = doc.querySelectorAll("title")[0].textContent
      const regionLength = stringRegion.length
      const region = stringRegion.slice(0,regionLength-13)
      console.log('REGION:',region)
      // salvo il nome della regione dal titolo della pagina
      let cragsLinkRaw = doc.querySelectorAll("table.table tbody tr td a") // link alla crag
      
      for (let index = 0; index < cragsLinkRaw.length; index++) {// per ogni crag
        const sectors=[]
        const linkRaw = cragsLinkRaw[index]
        const link = linkRaw.href
        const cragName = linkRaw.textContent
        const responseInfo = await axios.put('falesia',{link}) // ritorna html della falesia
        const doc = parser.parseFromString(responseInfo.data, 'text/html')//html con le info
        const infoListRaw = doc.querySelectorAll("ul.list-group li")

        infoListRaw.forEach(l=>{
          const element = l.textContent.split('\n').filter(s=> s !== '' && s!== ' ')
            if(element[0]){
              infoParser(element)
          }})
          
        const responseSectors = await axios.put('falesia',{link:`${link}#al_sett`})
         // ritorna html dei settori
        const docSector = parser.parseFromString(responseSectors.data, 'text/html')
        const sectorsRaw = docSector.querySelectorAll('tbody tr td a.hidden-print')

        
        for (let index = 0; index < sectorsRaw.length; index++) {//per ogni settore
          const vie= []
          const element = sectorsRaw[index]
          const sectorName= element.textContent
          const sectorLink = element.href
          const responseVie = await axios.put('falesia',{link:sectorLink})
          const docVie = parser.parseFromString(responseVie.data, 'text/html')
          const trList = docVie.querySelectorAll('tbody tr')//ogni via e' in un tr
          
          for (let index = 0; index < trList.length; index++) {//per ogni via
            const element = trList[index];
            const tdList = element.querySelectorAll('td')
            if(tdList.length>2){
              const name=tdList[2].querySelector('a').textContent
              const grade=tdList[0].querySelector('button').textContent.slice(0,-1)
              const via = {name,grade}
              vie.push(via)
            }
          }
          const sector = {sectorName,vie}
          sectors.push(sector)
        }
        const cragObj = new Crag(cragName,region,sectors,access,expo,kind,location,parking)
        craglist.push(cragObj)
        window.localStorage.setItem('cragList',JSON.stringify(craglist))
        console.log(`${cragObj.name} Saved!`,cragObj)
        console.log('----------------------------------')
      }
    console.log('REGION TERMINATED')
    console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++')
    console.log('----------------------------------')
    console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++')
    }
  console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++')
  console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++')
  console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++')
  console.log('TERMINATE')
  console.log('CragList:')
  console.log(craglist)
  }
  
  const hasSector = (name)=>{
    const array= name.split('(')
    if(array.length > 1){
      return true
    }
    return false
  } 
  

  const cragsRefactorer = (craglist)=>{
      
    for (let index = 0; index < craglist.length; index++) {
      const element = craglist[index]
      const name = element.name
      if(hasSector(name)){
        const array = name.split('(')
        const lastItem = array.length-1
        array[lastItem] = array[lastItem].replace(')','')
        const cragName= array[0]
        const sectorName = array[lastItem]
      }
      else{
        return
      }
      
    }
  }
  
  const fileCreator=()=>{
    const cragList = window.localStorage.getItem('cragList')
    console.log('saving')
    const blob = new Blob([cragList],
                { type: "text/plain;charset=utf-8" });
                saveAs(blob, "BackupDB.txt");
  }
const dataUploader =async ()=>{
  const data = JSON.parse(window.localStorage.getItem('cragList'))
  const response = await axios.post('falesia/createDb',{cragList:data})
  console.log(response.data)
}

  return(
    <div>
      <form onSubmit={(e)=>download(e)}>
      <button type='submit' id='uploadExcell'>Ruba da Falesia.it</button>
      </form>
      <button onClick={fileCreator}>save as file</button>
      <button onClick={dataUploader}>Upload in mongo db</button>
    </div>
  )

}
export default FalesiaScraper