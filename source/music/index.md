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

<script>
  // 🛡️ 拦截 APlayer 控制台 Logo 输出（放最前面）
  (function() {
    const origLog = window.console.log;
    window.console.log = function(...args) {
      if (args[0] && typeof args[0] === 'string' && 
          (args[0].includes('APlayer') || args[0].includes('v1.'))) {
        return; 
      }
      origLog.apply(window.console, args);
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

    // 记录是否是“第一次切换”的变量
    let isFirstPlay = true;

    const ap = new APlayer({
      container: document.getElementById('aplayer'),
      say: false,
      autoplay: true, 
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
      // 1. 进站自动播放时，我们不监听 play 事件来改背景
      // 2. 只有当用户点击列表切歌，或者第一首播完自动跳下一首时触发
      ap.on('listswitch', ({index}) => {
        // 只要发生了列表切换，说明不再是初始的第一首歌状态
        isFirstPlay = false; 
        
        const currentCover = ap.list.audios[index].cover;
        if (currentCover) {
          banner.style.backgroundImage = `url("${currentCover}")`;
          banner.style.filter = 'blur(20px)'; 
        }
      });

      // 如果你希望用户“手动点击”第一首歌的播放按钮也要变模糊，可以保留这个判断：
      ap.on('play', () => {
        // 如果不是进站后的第一次（即通过切换触发的），或者你想让手动点击第一首也生效
        // 这里我们选择：除非切歌，否则不改背景
      });
    }
  }
  
  initAPlayer();
</script>