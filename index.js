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
app.post('/data', (req, res) => {
   
    // Variables a llamar req.body.(#name de la variable)
    const GBS = req.body.GB;
    const dias = req.body.dias;
   
    // Constante de precios
    var tdias = 0;
    var precio7dias = 1.72;
    var precio14dias = 2.30;
    var precio30dias = 3.25;
    var precio30Hdias = 4.60;
    if (!GBS) {
        
        return res.status(400).json({ error: 'No hay datos' });
    }
    if (dias == 0){
        tdias = Math.round((GBS * precio7dias) * 100) / 100;
    }
    if (dias == 1){
         tdias= Math.round((GBS * precio14dias) * 100) / 100;
    }
    if (dias == 2){
         tdias = Math.round((GBS * precio30dias) * 100) / 100;
    }
    if (dias == 3){
        tdias = Math.round((GBS * precio30Hdias) * 100) / 100;
    }
    
    const totalapi= JSON.stringify(tdias)
    console.log(totalapi)
    return totalapi;
    
});

app.post('/data1', (req, res) => {
   
    // Variables a llamar req.body.(#name de la variable)
    const GBS = req.body.GB2;
    const dias = req.body.dias1;
   
    // Constante de precios
    var tdias1 = 0;
    var precio7dias = 1.72;
    var precio14dias = 2.30;
    var precio30dias = 3.25;
    var precio30Hdias = 4.60;
    if (!GBS) {
        
        return res.status(400).json({ error: 'No hay datos' });
    }
    if (dias == 0){
        tdias1 = Math.round((GBS * precio7dias) * 100) / 100;
    }
    if (dias == 1){
         tdias1= Math.round((GBS * precio14dias) * 100) / 100;
    }
    if (dias == 2){
         tdias1= Math.round((GBS * precio30dias) * 100) / 100;
    }
    if (dias == 3){
        tdias1 = Math.round((GBS * precio30Hdias) * 100) / 100;
    }
    res.send("Listo");     
    
});
app.listen(port, () => {
    console.log('La aplicacion esta en linea!');
})

module.exports = app;