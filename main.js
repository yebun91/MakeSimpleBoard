const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');
const template = require('./lib/template.js');
const path = require('path');
const sanitizeHtml = require('sanitize-html');


const app = http.createServer(function(request,response){
  const _url = request.url;
  const queryData = url.parse(_url, true).query;
  const pathname = url.parse(_url, true).pathname;
  const title = queryData.id;

  if(pathname === '/'){
    if(title === undefined){
      fs.readdir('./data', function(err, filelist){
        const title = 'Simple Board';
        const list = template.list(filelist);
        const html = template.mainHtml(title, list, '');
        response.writeHead(200);
        response.end(html);
      });
      
    } else {
      fs.readdir('./data', function(err, filelist){
        const filteredId = path.parse(queryData.id).base;
        fs.readFile(`data/${filteredId}`, `utf8`, function(err, description){
          const list = template.list(filelist);
          const sanitizeTitle = sanitizeHtml(title);
          const sanitizeDescription = sanitizeHtml(description, {
            allowedTags:['h1']
          });
          const html = template.html(sanitizeTitle, list, 
          `<div id = "text"><p>${sanitizeDescription}</p></div>`, 
          `<a href = "/update?id=${sanitizeTitle}">수정</a>
          <form action="delete_process" method="post">
            <input type="hidden" name="id" value="${sanitizeTitle}">
            <input type="submit" value="삭제">
          </form>`
          );
          response.writeHead(200);
          response.end(html);
        });
      });
    }
  } else if(pathname === '/write') {
    fs.readdir('./data', function(err, filelist){
      const title = 'WEB - write';
      const list = template.list(filelist);
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
      const title = post.title;
      const description = post.description;
      fs.writeFile(`data/${title}`, description, 'utf8', function(err){
        response.writeHead(302, {Location: `/?id=${encodeURI(title, description)}`});
        response.end();
      })
    });
  } else if(pathname ==='/update') {
    const filtereID = path.parse(title).base;
    fs.readdir('./data', function(err, filelist){
      fs.readFile(`data/${filtereID}`, 'utf8', function(err, description){
        const list = template.list(filelist);
        const html = template.html(title, list, 
          `<form action="/update_process" method="post">
            <input type="hidden" name="id" value="${title}">
            <p><input type="text" name="title" placeholder="제목" value="${title}"></p>
            <p>
              <textarea name="description" placeholder="내용">${description}</textarea>
            </p>
            <p>
              <input type="submit">
            </p>
          </form>
          `, 
          `<a href="/update?id=${title}">글수정</a>`);
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
        const id = post.id;
        const title = post.title;
        const description = post.description;
        fs.rename(`data/${id}`, `data/${title}`, function(error){
          fs.writeFile(`data/${title}`, description, 'utf8', function(err){
            response.writeHead(302, {Location: `/?id=${encodeURI(title, description)}`});
            response.end();
          })
        });
    });
  } else if(pathname === '/delete_process'){
    let body = '';
    request.on('data', function(data){
        body = body + data;
    });
    request.on('end', function(){
      const post = qs.parse(body);
      const id = post.id;
      const filteredId = path.parse(id).base;
      fs.unlink(`data/${filteredId}`, function(error){
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
