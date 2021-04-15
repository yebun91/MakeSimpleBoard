module.exports = {
  HTML:function(title, list, body, control){
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="./style.css"/>
      <title>${title}</title>
    </head>
    </body>
      <navbav id="navbar">
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
      </navbav>
        <head id="head">
          <h1>자유게시판</h1>
          <h2>자유롭게 사용할 수 있는 게시판 입니다.</h2>
        </head>
        <div id="write">
          <a href="http://">글쓰기</a>
        </div>
        ${list}
        ${control}
        ${body}
      </body>
      </html>
    `;
  }, list:function(filelist){
    var list = '<ul>';
    var i = 0;
    while(i < filelist.length){
      list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
      i = i + 1;
    }
    list = list+'</ul>';
    return list;
  }
}