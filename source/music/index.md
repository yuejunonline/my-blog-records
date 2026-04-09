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
    transition: background-image 0.8s ease-in-out, filter 0.8s ease-in-out !important;
    background-size: cover !important;
    background-position: center !important;
  }
---

<div id="aplayer" style="margin: 20px auto; border-radius: 12px; overflow: hidden; box-shadow: 0 5px 15px rgba(0,0,0,0.1); max-width: 800px;"></div>

<script>
  // 🚀 核心：抢在播放器加载前拦截控制台
  (function() {
    const origLog = window.console.log;
    window.console.log = function(...args) {
      if (args[0] && typeof args[0] === 'string' && (args[0].includes('APlayer') || args[0].includes('v1.'))) {
        return; 
      }
      origLog.apply(window.console, args);
    };
  })();

  function initAPlayer() {
    if (typeof APlayer === 'undefined') {
      setTimeout(initAPlayer, 100);
      return;
    }

    const ap = new APlayer({
      container: document.getElementById('aplayer'),
      say: false,            // 官方关闭开关
      autoplay: true,        // 自动播放
      fixed: false,
      theme: '#12b7f5',
      loop: 'all',
      order: 'list',
      preload: 'auto',
      volume: 0.7,
      mutex: true,
      lrcType: 3,
      listFolded: false,
      listMaxHeight: '500px',
      audio: [
        {
          name: '蒲公英的约定',
          artist: '周杰伦',
          url: 'https://music.friend8.online/2026/04/56f71d09c684877d7ef94553721e3151.mp3',
          cover: 'https://img.friend8.online/2026/04/0c0785fdfd16d21333bd9ac9beb890f0.jpg',
          lrc: 'https://music.friend8.online/2026/04/d454818cd6c25162d26bb37e81bbd30b.lrc'
        },
        { name: '待添加歌曲2', artist: '歌手2', url: '', cover: '', lrc: '' },
        { name: '待添加歌曲3', artist: '歌手3', url: '', cover: '', lrc: '' },
        { name: '待添加歌曲4', artist: '歌手4', url: '', cover: '', lrc: '' },
        { name: '待添加歌曲5', artist: '歌手5', url: '', cover: '', lrc: '' },
        { name: '待添加歌曲6', artist: '歌手6', url: '', cover: '', lrc: '' },
        { name: '待添加歌曲7', artist: '歌手7', url: '', cover: '', lrc: '' },
        { name: '待添加歌曲8', artist: '歌手8', url: '', cover: '', lrc: '' },
        { name: '待添加歌曲9', artist: '歌手9', url: '', cover: '', lrc: '' },
        { name: '待添加歌曲10', artist: '歌手10', url: '', cover: '', lrc: '' }
      ]
    });

    const banner = document.querySelector('.banner'); 
    if (banner) {
      // 进站时：默认背景由 Fluid 设置，没有 filter 样式，是清晰的

      // 事件监听：一旦播放，开启模糊
      ap.on('play', () => {
        const currentCover = ap.list.audios[ap.list.index].cover;
        if (currentCover) {
          banner.style.backgroundImage = `url("${currentCover}")`;
          banner.style.filter = 'blur(20px)'; 
        }
      });

      // 切换歌曲：如果是切歌，持续应用模糊背景
      ap.on('listswitch', ({index}) => {
        const currentCover = ap.list.audios[index].cover;
        if (currentCover) {
          banner.style.backgroundImage = `url("${currentCover}")`;
          banner.style.filter = 'blur(20px)'; 
        }
      });
    }
  }
  
  initAPlayer();
</script>