const express = require('express')
const path = require('path')
const app = express()
const port = 3000
const morgan = require('morgan')
var bodyParser = require('body-parser');
const { json } = require('express')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));
app.use(express.json());


app.get('/', (request, response) => {
    response.send("API MONITORING")

})
app.post('/ActivityTracker', (req, res) => {

    // Variables a llamar req.body.(#name de la variable)
    const GBS = req.query.GB;
    const dias = req.query.dias;
    const region = req.query.region;
    const pais = req.query.preciopais;

    // Constante de precios
    var tdias = 0;
    var precio7dias = 1.72;
    var precio14dias = 2.30;
    var precio30dias = 3.45;
    var precio30Hdias = 4.60;
    if (!GBS) {

        return res.status(400).json({ error: 'No hay datos' });
    }
    if (dias == "7dias") {
        tdias = Math.round((GBS * precio7dias) * 100) / 100;
    }
    if (dias == "14dias") {
        tdias = Math.round((GBS * precio14dias) * 100) / 100;
    }
    if (dias == "30dias") {
        tdias = Math.round((GBS * precio30dias) * 100) / 100;
    }
    if (dias == "30diash") {
        tdias = Math.round((GBS * precio30Hdias) * 100) / 100;
    }


    res.send({
        "total": tdias,
        "GB": GBS,
        "region": region,
        "pais": pais,
        "dias": dias
    })


});

app.post('/LogAnalysis', (req, res) => {
    console.log(req);
    // Variables a llamar req.body.(#name de la variable)
    const GBS1 = req.query.GB;
    const dias1 = req.query.dias;
    const region = req.query.region;
    const pais = req.query.preciopais;
    // Constante de precios
    var tdias1 = 0;
    var precio7dias = 1.72;
    var precio14dias = 2.30;
    var precio30dias = 3.45;
    var precio30Hdias = 4.60;
    if (!GBS1) {

        return res.status(400).json({ error: 'No hay datos' });
    }
    if (dias1 == "7dias") {
        tdias1 = Math.round((GBS1 * precio7dias) * 100) / 100;
    }
    if (dias1 == "14dias") {
        tdias1 = Math.round((GBS1 * precio14dias) * 100) / 100;
    }
    if (dias1 == "30dias") {
        tdias1 = Math.round((GBS1 * precio30dias) * 100) / 100;
    }
    if (dias1 == "30diash") {
        tdias1 = Math.round((GBS1 * precio30Hdias) * 100) / 100;
    }

    res.send({
        "total": tdias1,
        "GB": GBS1,
        "region": region,
        "pais": pais,
        "dias": dias1
    })


});

app.post('/CloudMonitoring', (req, res) => {
    //Log para cambios
    var horasmes=720;
    var n = req.query.node;
    var nl = req.query.litenode;
    var ch = req.query.container;
    var st = req.query.timeserieshour;
    var api = req.query.apicall;
    var region = req.query.region;
    var pais = req.query.preciopais;


    console.log("nodos: "+n);
    console.log("nodos lite: "+nl);
    console.log("contenedores: "+ch);
    console.log("series de tiempo: "+st);
    console.log("api call: "+api);
    console.log("region: "+region);
    console.log("pais: "+pais);
    if (isNaN(n)) {
        n = 0;
    }
    if (isNaN(nl)) {
        nl = 0;
    }
    if (isNaN(ch)) {
        ch = 0;
    }
    if (isNaN(st)) {
        st = 0;
    }
    if (isNaN(api)) {
        api = 0;
    }
    var tst = (n*st+nl*st+ch*st); // series de tiempo totales
    console.log("series de tiempo: "+tst+" nodos:" +n+" nodos lite:"+nl+" contenedores:"+ch+" series de tiempo:"+st);
    const hn = n * horasmes; //nodos hora
    const hnl = nl * horasmes; //nodos lite hora
    const hch = ch * horasmes; //contenedores hora
    var ptst = 0;

    const tn = (hn * 0.05519); //Precio nodo hora
    const tnl = (hnl * 0.01494); //Precio nodo lite hora
    const tch = (hch * 0.000806); //Precio de contenedor hora
    //tst=(n+nl+ch)*st; //calculo de series de tiempo
    
    if (tst <= 1000) {
       let ptst = 0.00013;
    }
    if (tst > 1000 && tst <= 10000) {
        let ptst = 0.000128;
    }
    if (tst > 10000 && tst <= 100000) {
        let ptst = 0.000128;
    }
    if (tst > 100000) {
        let ptst = 0.0001278;
    }
    if (tst == 1) {
        let ptst = 0.000028;
    }
    const cst = tst * horasmes * ptst; //calculo de series de tiempo
    const tapi = (api * 0.00001035); //Precio api call
    const suma = tn + tnl + tch + cst + tapi;
    const total = Math.round((suma) * 100) / 100;
    var stotal= total.toString();
    var shn= hn.toString();
    var shnl= hnl.toString();
    var shch= hch.toString();
    var stst=(tst*horasmes).toString();
    
    console.log("nodos hora: "+hn);
    console.log("nodos lite hora: "+hnl);
    console.log("contenedores hora: "+hch);
    
    console.log("series de tiempo hora resultante hora: "+tst*horasmes);

    console.log("nodos hora precio: "+tn);
    console.log("nodos lite hora precio: "+tnl);
    console.log("contenedores hora precio: "+tch);
    console.log("series de tiempo hora precio: "+cst);
    console.log("APi call precio: "+tapi);
    console.log("Total sumatoria: "+total+" suma original:"+suma);


    res.send({
        "node": n,
        "litenode": nl,
        "Container": ch,
        "timeserieshour": st,
        "apicall": api,
        "region": region,
        "pais": pais,
        "total": stotal,
        "nodehour": shn,
        "nodelitehour": shnl,
        "containerhour": shch,
        "timehour": stst
        

    })

});

app.post('/TasaDeTransferencia', (req, res) => {

    const Tama??oArchivo = req.query.Tama??oArchivo;
    const UnidadTama??oArchivo = req.query.UnidadTama??oArchivo;
    var TiempoTransferencia = req.query.TiempoTransferencia;
    const UnidadTiempoTransferencia = req.query.UnidadTiempoTransferencia;

    var unidadd;

var Tama??oArchivobyte= Tama??oArchivo;

    if (UnidadTama??oArchivo == "bit") {
        unidadd = 'b/s';
    }
    if (UnidadTama??oArchivo == "byte") {
        unidadd = 'B/s';
         Tama??oArchivobyte = Tama??oArchivo * 8;
    }

    if (UnidadTama??oArchivo == "kilobyte") {
        unidadd = 'Kb/s'
         Tama??oArchivobyte = Tama??oArchivo * 8;
    }

    if (UnidadTama??oArchivo == "megabyte") {
        unidadd = 'Mb/s'
         Tama??oArchivobyte = Tama??oArchivo * 8;
    }

    if (UnidadTama??oArchivo == "gigabyte") {
        unidadd = 'Gb/s'
         Tama??oArchivobyte = Tama??oArchivo * 8;
    }
    if (UnidadTama??oArchivo == "terabyte" ) {
        unidadd = 'Tb/s'
        Tama??oArchivobyte = Tama??oArchivo * 8;
    }
    if (UnidadTiempoTransferencia == "segundos") {
         TiempoTransferencia = TiempoTransferencia;
    }
    if (UnidadTiempoTransferencia == "minutos") {
         TiempoTransferencia = TiempoTransferencia * 60;
    }
    if (UnidadTiempoTransferencia == "horas") {
         TiempoTransferencia = TiempoTransferencia * 360;
    }

    const ctotal = Tama??oArchivobyte / TiempoTransferencia;


    res.send({
       "Tama??oArchivo": req.query.Tama??oArchivo,
       "UnidadTama??oArchivo": UnidadTama??oArchivo,
       "TiempoTransferencia": req.query.TiempoTransferencia,
       "UnidadTiempoTransferencia": UnidadTiempoTransferencia,
      "Unidadporsegundo": unidadd,
        "TotalAnchoBanda": ctotal + unidadd
    })

});
app.post('/TiempoDeTransferencia', (req, res) => {

    var Tama??oArchivoTiempo = req.query.Tama??oArchivoTiempo;
    const UnidadTama??oArchivoTiempo = req.query.UnidadTama??oArchivoTiempo;
    var AnchoBanda = req.query.AnchoBanda;
    const UnidadAnchoBanda = req.query.UnidadAnchoBanda;

              if (UnidadAnchoBanda == "bit") {
                AnchoBanda = AnchoBanda;
              }
              if (UnidadAnchoBanda == "kilobit") {
                AnchoBanda = AnchoBanda * 1024;
              }
              if (UnidadAnchoBanda == "megabit") {
                AnchoBanda = AnchoBanda * 1024 * 1024;
              }
              if (UnidadAnchoBanda == "gigabit") {
                AnchoBanda = AnchoBanda * 1024 * 1024 * 1024;
              }
              if (UnidadAnchoBanda == "terabit") {
                AnchoBanda = AnchoBanda * 1024 * 1024 * 1024 * 1024;
              }
              if (UnidadTama??oArchivoTiempo == "bit") {
                Tama??oArchivoTiempo = Tama??oArchivoTiempo;
              }
              if (UnidadTama??oArchivoTiempo == "byte") {
                Tama??oArchivoTiempo = Tama??oArchivoTiempo * 8;
              }
              if (UnidadTama??oArchivoTiempo == "kilobyte") {
                Tama??oArchivoTiempo = Tama??oArchivoTiempo * 8 * 1024;
              }
              if (UnidadTama??oArchivoTiempo == "megabyte") {
                Tama??oArchivoTiempo = Tama??oArchivoTiempo * 8 * 1024 * 1024;
              }
              if (UnidadTama??oArchivoTiempo == "gigabyte") {
                Tama??oArchivoTiempo = Tama??oArchivoTiempo * 8 * 1024 * 1024 * 1024;
              }
              if (UnidadTama??oArchivoTiempo == "terabyte") {
                Tama??oArchivoTiempo = Tama??oArchivoTiempo * 8 * 1024 * 1024 * 1024 * 1024;
              }

              const ctotal = Tama??oArchivoTiempo / AnchoBanda;

              function hora(ctotal) {
                var year = Math.floor(ctotal / 32140800);
                year = (year < 10) ? '0' + year : year;
                var month = Math.floor(ctotal / 2678400) % 2678400 % 12;
                month = (month < 10) ? '0' + month : month;
                var day = Math.floor(ctotal / 86400) % 86400 % 31;
                day = (day < 10) ? '0' + day : day;
                var hour = Math.floor(ctotal / 3600) % 3600 % 24;
                hour = (hour < 10) ? '0' + hour : hour;
                var minute = Math.floor((ctotal / 60) % 60);
                minute = (minute < 10) ? '0' + minute : minute;
                var second = ctotal % 60;
                second = (second < 10) ? '0' + second : second;
                if (year == 0 && month == 0 && day == 0 && hour == 0 && minute == 0 && second > 0){
                  titotal= second + ' ' + 'segundos';
                }
                if (year == 0 && month == 0 && day == 0 && hour == 0 && minute > 0 && second > 0){
                  titotal= minute + ' ' + 'minutos'+ ' ' + second + ' ' + 'segundos';
                }
                if (year == 0 && month == 0  && day == 0 && hour > 0 && minute > 0 && second > 0){
                  titotal= hour + ' ' + 'horas'+ ' ' + minute + ' ' + 'minutos'+ ' ' + second + ' ' + 'segundos';
                }
                if (year == 0 && month == 0  && day > 0 && hour > 0 && minute > 0 && second > 0){
                  titotal= day + ' '+ 'dias' + ' ' + hour + ' ' + 'horas'+ ' ' + minute + ' ' + 'minutos'+ ' ' + second + ' ' + 'segundos';
                }
                if (year == 0 && month > 0  && day > 0 && hour > 0 && minute > 0 && second > 0){
                  titotal= month + ' '+ 'meses' + ' ' +day + ' '+ 'dias' + ' ' + hour + ' ' + 'horas'+ ' ' + minute + ' ' + 'minutos'+ ' ' + second + ' ' + 'segundos';
                }
                if (year > 0 && month > 0  && day > 0 && hour > 0 && minute > 0 && second > 0){
                  titotal=year + ' '+ 'a??os' + ' '+ month + ' '+ 'meses' + ' ' +day + ' '+ 'dias' + ' ' + hour + ' ' + 'horas'+ ' ' + minute + ' ' + 'minutos'+ ' ' + second + ' ' + 'segundos';
                }
                return titotal;
              }

    res.send({
       "Tama??oArchivo": req.query.Tama??oArchivoTiempo ,
       "UnidadTama??oArchivo": req.query.UnidadTama??oArchivoTiempo,
       "AnchoBanda": req.query.AnchoBanda,
       "UnidadAnchoBanda": req.query.UnidadAnchoBanda,
       "totaltiempotransferencia": hora(ctotal)
    })


});

app.post('/ActivityTrackerTem', (req, res) => {

  // Variables a llamar req.body.(#name de la variable)
  const GBS = req.body.GB;
  const dias = req.body.dias;
  const region = req.body.region;
  const pais = req.body.preciopais;

  // Constante de precios
  var tdias = 0;
  var precio7dias = 1.72;
  var precio14dias = 2.30;
  var precio30dias = 3.45;
  var precio30Hdias = 4.60;
  if (!GBS) {

      return res.status(400).json({ error: 'No hay datos' });
  }
  if (dias == "7dias") {
      tdias = Math.round((GBS * precio7dias) * 100) / 100;
  }
  if (dias == "14dias") {
      tdias = Math.round((GBS * precio14dias) * 100) / 100;
  }
  if (dias == "30dias") {
      tdias = Math.round((GBS * precio30dias) * 100) / 100;
  }
  if (dias == "30diash") {
      tdias = Math.round((GBS * precio30Hdias) * 100) / 100;
  }


  res.send({
      "total": tdias,
      "GB": GBS,
      "region": region,
      "pais": pais,
      "dias": dias
  })


});

app.post('/LogAnalysisTem', (req, res) => {
  console.log(req);
  // Variables a llamar req.body.(#name de la variable)
  const GBS1 = req.body.GB;
  const dias1 = req.body.dias;
  const region = req.body.region;
  const pais = req.body.preciopais;
  // Constante de precios
  var tdias1 = 0;
  var precio7dias = 1.72;
  var precio14dias = 2.30;
  var precio30dias = 3.45;
  var precio30Hdias = 4.60;
  if (!GBS1) {

      return res.status(400).json({ error: 'No hay datos' });
  }
  if (dias1 == "7dias") {
      tdias1 = Math.round((GBS1 * precio7dias) * 100) / 100;
  }
  if (dias1 == "14dias") {
      tdias1 = Math.round((GBS1 * precio14dias) * 100) / 100;
  }
  if (dias1 == "30dias") {
      tdias1 = Math.round((GBS1 * precio30dias) * 100) / 100;
  }
  if (dias1 == "30diash") {
      tdias1 = Math.round((GBS1 * precio30Hdias) * 100) / 100;
  }

  res.send({
      "total": tdias1,
      "GB": GBS1,
      "region": region,
      "pais": pais,
      "dias": dias1
  })


});

app.post('/CloudMonitoringTem', (req, res) => {
  //Log para cambios
  var n = req.body.node;
  var nl = req.body.litenode;
  var ch = req.body.container;
  var st = req.body.timeserieshour;
  var api = req.body.apicall;
  var region = req.body.region;
  var pais = req.body.preciopais;


  if (isNaN(n)) {
      n = 0;
  }
  if (isNaN(nl)) {
      nl = 0;
  }
  if (isNaN(ch)) {
      ch = 0;
  }
  if (isNaN(st)) {
      st = 0;
  }
  if (isNaN(api)) {
      api = 0;
  }
  const hn = n * 720; //nodos hora
  const hnl = nl * 720; //nodos lite hora
  const hch = ch * 720; //contenedores hora
  var tst =(n*st+nl*st+ch*st); //calculo de series de tiempo
  const ptst = 0;

    const tn = (hn * 0.06); //Precio nodo hora
    const tnl = (hnl * 0.013); //Precio nodo lite hora
    const tch = (hch * 0.000806); //Precio de contenedor hora
   // tst=(n+nl+ch)*st; //calculo de series de tiempo

   if (tst <= 1000) {
    let ptst = 0.00013;
    }
    if (tst > 1000 && tst <= 10000) {
     let ptst = 0.000128;
    }
    if (tst > 10000 && tst <= 100000) {
     let ptst = 0.000128;
    }''
     if (tst > 100000) {
     let ptst = 0.0001278;
    }''
    if (tst == 1) {
     let ptst = 0.000028;
    }

 const cst = tst * 720 * ptst; //calculo de series de tiempo
  const tapi = (api * 0.00001035); //Precio api call
  const suma = tn + tnl + tch + cst + tapi;
  const total = Math.round((suma) * 100) / 100;

  res.send({
      "node": n,
      "litenode": nl,
      "Container": ch,
      "timeserieshour": tst * 720,
      "apicall": api,
      "region": region,
      "pais": pais,
      "total":total

  })

});

app.post('/TasaDeTransferenciaTem', (req, res) => {

  const Tama??oArchivo = req.body.Tama??oArchivo;
  const UnidadTama??oArchivo = rreq.body.UnidadTama??oArchivo;
  var TiempoTransferencia = req.body.TiempoTransferencia;
  const UnidadTiempoTransferencia = req.body.UnidadTiempoTransferencia;

  var unidadd;


  if (UnidadTama??oArchivo == "bit") {
      unidadd = 'b/s';
  }
  if (UnidadTama??oArchivo == "byte") {
      unidadd = 'B/s';
       Tama??oArchivo = Tama??oArchivo * 8;
  }

  if (UnidadTama??oArchivo == "kilobyte") {
      unidadd = 'Kb/s'
       Tama??oArchivo = Tama??oArchivo * 8;
  }

  if (UnidadTama??oArchivo == "megabyte") {
      unidadd = 'Mb/s'
       Tama??oArchivo = Tama??oArchivo * 8;
  }

  if (UnidadTama??oArchivo == "gigabyte") {
      unidadd = 'Gb/s'
       Tama??oArchivo = Tama??oArchivo * 8;
  }
  if (UnidadTama??oArchivo == "terabyte" ) {
      unidadd = 'Tb/s'
      Tama??oArchivo = Tama??oArchivo * 8;
  }
  if (UnidadTiempoTransferencia == "segundos") {
       TiempoTransferencia = TiempoTransferencia;
  }
  if (UnidadTiempoTransferencia == "minutos") {
       TiempoTransferencia = TiempoTransferencia * 60;
  }
  if (UnidadTiempoTransferencia == "horas") {
       TiempoTransferencia = TiempoTransferencia * 360;
  }

  const ctotal = Tama??oArchivo / TiempoTransferencia;


  res.send({
     "Tama??oArchivo": req.body.Tama??oArchivo,
     "UnidadTama??oArchivo": req.body.UnidadTama??oArchivo,
     "TiempoTransferencia": req.body.TiempoTransferencia,
     "UnidadTiempoTransferencia": req.body.UnidadTiempoTransferencia,
     "TotalAnchoBanda": ctotal
  })

});
app.post('/TiempoDeTransferenciaTem', (req, res) => {

  var Tama??oArchivoTiempo = req.body.Tama??oArchivoTiempo;
  const UnidadTama??oArchivoTiempo = req.body.UnidadTama??oArchivoTiempo;
  var AnchoBanda = req.body.AnchoBanda;
  const UnidadAnchoBanda = req.body.UnidadAnchoBanda;

            if (UnidadAnchoBanda == "bit") {
              AnchoBanda = AnchoBanda;
            }
            if (UnidadAnchoBanda == "kilobit") {
              AnchoBanda = AnchoBanda * 1024;
            }
            if (UnidadAnchoBanda == "megabit") {
              AnchoBanda = AnchoBanda * 1024 * 1024;
            }
            if (UnidadAnchoBanda == "gigabit") {
              AnchoBanda = AnchoBanda * 1024 * 1024 * 1024;
            }
            if (UnidadAnchoBanda == "terabit") {
              AnchoBanda = AnchoBanda * 1024 * 1024 * 1024 * 1024;
            }
            if (UnidadTama??oArchivoTiempo == "bit") {
              Tama??oArchivoTiempo = Tama??oArchivoTiempo;
            }
            if (UnidadTama??oArchivoTiempo == "byte") {
              Tama??oArchivoTiempo = Tama??oArchivoTiempo * 8;
            }
            if (UnidadTama??oArchivoTiempo == "kilobyte") {
              Tama??oArchivoTiempo = Tama??oArchivoTiempo * 8 * 1024;
            }
            if (UnidadTama??oArchivoTiempo == "megabyte") {
              Tama??oArchivoTiempo = Tama??oArchivoTiempo * 8 * 1024 * 1024;
            }
            if (UnidadTama??oArchivoTiempo == "gigabyte") {
              Tama??oArchivoTiempo = Tama??oArchivoTiempo * 8 * 1024 * 1024 * 1024;
            }
            if (UnidadTama??oArchivoTiempo == "terabyte") {
              Tama??oArchivoTiempo = Tama??oArchivoTiempo * 8 * 1024 * 1024 * 1024 * 1024;
            }

            const ctotal = Tama??oArchivoTiempo / AnchoBanda;

            function hora(ctotal) {
              var year = Math.floor(ctotal / 32140800);
              year = (year < 10) ? '0' + year : year;
              var month = Math.floor(ctotal / 2678400) % 2678400 % 12;
              month = (month < 10) ? '0' + month : month;
              var day = Math.floor(ctotal / 86400) % 86400 % 31;
              day = (day < 10) ? '0' + day : day;
              var hour = Math.floor(ctotal / 3600) % 3600 % 24;
              hour = (hour < 10) ? '0' + hour : hour;
              var minute = Math.floor((ctotal / 60) % 60);
              minute = (minute < 10) ? '0' + minute : minute;
              var second = ctotal % 60;
              second = (second < 10) ? '0' + second : second;
              if (year == 0 && month == 0 && day == 0 && hour == 0 && minute == 0 && second > 0){
                titotal= second + ' ' + 'segundos';
              }
              if (year == 0 && month == 0 && day == 0 && hour == 0 && minute > 0 && second > 0){
                titotal= minute + ' ' + 'minutos'+ ' ' + second + ' ' + 'segundos';
              }
              if (year == 0 && month == 0  && day == 0 && hour > 0 && minute > 0 && second > 0){
                titotal= hour + ' ' + 'horas'+ ' ' + minute + ' ' + 'minutos'+ ' ' + second + ' ' + 'segundos';
              }
              if (year == 0 && month == 0  && day > 0 && hour > 0 && minute > 0 && second > 0){
                titotal= day + ' '+ 'dias' + ' ' + hour + ' ' + 'horas'+ ' ' + minute + ' ' + 'minutos'+ ' ' + second + ' ' + 'segundos';
              }
              if (year == 0 && month > 0  && day > 0 && hour > 0 && minute > 0 && second > 0){
                titotal= month + ' '+ 'meses' + ' ' +day + ' '+ 'dias' + ' ' + hour + ' ' + 'horas'+ ' ' + minute + ' ' + 'minutos'+ ' ' + second + ' ' + 'segundos';
              }
              if (year > 0 && month > 0  && day > 0 && hour > 0 && minute > 0 && second > 0){
                titotal=year + ' '+ 'a??os' + ' '+ month + ' '+ 'meses' + ' ' +day + ' '+ 'dias' + ' ' + hour + ' ' + 'horas'+ ' ' + minute + ' ' + 'minutos'+ ' ' + second + ' ' + 'segundos';
              }
              return titotal;
            }

  res.send({
     "Tama??oArchivo": req.body.Tama??oArchivoTiempo ,
     "UnidadTama??oArchivo": req.body.UnidadTama??oArchivoTiempo,
     "AnchoBanda": req.body.AnchoBanda,
     "UnidadAnchoBanda": req.body.UnidadAnchoBanda,
     "totaltiempotransferencia": hora(ctotal)
  })


});




app.listen(port, () => {
    console.log('La API esta en linea en el puerto ' + port);
})

module.exports = app;
