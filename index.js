 import {mlog,say,send} from './vendor/logs.js'
    process.on('uncaughtException', (err) => {
    mlog('Глобальный косяк приложения!!! ', err.stack);
}); //Если все пошло по ***, спасет ситуацию
import fs from 'fs-extra'
import https from 'http'
import express from 'express'
import bodyParser from 'body-parser'
const app = express(); 
/*var options = {
    key: fs.readFileSync('/etc/letsencrypt/live/home.teyhd.ru/privkey.pem', 'utf8'),
    cert: fs.readFileSync('/etc/letsencrypt/live/home.teyhd.ru/cert.pem', 'utf8'),
    ca: fs.readFileSync('/etc/letsencrypt/live/home.teyhd.ru/chain.pem', 'utf8')
};*/

var PORT = process.env.PORT || 82;
 
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 


app.use(async function (req, res, next) {
   // console.log(req.originalUrl)
    let page = req.originalUrl;
    next();
    mlog(page,getcurip(req.socket.remoteAddress),req.query)
}) 

app.post('*',async function(req, res){
    
    say(`Новая заявка с сайта\nИмя ребенка: ${req.body.name}\nВозраст ребенка: ${req.body.Date}\nТелефон: ${req.body.Phone}\nИмя родителя: ${req.body.name_2}\nEmail: ${req.body.Email}\nСвязь: ${req.body.connection_type}\nВоронка: ${decodeid(req.body.pipeline_id)}`,true)
    send(req.body)
    console.log(req.body);
    console.log(req.query);
    console.log(req.params);
    res.send("ok")
});

app.post('/',async function(req, res){
    console.log(req);
    console.log(req.body);
    res.send("ok")
});
 
app.get('*',async function(req, res){
     console.log(req);
    res.send("ok")
});
function getcurip(str) {
    let arr = str.split(':');
    arr = arr[arr.length-1];
    return arr;
}
async function start(){
    try {
        var server = https.createServer(app);
        server.listen(PORT,()=> {
            mlog('Сервер - запущен')
            say("Сервер для тильды")
            mlog('Порт:',PORT);
        })
        
    } catch (e) {
        mlog(e);
    }
}
start();

function decodeid(id){
    let name = []
    name[1088] = "Лето 2024"
    name[952] = "Онлвйн школа"
    name[775] = "Подготовка к школе"
    name[943] = "Ученики"
    let ans = "NO CRM"
    if ((name[id]!=undefined) && (name[id]!=null)){
       ans = name[id] 
    }
    
    return ans
}