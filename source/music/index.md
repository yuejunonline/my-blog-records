---
title: 音乐空间
layout: page
banner_img: https://img.friend8.online/2026/04/2fbb7f6dedf6df1f5d862edeea73298f.jpg
banner_img_height: 60
banner_mask_alpha: 0.5
index_img: https://img.friend8.online/2026/04/2fbb7f6dedf6df1f5d862edeea73298f.jpg
comments: true
header_style: |
  .banner {
    /* ✨ 3.5秒丝滑慢动作过渡 */
    transition: background-image 3.5s cubic-bezier(0.45, 0.05, 0.55, 0.95), filter 3.5s ease-in-out !important;
    background-size: cover !important;
    background-position: center !important;
  }
---

<script>
  /* 🛡️ 强力净化控制台：拦截所有报错、广告和警告 */
  (function() {
    var origLog = window.console.log;
    var origWarn = window.console.warn;
    var origError = window.console.error;

    // 拦截 APlayer Logo 广告
    window.console.log = function() {
      if (arguments[0] && typeof arguments[0] === 'string' && (arguments[0].indexOf('APlayer') !== -1 || arguments[0].indexOf('%c') !== -1)) return;
      origLog.apply(window.console, arguments);
    };
    
    // 拦截 浏览器自动播放警告
    window.console.warn = function() {
      if (arguments[0] && typeof arguments[0] === 'string' && arguments[0].indexOf('play()') !== -1) return;
      origWarn.apply(window.console, arguments);
    };

    // 拦截 在线环境 Cloudflare 网络报错
    window.console.error = function() {
      if (arguments[0] && typeof arguments[0] === 'string' && arguments[0].indexOf('cloudflare') !== -1) return;
      if (arguments[0] && typeof arguments[0] === 'string' && arguments[0].indexOf('ERR_SSL_PROTOCOL_ERROR') !== -1) return;
      origError.apply(window.console, arguments);
    };
  })();
</script>

<div id="aplayer" style="margin: 20px auto; border-radius: 12px; overflow: hidden; box-shadow: 0 5px 15px rgba(0,0,0,0.1); max-width: 800px;"></div>

<script>
  function initAPlayer() {
    if (typeof APlayer === 'undefined') {
      setTimeout(initAPlayer, 100);
      return;
    }

    var audioList = [
      {
        name: '蒲公英的约定',
        artist: '周杰伦',
        url: 'https://music.friend8.online/2026/04/56f71d09c684877d7ef94553721e3151.mp3',
        cover: 'https://img.friend8.online/2026/04/0c0785fdfd16d21333bd9ac9beb890f0.jpg',
        lrc: 'https://music.friend8.online/2026/04/d454818cd6c25162d26bb37e81bbd30b.lrc'
      }
    ];

    var ap = new APlayer({
      container: document.getElementById('aplayer'),
      say: false,
      autoplay: false, // 彻底关闭自动播放，追求纯净
      theme: '#12b7f5',
      lrcType: 3,
      listMaxHeight: '500px',
      audio: audioList
    });

    var banner = document.querySelector('.banner');
    if (banner) {
      // 只有点击播放时，才触发 3.5s 慢动作变模糊换图
      ap.on('play', function() {
        var currentCover = ap.list.audios[ap.list.index].cover;
        if (currentCover) {
          banner.style.backgroundImage = 'url("' + currentCover + '")';
          banner.style.filter = 'blur(10px)'; 
        }
      });

      ap.on('listswitch', function(data) {
        var currentCover = ap.list.audios[data.index].cover;
        if (currentCover) {
          banner.style.backgroundImage = 'url("' + currentCover + '")';
        }
      });
    }
  }
  initAPlayer();
</script>