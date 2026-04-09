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
    /* ✨ 核心：将过渡时间延长至 3.5s，并使用更柔和的贝塞尔曲线 */
    transition: background-image 3.5s cubic-bezier(0.45, 0.05, 0.55, 0.95), filter 3.5s ease-in-out !important;
    background-size: cover !important;
    background-position: center !important;
  }
---

<script>
  (function() {
    var origLog = window.console.log;
    window.console.log = function() {
      if (arguments[0] && typeof arguments[0] === 'string' && (arguments[0].indexOf('APlayer') !== -1 || arguments[0].indexOf('%c') !== -1)) {
        return;
      }
      origLog.apply(window.console, arguments);
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
      },
      { name: '待添加2', artist: '歌手2', url: '', cover: '', lrc: '' },
      { name: '待添加3', artist: '歌手3', url: '', cover: '', lrc: '' },
      { name: '待添加4', artist: '歌手4', url: '', cover: '', lrc: '' },
      { name: '待添加5', artist: '歌手5', url: '', cover: '', lrc: '' }
    ];

    var validAudio = audioList.filter(function(item) {
      return item.url && item.url.trim() !== '';
    });

    var ap = new APlayer({
      container: document.getElementById('aplayer'),
      say: false,
      autoplay: false,
      theme: '#12b7f5',
      lrcType: 3,
      listMaxHeight: '500px',
      audio: validAudio
    });

    var banner = document.querySelector('.banner');
    if (banner) {
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