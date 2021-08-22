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
    var n = req.query.node;
    var nl = req.query.litenode;
    var ch = req.query.container;
    var st = req.query.timeserieshour;
    var api = req.query.apicall;
    var region = req.query.region;
    var pais = req.query.preciopais;


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
    const tst = st * 720; //series de tiempo hora
    const ptst = 0;

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
        let ptst = 0.000128;
    }
    if (tst == 1) {
        let ptst = 0.000028;
    }
    const tn = (hn * 0.06); //Precio nodo hora
    const tnl = (hnl * 0.013); //Precio nodo lite hora
    const tch = (hch * 0.000806); //Precio de contenedor hora
    const cst = ((hn + hnl + hch) * tst * ptst); //calculo de series de tiempo
    const tapi = (api * 0.00001); //Precio api call
    const suma = tn + tnl + tch + cst + tapi;
    const total = Math.round((suma) * 100) / 100;
    var stotal= total.toString();
var shn= hn.toString();
var shnl= hnl.toString();
var shch= hch.toString();
var stst=tst.toString();
    res.send({
        "node": n,
        "litenode": nl,
        "Container": ch,
        "timeserieshour": st,
        "apicall": api,
        "region": region,
        "pais": pais,
        "total":stotal,
        "nodehour":shn,
        "nodelitehour":shnl,
        "containerhour":shch,
        "timehour":stst
        

    })

});

app.post('/TasaDeTransferencia', (req, res) => {

    const TamañoArchivo = req.query.TamañoArchivo;
    const UnidadTamañoArchivo = req.query.UnidadTamañoArchivo;
    var TiempoTransferencia = req.query.TiempoTransferencia;
    const UnidadTiempoTransferencia = req.query.UnidadTiempoTransferencia;

    var unidadd;

var TamañoArchivobyte= TamañoArchivo;

    if (UnidadTamañoArchivo == "bit") {
        unidadd = 'b/s';
    }
    if (UnidadTamañoArchivo == "byte") {
        unidadd = 'B/s';
         TamañoArchivobyte = TamañoArchivo * 8;
    }

    if (UnidadTamañoArchivo == "kilobyte") {
        unidadd = 'Kb/s'
         TamañoArchivobyte = TamañoArchivo * 8;
    }

    if (UnidadTamañoArchivo == "megabyte") {
        unidadd = 'Mb/s'
         TamañoArchivobyte = TamañoArchivo * 8;
    }

    if (UnidadTamañoArchivo == "gigabyte") {
        unidadd = 'Gb/s'
         TamañoArchivobyte = TamañoArchivo * 8;
    }
    if (UnidadTamañoArchivo == "terabyte" ) {
        unidadd = 'Tb/s'
        TamañoArchivobyte = TamañoArchivo * 8;
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

    const ctotal = TamañoArchivobyte / TiempoTransferencia;


    res.send({
       "TamañoArchivo": req.query.TamañoArchivo,
       "UnidadTamañoArchivo": UnidadTamañoArchivo,
       "TiempoTransferencia": req.query.TiempoTransferencia,
       "UnidadTiempoTransferencia": UnidadTiempoTransferencia,
      "Unidadporsegundo": unidadd,
        "TotalAnchoBanda": ctotal + unidadd
    })

});
app.post('/TiempoDeTransferencia', (req, res) => {

    var TamañoArchivoTiempo = req.query.TamañoArchivoTiempo;
    const UnidadTamañoArchivoTiempo = req.query.UnidadTamañoArchivoTiempo;
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
              if (UnidadTamañoArchivoTiempo == "bit") {
                TamañoArchivoTiempo = TamañoArchivoTiempo;
              }
              if (UnidadTamañoArchivoTiempo == "byte") {
                TamañoArchivoTiempo = TamañoArchivoTiempo * 8;
              }
              if (UnidadTamañoArchivoTiempo == "kilobyte") {
                TamañoArchivoTiempo = TamañoArchivoTiempo * 8 * 1024;
              }
              if (UnidadTamañoArchivoTiempo == "megabyte") {
                TamañoArchivoTiempo = TamañoArchivoTiempo * 8 * 1024 * 1024;
              }
              if (UnidadTamañoArchivoTiempo == "gigabyte") {
                TamañoArchivoTiempo = TamañoArchivoTiempo * 8 * 1024 * 1024 * 1024;
              }
              if (UnidadTamañoArchivoTiempo == "terabyte") {
                TamañoArchivoTiempo = TamañoArchivoTiempo * 8 * 1024 * 1024 * 1024 * 1024;
              }

              const ctotal = TamañoArchivoTiempo / AnchoBanda;

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
                  titotal=year + ' '+ 'años' + ' '+ month + ' '+ 'meses' + ' ' +day + ' '+ 'dias' + ' ' + hour + ' ' + 'horas'+ ' ' + minute + ' ' + 'minutos'+ ' ' + second + ' ' + 'segundos';
                }
                return titotal;
              }

    res.send({
       "TamañoArchivo": req.query.TamañoArchivoTiempo ,
       "UnidadTamañoArchivo": req.query.UnidadTamañoArchivoTiempo,
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
  const tst = st * 720; //series de tiempo hora
  const ptst = 0;

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
      let ptst = 0.000128;
  }
  if (tst == 1) {
      let ptst = 0.000028;
  }
  const tn = (hn * 0.06); //Precio nodo hora
  const tnl = (hnl * 0.013); //Precio nodo lite hora
  const tch = (hch * 0.000806); //Precio de contenedor hora
  const cst = ((hn + hnl + hch) * tst * ptst); //calculo de series de tiempo
  const tapi = (api * 0.00001); //Precio api call
  const suma = tn + tnl + tch + cst + tapi;
  const total = Math.round((suma) * 100) / 100;

  res.send({
      "node": n,
      "litenode": nl,
      "Container": ch,
      "timeserieshour": st,
      "apicall": api,
      "region": region,
      "pais": pais,
      "total":total

  })

});

app.post('/TasaDeTransferenciaTem', (req, res) => {

  const TamañoArchivo = req.body.TamañoArchivo;
  const UnidadTamañoArchivo = rreq.body.UnidadTamañoArchivo;
  var TiempoTransferencia = req.body.TiempoTransferencia;
  const UnidadTiempoTransferencia = req.body.UnidadTiempoTransferencia;

  var unidadd;


  if (UnidadTamañoArchivo == "bit") {
      unidadd = 'b/s';
  }
  if (UnidadTamañoArchivo == "byte") {
      unidadd = 'B/s';
       TamañoArchivo = TamañoArchivo * 8;
  }

  if (UnidadTamañoArchivo == "kilobyte") {
      unidadd = 'Kb/s'
       TamañoArchivo = TamañoArchivo * 8;
  }

  if (UnidadTamañoArchivo == "megabyte") {
      unidadd = 'Mb/s'
       TamañoArchivo = TamañoArchivo * 8;
  }

  if (UnidadTamañoArchivo == "gigabyte") {
      unidadd = 'Gb/s'
       TamañoArchivo = TamañoArchivo * 8;
  }
  if (UnidadTamañoArchivo == "terabyte" ) {
      unidadd = 'Tb/s'
      TamañoArchivo = TamañoArchivo * 8;
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

  const ctotal = TamañoArchivo / TiempoTransferencia;


  res.send({
     "TamañoArchivo": req.body.TamañoArchivo,
     "UnidadTamañoArchivo": req.body.UnidadTamañoArchivo,
     "TiempoTransferencia": req.body.TiempoTransferencia,
     "UnidadTiempoTransferencia": req.body.UnidadTiempoTransferencia,
     "TotalAnchoBanda": ctotal
  })

});
app.post('/TiempoDeTransferenciaTem', (req, res) => {

  var TamañoArchivoTiempo = req.body.TamañoArchivoTiempo;
  const UnidadTamañoArchivoTiempo = req.body.UnidadTamañoArchivoTiempo;
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
            if (UnidadTamañoArchivoTiempo == "bit") {
              TamañoArchivoTiempo = TamañoArchivoTiempo;
            }
            if (UnidadTamañoArchivoTiempo == "byte") {
              TamañoArchivoTiempo = TamañoArchivoTiempo * 8;
            }
            if (UnidadTamañoArchivoTiempo == "kilobyte") {
              TamañoArchivoTiempo = TamañoArchivoTiempo * 8 * 1024;
            }
            if (UnidadTamañoArchivoTiempo == "megabyte") {
              TamañoArchivoTiempo = TamañoArchivoTiempo * 8 * 1024 * 1024;
            }
            if (UnidadTamañoArchivoTiempo == "gigabyte") {
              TamañoArchivoTiempo = TamañoArchivoTiempo * 8 * 1024 * 1024 * 1024;
            }
            if (UnidadTamañoArchivoTiempo == "terabyte") {
              TamañoArchivoTiempo = TamañoArchivoTiempo * 8 * 1024 * 1024 * 1024 * 1024;
            }

            const ctotal = TamañoArchivoTiempo / AnchoBanda;

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
                titotal=year + ' '+ 'años' + ' '+ month + ' '+ 'meses' + ' ' +day + ' '+ 'dias' + ' ' + hour + ' ' + 'horas'+ ' ' + minute + ' ' + 'minutos'+ ' ' + second + ' ' + 'segundos';
              }
              return titotal;
            }

  res.send({
     "TamañoArchivo": req.body.TamañoArchivoTiempo ,
     "UnidadTamañoArchivo": req.body.UnidadTamañoArchivoTiempo,
     "AnchoBanda": req.body.AnchoBanda,
     "UnidadAnchoBanda": req.body.UnidadAnchoBanda,
     "totaltiempotransferencia": hora(ctotal)
  })


});




app.listen(port, () => {
    console.log('La API esta en linea en el puerto ' + port);
})

module.exports = app;
