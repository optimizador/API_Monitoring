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
    const GBS = req.body.GB;
    const dias = req.body.dias;
    const region = req.body.region;
    const pais = req.body.preciopais;

    // Constante de precios
    var tdias = 0;
    var precio7dias = 1.72;
    var precio14dias = 2.30;
    var precio30dias = 3.25;
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

    // Variables a llamar req.body.(#name de la variable)
    const GBS1 = req.body.GB2;
    const dias1 = req.body.dias1;
    const region = req.body.region;
    const pais = req.body.preciopais;
    // Constante de precios
    var tdias1 = 0;
    var precio7dias1 = 1.72;
    var precio14dias1 = 2.30;
    var precio30dias1 = 3.25;
    var precio30Hdias1 = 4.60;
    if (!GBS1) {

        return res.status(400).json({ error: 'No hay datos' });
    }
    if (dias1 == "7dias") {
        tdias1 = Math.round((GBS1 * precio7dias1) * 100) / 100;
    }
    if (dias1 == "14dias") {
        tdias1 = Math.round((GBS1 * precio14dias1) * 100) / 100;
    }
    if (dias1 == "30dias") {
        tdias1 = Math.round((GBS1 * precio30dias1) * 100) / 100;
    }
    if (dias1 == "30diash") {
        tdias1 = Math.round((GBS1 * precio30Hdias1) * 100) / 100;
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

    const n = req.body.node;
    const nl = req.body.litenode;
    const ch = req.body.container;
    const st = req.body.timeserieshour;
    const api = req.body.apicall;
    const region = req.body.region;
    const pais = req.body.preciopais;

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
    const hn = n * 720;
    const hnl = nl * 720;
    const hch = ch * 720;
    const tst = st * 720;
    const ptst = 0;

    if (tst <= 1000) {
       let ptst = 0.000111;
    }
    if (tst > 1000 && tst <= 10000) {
        let ptst = 0.000069;
    }
    if (tst > 10000 && tst <= 100000) {
        let ptst = 0.000042;
    }
    if (tst == 1) {
        let ptst = 0.000028;
    }
    const tn = (hn * 0.048);
    const tnl = (hnl * 0.013);
    const tch = (hch * 0.000694);
    const cst = ((tn + tnl) * tst * ptst);
    const tapi = (api * 0.00001);
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





app.listen(port, () => {
    console.log('La aplicacion esta en linea!');
})

module.exports = app;