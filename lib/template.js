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
      <style>
        :root {
          /* color */
          --background-color: #e7e7e7;
          --sideBackground-color: #dee6f5;
          --black-color: #2b2f36;
          --semiBlack-color: #595f68;
          --blue-color: #5d7adb;
          --yellow-color: #ffb727;
        
          /* font size */
          --font-large: 48px;
          --font-medium: 18px;
          --font-small: 16px;
          --font-micro: 14px;
        
          /* font weight */
          --weight-bold: 700;
          --weight-regular: 400;
        }
        
        h1 {
          font-size: var(--font-large);
          font-weight: var(--weight-bold);
          color: var(--black-color);
          margin-bottom: 0;
        }
        
        h2 {
          font-size: var(--font-micro);
          font-weight: var(--weight-regular);
          color: var(--semiBlack-color);
        }
        
        p {
          font-size: var(--font-small);
          font-weight: var(--weight-regular);
          color: var(--black-color);
        }
        
        a {
          color: var(--black-color);
          text-decoration: none;
        }
        a:visited {
          color: var(--semiBlack-color);
          text-decoration: none;
        }
        a:hover {
          color: var(--blue-color);
          text-decoration: none;
        }
        ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        li {
          padding: 15px;
          border-bottom: 1px solid var(--blue-color);
        }
        li:hover {
          background-color: var(--sideBackground-color);
          transition: all 150ms cubic-bezier(0.59, 0, 0.49, 0.99);
        }
        
        /* 본문설정 */
        
        body {
          width: 850px;
          margin: 0 auto;
          text-align: center;
        }
        #navbar {
          display: flex;
          justify-content: space-between;
          padding: 20px 0;
        }
        #write {
          text-align: right;
          padding-bottom: 20px;
        }
        #list {
          text-align: left;
          border-top: 1px solid var(--blue-color);
        }
        #indexs {
          width: auto;
          display: flex;
          justify-content: center;
          margin: 20px 0;
        }
        #indexs * {
          padding: 0 20px;
        }
        #text p{
          text-align: left;
          padding: 15px;
          margin: 0;
        }
        .listCategory {
          font-weight: var(--weight-bold);
        }
        .listComent {
          color: var(--yellow-color);
          font-size: var(--font-micro);
        }
        .infoDate {
          color: var(--semiBlack-color);
          font-size: var(--font-micro);
        }
        .infoPageViwe {
          color: var(--semiBlack-color);
          font-size: var(--font-micro);
          padding-right: 15px;
        }
        .text_modify {
          padding: 15px;
          display: flex;
          justify-content: center;
        }
        .text_modify *{
          margin: 0 10px;
        }
        .delete *{
          border: none;
          padding : 0;
          text-decoration: none;
          font-size: var(--font-small);
          cursor: pointer;
          background-color: #ffffff;
        }
        .update_submit{
          width: 32px;
          border: none;
          padding : 0;
          text-decoration: none;
          font-size: var(--font-small);
          cursor: pointer;
          background-color: #ffffff;
        }
        .delete :hover{
          color: var(--blue-color);
        }
      </style>
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
              <a class="listTitle" href="/page/${topics[i].id}">${topics[i].title}</a>
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
      <link rel="stylesheet" href="./style.css"/>
      <style>
        :root {
          /* color */
          --background-color: #e7e7e7;
          --sideBackground-color: #dee6f5;
          --black-color: #2b2f36;
          --semiBlack-color: #595f68;
          --blue-color: #5d7adb;
          --yellow-color: #ffb727;
        
          /* font size */
          --font-large: 48px;
          --font-medium: 18px;
          --font-small: 16px;
          --font-micro: 14px;
        
          /* font weight */
          --weight-bold: 700;
          --weight-regular: 400;
        }
        
        h1 {
          font-size: var(--font-large);
          font-weight: var(--weight-bold);
          color: var(--black-color);
          margin-bottom: 0;
        }
        
        h2 {
          font-size: var(--font-micro);
          font-weight: var(--weight-regular);
          color: var(--semiBlack-color);
        }
        
        p {
          font-size: var(--font-small);
          font-weight: var(--weight-regular);
          color: var(--black-color);
        }
        
        a {
          color: var(--black-color);
          text-decoration: none;
        }
        a:visited {
          color: var(--semiBlack-color);
          text-decoration: none;
        }
        a:hover {
          color: var(--blue-color);
          text-decoration: none;
        }
        ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        li {
          padding: 15px;
          border-bottom: 1px solid var(--blue-color);
        }
        li:hover {
          background-color: var(--sideBackground-color);
          transition: all 150ms cubic-bezier(0.59, 0, 0.49, 0.99);
        }
        
        /* 본문설정 */
        
        body {
          width: 850px;
          margin: 0 auto;
          text-align: center;
        }
        #navbar {
          display: flex;
          justify-content: space-between;
          padding: 20px 0;
        }
        #write {
          text-align: right;
          padding-bottom: 20px;
        }
        #list {
          text-align: left;
          border-top: 1px solid var(--blue-color);
        }
        #indexs {
          width: auto;
          display: flex;
          justify-content: center;
          margin: 20px 0;
        }
        #indexs * {
          padding: 0 20px;
        }
        .listCategory {
          font-weight: var(--weight-bold);
        }
        .listComent {
          color: var(--yellow-color);
          font-size: var(--font-micro);
        }
        .infoDate {
          color: var(--semiBlack-color);
          font-size: var(--font-micro);
        }
        .infoPageViwe {
          color: var(--semiBlack-color);
          font-size: var(--font-micro);
          padding-right: 15px;
        }
      </style>
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