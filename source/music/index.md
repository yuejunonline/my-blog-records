
---
title: 音乐空间
layout: page
banner_img: https://img.friend8.online/2026/04/2fbb7f6dedf6df1f5d862edeea73298f.jpg
banner_img_height: 60
banner_mask_alpha: 0.5  # <--- 在这里添加，0.5 表示 50% 的黑色遮罩
index_img: https://img.friend8.online/2026/04/2fbb7f6dedf6df1f5d862edeea73298f.jpg
---


<link rel="stylesheet" href="https://music.friend8.online/APlayer.min.css">
<script src="https://music.friend8.online/APlayer.min.js"></script>

<div id="aplayer" style="margin: 25px auto; max-width: 850px; border-radius: 15px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.15);"></div>

<script>
  const ap = new APlayer({
    container: document.getElementById('aplayer'),
    fixed: false,          // 不吸底，留在页面内容区
    autoplay: false,       // 自动播放建议关闭，尊重用户
    theme: '#12b7f5',      // 播放器主题色
    loop: 'all',           // 全曲循环
    order: 'list',         // 列表顺序播放
    preload: 'auto',       // 预加载
    volume: 0.7,           // 默认音量
    mutex: true,           // 多个播放器互斥
    lrcType: 3,            // 使用外部歌词文件
    listFolded: false,     // 默认不折叠歌单，让音乐空间显得充实
    listMaxHeight: '500px', // 歌单最大高度，超出可滚动
    audio: [
      {
        name: '蒲公英的约定',
        artist: '周杰伦',
        url: 'https://music.friend8.online/2026/04/56f71d09c684877d7ef94553721e3151.mp3',
        cover: 'https://img.friend8.online/2026/04/0c0785fdfd16d21333bd9ac9beb890f0.jpg',
        lrc: 'https://music.friend8.online/2026/04/d454818cd6c25162d26bb37e81bbd30b.lrc'
      },
      {
        name: '这里填第二首歌名',
        artist: '歌手名',
        url: 'https://music.friend8.online/这里填音乐文件名.mp3',
        cover: 'https://img.friend8.online/这里填封面图文件名.jpg',
        lrc: 'https://music.friend8.online/这里填歌词文件名.lrc'
      },
      {
        name: '这里填第三首歌名',
        artist: '歌手名',
        url: 'https://music.friend8.online/这里填音乐文件名.mp3',
        cover: 'https://img.friend8.online/这里填封面图文件名.jpg',
        lrc: 'https://music.friend8.online/这里填歌词文件名.lrc'
      },
      {
        name: '待添加歌曲',
        artist: '待添加歌手',
        url: '',
        cover: '',
        lrc: ''
      }
      /* 💡 小贴士：
      如果要继续添加，只需要在上面花括号 } 后面加一个逗号 , 
      然后粘贴以下模板：
      {
        name: '歌名',
        artist: '歌手',
        url: '链接',
        cover: '封面链接',
        lrc: '歌词链接'
      }
      */
    ]
  });

  // 增加一个贴心的小功能：在控制台输出当前播放信息
  ap.on('play', function () {
    console.log('正在播放：' + ap.list.audios[ap.list.index].name);
  });
</script>