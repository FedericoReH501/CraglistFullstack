

let access = null
let expo = null
let kind = null
let location = null
let parking = null

  const infoParser =(infoTitle)=>{
    switch(infoTitle.split(' ')[0]){
    case 'Esposizione:':
      expo = infoTitle.slice(20)
      break
    case 'Accesso:':
      console.log('first')
      access= infoTitle.slice(10)
      break
    case 'Tipo':
      kind = infoTitle.slice(13) 
      console.log('test')
      break
      
    case 'Latitudine/Longitudine':
        if(location) {
          parking = infoTitle.slice(30,-22)
        }
        else{
          location = infoTitle.slice(30,-27)
        }
      break
    default:
      return null;
  }
  }

console.log(infoParser("Accesso: Da Potenza:
Prendere il Raccordo Autostradale SA-RC ed uscire a Tito. Proseguire lungo la SS95 Tito-Brienza in direzione Brienza. Attraversare il paese di Brienza ed immettersi sulla SS598 Fondo Valle dell'Agri in direzione Metaponto - Taranto. Lasciare la SS598 seguendo le indicazioni per Castelsareceno (prendere il secondo bivio). Arrivati al bivio per San Chirico Raparo girare a destra e dopo duecento metri rigirare a destra per la SS7 segnalata come strada a divieto di transito. Percorrerla tutta fino a Castelsaraceno. Attraversare il paese e seguire le indicazioni per la SA-RC. Percorsi alcuni chilometri seguire le indicazioni per Bosco Favino che ritroverete sulla sinistra. Proseguire fino a raggiungere un rifugio al margine del bosco sulla destra. Al bivio per il rifugio parcheggiare, la falesia è alla vostra destra.

Dalla A3 Salerno - Reggio Calabria:
Uscita Lauria Nord, immettersi sulla SS593 (Sinnica) e percorsi 4,5 KM prendere il bivio per Cogliandrino - Castelsaraceno. Proseguire per Castelsaraceno e passato il Monte Alpi (località Frusci) che si ritrova sulla destra proseguire sempre verso Castelsaraceno fino ad imbattersi nelle indicazioni per Bosco Favino. Prendere l'indicazione Bosco Favino sulla destra e proseguire fino ad arrivare al rifugio ai margini del bosco. Parcheggiare al bivio per il rifugio la Falesia si trova alla vostra destra

Dalla A14 Adriatica:
Uscire a Foggia, percorrere la tangenziale e prendere il bivio per Napoli - Potenza. Continuare sulla SS98 fino a Lavello dove bisogna immettersi sulla SS93 in direzione Melfi - Potenza. Proseguire sulla SS93 fino a raggiungere la SS407 Basentana in direzione Potenza. Prenedere l'uscita Tito e seguire le indicazioni riportate nell'itinerario Potenza"))