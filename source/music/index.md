---
title: 音乐空间
layout: page
---

<!-- 1. 引入你 R2 里的 APlayer 核心资源 -->
<link rel="stylesheet" href="https://music.friend8.online/APlayer.min.css">
<script src="https://music.friend8.online/APlayer.min.js"></script>

<!-- 2. 播放器容器 -->
<div id="aplayer" style="margin-top: 20px; border-radius: 12px; overflow: hidden; box-shadow: 0 5px 15px rgba(0,0,0,0.1);"></div>

<!-- 3. 播放器配置脚本 -->
<script>
  const ap = new APlayer({
    container: document.getElementById('aplayer'),
    fixed: false,          
    autoplay: false,       
    theme: '#12b7f5',      
    loop: 'all',           
    order: 'list',         
    preload: 'auto',       
    volume: 0.7,           
    mutex: true,           
    lrcType: 3,            // 使用外部 .lrc 文件
    audio: [
      {
        name: '蒲公英的约定',
        artist: '周杰伦',
        url: 'https://music.friend8.online/2026/04/56f71d09c684877d7ef94553721e3151.mp3',
        cover: 'https://img.friend8.online/2026/04/0c0785fdfd16d21333bd9ac9beb890f0.jpg',
        lrc: 'https://music.friend8.online/2026/04/d454818cd6c25162d26bb37e81bbd30b.lrc'
      },
      {
        name: '第二首歌名',
        artist: '歌手名字',
        url: 'https://music.friend8.online/你的歌曲2.mp3',
        cover: 'https://img.friend8.online/你的封面2.jpg',
        lrc: 'https://music.friend8.online/你的歌词2.lrc'
      },
      {
        name: '第三首歌名',
        artist: '歌手名字',
        url: 'https://music.friend8.online/你的歌曲3.mp3',
        cover: 'https://img.friend8.online/你的封面3.jpg',
        lrc: 'https://music.friend8.online/你的歌词3.lrc'
      }
      // 如果还有更多，直接在这里按照上面的格式继续添加即可
    ]
  });
</script>