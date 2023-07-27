/* メニューボタン*/
const btn = document.querySelector('.btn-menu');
const nav = document.querySelector('.main-nav');
btn.addEventListener('click',() => {
    nav.classList.toggle('open-menu');

    if(btn.innerHTML==='MENU'){
        btn.innerHTML='CLOSE';
    }else{
        btn.innerHTML='MENU';
    }
});

//言語切り替え
const languageSelector = document.getElementById('language-selector');
const currentLanguage = localStorage.getItem('language') || 'en';

languageSelector.value = currentLanguage;

languageSelector.addEventListener('change', (event) => {
  const selectedLanguage = event.target.value;
  localStorage.setItem('language', selectedLanguage);
  location.reload();
});

//new LuminousGallery(document.querySelectorAll(".grid-gallery"));

new LuminousGallery(document.querySelectorAll(".grid-gallery"),{},{
    caption:function(trigeer){
        return trigeer.querySelector('img').getAttribute('alt');
    }
});





AOS.init();

// スムーズスクロールを行う関数
function smoothScroll(target, duration) {
    var target = document.querySelector(target);
    var targetPosition = target.offsetTop;
    var startPosition = window.pageYOffset;
    var distance = targetPosition - startPosition;
    var startTime = null;
  
    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      var timeElapsed = currentTime - startTime;
      var run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }
  
    function ease(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    }
  
    requestAnimationFrame(animation);
  }

  
  // ナビゲーションのリンクにイベントを追加
  var links = document.querySelectorAll('a[href^="#"]');
  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function(e) {
      e.preventDefault();
      var href = this.getAttribute('href');
      smoothScroll(href, 1000);
    });
  }

/*----------------------------------------------------------------------------Blog */
  /* ユーザーが自由に幅を変える????????*/
const container = document.querySelector('.haba');
const left = document.querySelector('.kiri');
const right = document.querySelector('.news');
let isResizing = false;

container.addEventListener('mousedown', function(e) {
  // リサイズ中フラグを立てる
  isResizing = true;
  // マウスの位置を保存する
  const initialX = e.clientX;
  // リサイズ中にイベントが発生しないようにする
  container.style.userSelect = 'none';

  // リサイズ中にマウスが移動したら、要素の幅を変更する
  document.addEventListener('mousemove', resize);

  // マウスが離されたら、リサイズ中フラグを下げる
  container.addEventListener('mouseup', function() {
    isResizing = false;
    container.style.userSelect = 'auto';
    document.removeEventListener('mousemove', resize);
  });

  function resize(e) {
    if (isResizing) {
      const dx = e.clientX - initialX;
      const containerRect = container.getBoundingClientRect();
      const leftWidth = left.offsetWidth;
      const rightWidth = right.offsetWidth;
      const newLeftWidth = leftWidth + dx;
      const newRightWidth = rightWidth - dx;
      // 幅がマイナスにならないようにチェックする
      if (newLeftWidth > 0 && newRightWidth > 0) {
        left.style.width = `${newLeftWidth}px`;
        right.style.width = `${newRightWidth}px`;
      }
    }
  }
});


