const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');

function templateHTML(title, list, body, control){
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css"/>
    <title>${title}</title>
  </head>
  <body>
    <nav id="navbar">
      <span>
        <span>
          <a href="/">자유게시판</a>
        </span>
        <span>
          <a href="http://*">이미지게시판</a>
        </span>
      </span>
      <span>
        <span>
          <a href="http://">회원가입 / 로그인</a>
        </span>
      </span>
    </nav>
    <head id="head">
      <a href="/"><h1>자유게시판</h1></a>
      <h2>자유롭게 사용할 수 있는 게시판 입니다.</h2>
    </head>
    <div id="write">
      <a href="/write">글쓰기</a>
    </div>
    <div id="list">
      <ul>
        <li>
            <a class="listCategory" href="http://">유머</a>
            <span class="listTitlep">${title}</span>
            <a class="listComent" href="http://">16</a>
        </li>
      </ul>
    </div>
      ${body}
      ${control}
    <div id="list">
      ${list}
    </div>
    <ul id="indexs">
      <a href="http://">1</a>
      <a href="http://">2</a>
      <a href="http://">3</a>
      <a href="http://">4</a>
    </ul>
  </body>
  </html>
  `;
}
function mainHTML(title, list, body){
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css"/>
    <title>${title}</title>
  </head>
  <body>
    <nav id="navbar">
      <span>
        <span>
          <a href="/">자유게시판</a>
        </span>
        <span>
          <a href="http://*">이미지게시판</a>
        </span>
      </span>
      <span>
        <span>
          <a href="http://">회원가입 / 로그인</a>
        </span>
      </span>
    </nav>
    <head id="head">
      <a href="/"><h1>자유게시판</h1></a>
      <h2>자유롭게 사용할 수 있는 게시판 입니다.</h2>
    </head>
    <div id="write">
      <a href="/write">글쓰기</a>
      ${body}
    </div>
    <div id="list">
      ${list}
    </div>
    <ul id="indexs">
      <a href="http://">1</a>
      <a href="http://">2</a>
      <a href="http://">3</a>
      <a href="http://">4</a>
    </ul>
  </body>
  </html>`;
}
function temlpateList(filelist){
  let list = `<ul>`;
  let i = 0;
  while(i < filelist.length){
    list = list + `
      <li>
        <div class="listWarp">
          <div class="listTitle">
            <a class="listCategory" href="http://">유머</a>
            <a class="listTitle" href="/?id=${filelist[i]}">${filelist[i]}</a>
            <a class="listComent" href="">16</a>
          </div>
          <div class="listInfo">
            <span class="infoPageViwe">조회수 - 1,323</span>
            <span class="infoDate">등록 - 21.04.07</span>
          </div>
        </div>
      </li>`
    i = i+1;
  }
  list = list+`</ul>`;
  return list;
}

const app = http.createServer(function(request,response){
  const _url = request.url;
  const queryData = url.parse(_url, true).query;
  const pathname = url.parse(_url, true).pathname;
  const title = queryData.id;

  if(pathname === '/'){
    if(title === undefined){
      fs.readdir('./data', function(err, filelist){
        const title = 'Simple Board';
        const list = temlpateList(filelist);
        const template = mainHTML(title, list, ``);
        response.writeHead(200);
        response.end(template);
      });
      
    } else {
      fs.readFile(`data/${title}`, `utf8`, function(err, description){
        fs.readdir('./data', function(err, filelist){
          const list = temlpateList(filelist);
          const template = templateHTML(title, list, 
          `<div id = "text"><p>${description}</p></div>`, 
          `<a href = "/update?id=${title}">수정</a>
          <form action="delete_process" method="post">
            <input type="hidden" name="id" value="${title}">
            <input type="submit" value="삭제">
          </form>`
          );
          response.writeHead(200);
          response.end(template);
        });
      });
    }
  } else if(pathname === '/write') {
    fs.readdir('./data', function(err, filelist){
      const title = 'WEB - write';
      const list = temlpateList(filelist);
      const template = mainHTML(title, list, `
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
      response.end(template);
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
    fs.readdir('./data', function(err, filelist){
      fs.readFile(`data/${title}`, 'utf8', function(err, description){
        const list = temlpateList(filelist);
        const template = templateHTML(title, list, 
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
        response.end(template);
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
        fs.unlink(`data/${id}`, function(err){
          response.writeHead(302, {Location: `/`});
          response.end();
        })
    });  
  } else {
    response.writeHead(404);
    response.end('Not found');
  }
});

app.listen(3000);
