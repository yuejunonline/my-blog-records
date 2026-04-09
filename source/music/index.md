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
  function initAPlayer() {
    if (typeof APlayer === 'undefined') {
      setTimeout(initAPlayer, 100);
      return;
    }

    const ap = new APlayer({
      container: document.getElementById('aplayer'),
      say: false,
      autoplay: true, // 保持开启，浏览器能放就放，不能放就等点击
      theme: '#12b7f5',
      lrcType: 3,
      listMaxHeight: '500px',
      audio: [
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
        { name: '待添加5', artist: '歌手5', url: '', cover: '', lrc: '' },
        { name: '待添加6', artist: '歌手6', url: '', cover: '', lrc: '' },
        { name: '待添加7', artist: '歌手7', url: '', cover: '', lrc: '' },
        { name: '待添加8', artist: '歌手8', url: '', cover: '', lrc: '' },
        { name: '待添加9', artist: '歌手9', url: '', cover: '', lrc: '' },
        { name: '待添加10', artist: '歌手10', url: '', cover: '', lrc: '' }
      ]
    });

    const banner = document.querySelector('.banner'); 
    if (banner) {
      // ✨ 核心逻辑：
      // 进站自动播放时（无论成功还是报错），我们都不去动背景。
      // 只有当用户执行了“切歌”动作，才开始变模糊。
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