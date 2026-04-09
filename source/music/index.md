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
    /* ✨ 3.5秒极速丝滑过渡 */
    transition: background-image 3.5s cubic-bezier(0.45, 0.05, 0.55, 0.95), filter 3.5s ease-in-out !important;
    background-size: cover !important;
    background-position: center !important;
  }
---

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
      autoplay: false, // 手动播放，保持逻辑纯洁
      theme: '#12b7f5',
      lrcType: 3,
      listMaxHeight: '500px',
      audio: audioList
    });

    var banner = document.querySelector('.banner');
    if (banner) {
      // 播放时变模糊 (10px) 并换图
      ap.on('play', function() {
        var currentCover = ap.list.audios[ap.list.index].cover;
        if (currentCover) {
          banner.style.backgroundImage = 'url("' + currentCover + '")';
          banner.style.filter = 'blur(10px)'; 
        }
      });

      // 切换歌曲时，背景图 3.5s 慢速替换
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