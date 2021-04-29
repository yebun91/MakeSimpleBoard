const express = require('express')
const app = express()
const port = 3000
const template = require('./lib/template.js');
const qs = require('querystring');
app.use(express.static('public'));
const mysql = require('mysql');
const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '7895',
  database : 'myboard'
});
db.connect();

/*------구성-------*/
app.get('/', (request, response) => {
  db.query(`select * from topic`, function(err, topics){
    const title = 'Simple Board';
    const list = template.list(topics);
    const html = template.mainHtml(title, list, ``);
    response.send(html);
  })
})
app.get('/page/:pageId', (request, response) => {
  db.query(`select * from topic`, function(err, topics){
    if(err){
      throw err;
    }
    db.query(`SELECT * FROM topic LEFT JOIN author ON 
      topic.author_id=author.id WHERE topic.id=?`,[request.params.pageId], function(err2, topic){
      if(err2){
        throw err2;
      }
      const title = topic[0].title;
      const description = topic[0].description;
      const list = template.list(topics);
      const html = template.html(title, list, 
        /*`<div id = "text"><p>${description}</p><p>by ${topic[0].name}</p></div>`, 글쓴 사람도 표시해줌*/ 
        `<div id = "text"><p>${description}</p></div>`, 
        `<div class = "text_modify">
          <a href = "/update/${request.params.pageId}">수정</a>
          <form action="/delete_process" method="post">
            <input type="hidden" name="id" value="${request.params.pageId}">
            <input type="submit" value="삭제">
          </form>
        </div>`);
      response.send(html);
    })
  });
});
app.get('/write', (request, response) => {
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
    response.send(html);
  });
});
app.post('/write_process', (request, response) => {
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
});
app.get('/update/:pageId', (request, response) => {
  db.query('SELECT * FROM topic', function(error, topics){
    if(error){
      throw error;
    }
    db.query(`SELECT * FROM topic WHERE id=?`,[request.params.pageId], function(error2, topic){
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
      response.send(html);
    });
  });
});
app.post('/update_process', (request, response) => {
  let body = '';
  request.on('data', function(data){
      body = body + data;
  });
  request.on('end', function(){
      const post = qs.parse(body);
      db.query(`update topic set title=?, description=?, author_id=1 where id=?`, 
        [post.title, post.description, post.id],
        function(err, result){
          response.redirect('/?id=${post.id}');
      });
  });
});
app.post('/delete_process', (request, response) => {
  let body = '';
    request.on('data', function(data){
        body = body + data;
    });
    request.on('end', function(){
      const post = qs.parse(body);
      db.query(`DELETE FROM topic WHERE id = ?`, [post.id], function(error, result){
        if(error){
          throw error;
        }
        response.redirect('/');
      });
    });
});

/*------연결------*/
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
