const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');
const template = require('./lib/template.js');
const path = require('path');
const sanitizeHtml = require('sanitize-html');
const mysql = require('mysql');
const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '7895',
  database : 'myboard'
});
db.connect();


const app = http.createServer(function(request,response){
  const _url = request.url;
  const queryData = url.parse(_url, true).query;
  const pathname = url.parse(_url, true).pathname;
  const title = queryData.id;

  if(pathname === '/'){
    if(title === undefined){
      db.query(`select * from topic`, function(err, topics){
        const title = 'Simple Board';
        const list = template.list(topics);
        const html = template.mainHtml(title, list, '');
        response.writeHead(200);
        response.end(html);
      });
    } else {
      db.query(`select * from topic`, function(err, topics){
        if(err){
          throw err;
        }
        db.query(`select * from topic where id=?`, [queryData.id], function(err2, topic){
          if(err2){
            throw err2;
          }
          const title = topic[0].title;
          const description = topic[0].description;
          const list = template.list(topics);
          const html = template.html(title, list, 
            `<div id = "text"><p>${description}</p></div>`, 
            `<a href = "/update?id=${queryData.id}">수정</a>
            <form action="delete_process" method="post">
              <input type="hidden" name="id" value="${title}">
              <input type="submit" value="삭제">
            </form>`
            );
          response.writeHead(200);
          response.end(html);
        })
      });
    }
  } else if(pathname === '/write') {
    db.query(`select * from topic`, function(err, topics){
      const title = 'WEB - write';
      const list = template.list(topics);
      const html = template.mainHtml(title, list, `
      <form action='/write_process' method="post">
        <p><input type="text" name="title" placeholder="제목"></p>
        <p>
          <textarea name="description" placeholder="내용"></textarea>
        </p>
        <p>
          <input type="submit">
        </p>
          </form>
      `,'');
      response.writeHead(200);
      response.end(html);
    });
  } else if(pathname === '/write_process') {
    let body = '';
    request.on('data', function(data){
      body = body + data;
    });
    request.on('end', function(){
      const post = qs.parse(body);
      db.query(`insert into topic(title, description, created, author_id) 
        values(?, ?, now(), ?);`,
        [post.title, post.description, 1],
        function(err, result){
          if(err){
            throw err;
          }
          response.writeHead(302, {Location: `/?id=${result.insertId}`});
          response.end();
        });
    });
  } else if(pathname ==='/update') {
    db.query('SELECT * FROM topic', function(error, topics){
      if(error){
        throw error;
      }
      db.query(`SELECT * FROM topic WHERE id=?`,[queryData.id], function(error2, topic){
        if(error2){
          throw error2;
        }
        var list = template.list(topics);
        var html = template.html(topic[0].title, list,
          `
          <form action="/update_process" method="post">
            <input type="hidden" name="id" value="${topic[0].id}">
            <p><input type="text" name="title" placeholder="title" value="${topic[0].title}"></p>
            <p>
              <textarea name="description" placeholder="description">${topic[0].description}</textarea>
            </p>
            <p>
              <input type="submit">
            </p>
          </form>
          `,
          `<a href="/create">create</a> <a href="/update?id=${topic[0].id}">update</a>`
        );
        response.writeHead(200);
        response.end(html);
      });
    });
  } else if(pathname === '/update_process'){
    let body = '';
    request.on('data', function(data){
        body = body + data;
    });
    request.on('end', function(){
        const post = qs.parse(body);
        db.query(`update topic set title=?, description=?, author_id=1 where id=?`, 
          [post.title, post.description, post.id],
          function(err, result){
            response.writeHead(302, {Location: `/?id=${post.id}`});
            response.end();
          })
    });
  } else if(pathname === '/delete_process'){
    let body = '';
    request.on('data', function(data){
        body = body + data;
    });
    request.on('end', function(){
      const post = qs.parse(body);
      db.query('DELETE FROM topic WHERE id = ?', [post.id], function(error, result){
        if(error){
          throw error;
        }
        response.writeHead(302, {Location: `/`});
        response.end();
      });
    });
  } else {
    response.writeHead(404);
    response.end('Not found');
  }
});

app.listen(3000);
