
import fs from 'fs-extra'
import path from 'path'

import request from 'request'
import rp from 'request-promise'
import urlencode from 'urlencode'

var appDir = path.dirname(import.meta.url);
appDir = appDir.split('///')
appDir = appDir[1]
let test = false
if (!test){
  appDir = "//"+appDir
}

console.log(appDir);


function curdate(minute){
    minute = (minute < 10) ? '0' + minute : minute;
    return minute;
  }
  

export function mlog (par) {
    let datecreate = new Date();
    let texta = `\n ${curdate(datecreate.getHours())}:${curdate(datecreate.getMinutes())}:${curdate(datecreate.getSeconds())}`;
    let obj = arguments;
  
    for (const key in obj) {
      if (typeof obj[key]=='object') {
        for (const keys in obj[key]){
          texta = `${texta} \n ${keys}:${obj[key][keys]}`
        }
      } else {
        texta = `${texta} ${obj[key]}`
      }
      
    } 
    fs.writeFileSync(path.join(appDir,'logs',`${curdate(datecreate.getDate())}.${curdate(datecreate.getMonth()+1)} log.txt`),
    texta,
    {
      encoding: "utf8",
      flag: "a+",
      mode: 0o666
    });
  
    console.log(texta);
    return texta
  }
export function say(msg,all=false) {
  var tgnum = [304622290,1359321592,1521151411]
  if (all===true){
    tgnum.forEach(element => {
      setTimeout(() => sendtg(element,msg), 1500);
    });
  } else{
    setTimeout(() => sendtg(tgnum[0],msg), 1500);
  }
  
}
export function send(arr) {
    let url = `https://panel.bigbencrm.ru/api/leads/add?key=621f75d3ebb01f7279d6d21d4d18c1e1&pipeline_status_id=${urlencode(arr.pipeline_status_id)}&pipeline_id=${urlencode(arr.pipeline_id)}&email=${urlencode(arr.Email)}&fio=${urlencode(arr.name)}&fio_parent=${urlencode(arr.name_2)}&birthday=${urlencode(arr.Date)}&phone=${urlencode(arr.Phone)}&phone_comment=${urlencode(arr.connection_type)}`
    mlog(url)
  rp(url)
  .then(function (body) {
     // say(JSON.stringify(body),false)
      mlog('Отправка сообщения - пришло:', body); // Print the HTML for the Google homepage.
      return body
  })
  .catch(function (err) {
       say(JSON.stringify(err),false)
      mlog(err)
    //console.dir(err);
  });
}

function sendtg(num,msg) {
  rp(`http://localhost:3334/?msg=${urlencode(msg)}&num=${urlencode(num)}`)
  .then(function (body) {
     // say(JSON.stringify(body),false)
      console.log('Отправка сообщения - пришло:', body); // Print the HTML for the Google homepage.
      return body
  })
  .catch(function (err) {
     // say(JSON.stringify(err),false)
    //console.dir(err);
  });
}

export function senderr(num,msg,pic) {
  senderrtg(num,msg,pic)
  const mail = require('./smail.js');
  mail.sendmailerr(msg,`http://news.pansion.spb.ru:500/err/${pic}`,pic)
  rp(`http://websrv:3333/err?msg=${urlencode(msg)}&num=${urlencode(num)}&pic=${urlencode(`http://news.pansion.spb.ru:500/err/${pic}`)}`)
  .then(function (body) {
      console.log('Отправка сообщения - пришло:', body); // Print the HTML for the Google homepage.
      return body
  })
  .catch(function (err) {
    console.dir(err);
  });
}

function senderrtg(num,msg,pic) {
  rp(`http://localhost:3334/err?msg=${urlencode(msg)}&num=${urlencode(num)}&pic=${urlencode(`http://news.pansion.spb.ru:500/err/${pic}`)}`)
  .then(function (body) {
      console.log('Отправка сообщения - пришло:', body); // Print the HTML for the Google homepage.
      return body
  })
  .catch(function (err) {
    console.dir(err);
  });
}


//