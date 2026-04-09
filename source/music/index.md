---
title: 音乐空间
layout: page
banner_img: https://img.friend8.online/2026/04/2fbb7f6dedf6df1f5d862edeea73298f.jpg
banner_img_height: 60
banner_mask_alpha: 0.5
index_img: https://img.friend8.online/2026/04/2fbb7f6dedf6df1f5d862edeea73298f.jpg
comments: true
---

<link rel="stylesheet" href="https://music.friend8.online/APlayer.min.css">
<script src="https://music.friend8.online/APlayer.min.js"></script>

<div id="aplayer" style="margin: 20px auto; border-radius: 12px; overflow: hidden; box-shadow: 0 5px 15px rgba(0,0,0,0.1); max-width: 800px;"></div>

<script>
  const ap = new APlayer({
    container: document.getElementById('aplayer'),
    fixed: false,          // 不吸底
    autoplay: false,       // 不自动播放
    theme: '#12b7f5',      // 主题蓝
    loop: 'all',           // 全曲循环
    order: 'list',         // 顺序播放
    preload: 'auto',       
    volume: 0.7,           
    mutex: true,           
    lrcType: 3,            // 歌词文件模式
    listFolded: false,     // 默认展开列表
    listMaxHeight: '500px',
    audio: [
      {
        name: '蒲公英的约定',
        artist: '周杰伦',
        url: 'https://music.friend8.online/2026/04/56f71d09c684877d7ef94553721e3151.mp3',
        cover: 'https://img.friend8.online/2026/04/0c0785fdfd16d21333bd9ac9beb890f0.jpg',
        lrc: 'https://music.friend8.online/2026/04/d454818cd6c25162d26bb37e81bbd30b.lrc'
      },
      {
        name: '待添加歌曲2',
        artist: '歌手名',
        url: '', // 填入 R2 音乐链接
        cover: '', // 填入封面图链接
        lrc: ''   // 填入 .lrc 链接
      },
      {
        name: '待添加歌曲3',
        artist: '歌手名',
        url: '',
        cover: '',
        lrc: ''
      },
      {
        name: '待添加歌曲4',
        artist: '歌手名',
        url: '',
        cover: '',
        lrc: ''
      }
    ]
  });
</script>