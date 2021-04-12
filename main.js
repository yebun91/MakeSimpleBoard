module.exports = {
  HTML:function(title, list, body, control){
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="style.css"/>
        <title>Simple Board</title>
      </head>
      <body>
        <nav id="navbar">
          <span>
            <span>
              <a href="http://*">자유게시판</a>
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
          <h1>자유게시판</h1>
          <h2>자유롭게 사용할 수 있는 게시판 입니다.</h2>
        </head>
        <div id="write">
          <a href="http://">글쓰기</a>
        </div>
        <div id="list">
          <ul>
            <li>
              <div class="listWarp">
                <div class="listTitle">
                  <a class="listCategory" href="http://">유머</a>
                  <a class="listTitle" href="http://">오늘 본 고양이 사진 올린다.</a>
                  <a class="listComent" href="http://">16</a>
                </div>
                <div class="listInfo">
                  <span class="infoPageViwe">조회수 - 1,323</span>
                  <span class="infoDate">등록 - 21.04.07</span>
                </div>
              </div>
            </li>
            <li>
              <div class="listWarp">
                <div class="listTitle">
                  <a class="listCategory" href="http://">유머</a>
                  <a class="listTitle" href="http://">승은이가 어제 보내준 사진인데 완전 웃김 ㅋㅋㅋㅋ</a>
                  <a class="listComent" href="http://">43</a>
                </div>
                <div class="listInfo">
                  <span class="infoPageViwe">조회수 - 2,341</span>
                  <span class="infoDate">등록 - 21.04.07</span>
                </div>
              </div>
            </li>
            <li>
              <div class="listWarp">
                <div class="listTitle">
                  <a class="listCategory" href="http://">잡담</a>
                  <a class="listTitle" href="http://">지금 카펜데 노트북 써야 하는데 콘센트가 안보인다 어떡하지</a>
                  <a class="listComent" href="http://">132</a>
                </div>
                <div class="listInfo">
                  <span class="infoPageViwe">조회수 - 13,859</span>
                  <span class="infoDate">등록 - 21.04.07</span>
                </div>
              </div>
            </li>
            <li>
              <div class="listWarp">
                <div class="listTitle">
                  <a class="listCategory" href="http://">잡담</a>
                  <a class="listTitle" href="http://">나에게 남겨진 배터리 시간은 4시간.. 생각보다 충분한 것 같은걸?</a>
                  <a class="listComent" href="http://">29</a>
                </div>
                <div class="listInfo">
                  <span class="infoPageViwe">조회수 - 851</span>
                  <span class="infoDate">등록 - 21.04.07</span>
                </div>
              </div>
            </li>
            <li>
              <div class="listWarp">
                <div class="listTitle">
                  <a class="listCategory" href="http://">잡담</a>
                  <a class="listTitle" href="http://">요즘 밀크티가 맛있는데 추천좀</a>
                  <a class="listComent" href="http://">352</a>
                </div>
                <div class="listInfo">
                  <span class="infoPageViwe">조회수 - 864</span>
                  <span class="infoDate">등록 - 21.04.07</span>
                </div>
              </div>
            </li>
            <li>
              <div class="listWarp">
                <div class="listTitle">
                  <a class="listCategory" href="http://">잡담</a>
                  <a class="listTitle" href="http://">두둠칫두둠칫</a>
                  <a class="listComent" href="http://">13</a>
                </div>
                <div class="listInfo">
                  <span class="infoPageViwe">조회수 - 153</span>
                  <span class="infoDate">등록 - 21.04.07</span>
                </div>
              </div>
            </li>
            <li>
              <div class="listWarp">
                <div class="listTitle">
                  <a class="listCategory" href="http://">잡담</a>
                  <a class="listTitle" href="http://">텔레포트 기능 구현좀</a>
                  <a class="listComent" href="http://">158</a>
                </div>
                <div class="listInfo">
                  <span class="infoPageViwe">조회수 - 13,521</span>
                  <span class="infoDate">등록 - 21.04.07</span>
                </div>
              </div>
            </li>
          </ul>
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