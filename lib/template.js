module.exports = {
  html : function(title, list, body, control){
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
  },
  list : function(topics){
    let list = `<ul>`;
    let i = 0;
    while(i < topics.length){
      list = list + `
        <li>
          <div class="listWarp">
            <div class="listTitle">
              <a class="listCategory" href="http://">유머</a>
              <a class="listTitle" href="/?id=${topics[i].id}">${topics[i].title}</a>
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
  },
  mainHtml : function(title, list, body){
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
}