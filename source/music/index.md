---
title: 音乐空间
layout: page
banner_img: https://img.friend8.online/2026/04/2fbb7f6dedf6df1f5d862edeea73298f.jpg
banner_img_height: 60
banner_mask_alpha: 0.3
index_img: https://img.friend8.online/2026/04/2fbb7f6dedf6df1f5d862edeea73298f.jpg
comments: true
---

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/aplayer/1.10.1/APlayer.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/aplayer/1.10.1/APlayer.min.js"></script>

<style>
  /* 确保 Banner 区域支持过渡层绝对定位，但不干扰内部文字布局 */
  .banner {
    position: relative !important;
    overflow: hidden;
  }
  
  /* 过渡层：实现毛玻璃+缩放效果，z-index 保持最低，绝不遮盖标题 */
  .banner-transition-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover !important;
    background-position: center !important;
    background-repeat: no-repeat !important;
    pointer-events: none;
    z-index: 1;           /* 低于所有 Banner 原有内容（标题、遮罩等） */
    opacity: 1;
    filter: blur(0px) scale(1);
    transition: all 3.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    will-change: opacity, filter, transform;
  }
  
  /* 退出效果：模糊+放大+淡出 */
  .banner-transition-overlay.exit-effect {
    filter: blur(30px) scale(1.08);
    opacity: 0;
  }
  
  /* 关键：不再对 .banner .container 等做任何 position/z-index 覆盖，让主题原有样式生效 */
  /* 这样标题就会按照主题默认布局居中显示，不会跑到导航栏上方 */
  
  /* 播放器卡片样式（仅美化，不改变主题色） */
  #aplayer {
    margin: 30px auto;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    max-width: 800px;
  }
  /* 强制 APlayer 主题色为原本的 #12b7f5 */
  .aplayer .aplayer-info .aplayer-controller .aplayer-bar-wrap .aplayer-bar .aplayer-played {
    background-color: #12b7f5 !important;
  }
  .aplayer .aplayer-info .aplayer-controller .aplayer-time .aplayer-icon path {
    fill: #12b7f5 !important;
  }
  .aplayer .aplayer-list ol li.aplayer-list-light {
    background: #e9f5ff !important;
  }
  .aplayer .aplayer-list ol li.aplayer-list-light span {
    color: #12b7f5 !important;
  }
</style>

<div id="aplayer"></div>

<script>
  (function() {
    // ---------- 歌曲数据 ----------
    const rawSongs = [
      {
        name: '蒲公英的约定',
        artist: '周杰伦',
        url: 'https://music.friend8.online/2026/04/56f71d09c684877d7ef94553721e3151.mp3',
        cover: 'https://img.friend8.online/2026/04/0c0785fdfd16d21333bd9ac9beb890f0.jpg',
        lrc: 'https://music.friend8.online/2026/04/d454818cd6c25162d26bb37e81bbd30b.lrc'
      },
      {
        name: '杀死那个石家庄人',
        artist: '万能青年旅店',
        url: 'https://music.friend8.online/2026/04/4011136f4ea9c2fc8b591123a73a3b7a.mp3',
        cover: 'https://img.friend8.online/2026/04/cb5de8ccd54c90033a1cfb222718f0f1.jpg',
        lrc: ''
      },
      
      { name: 'Давай за',
        artist: '柳拜乐队',
        url: 'https://music.friend8.online/2026/04/b59e82ab925b1721e64df1cd79279708.mp3', 
        cover: 'https://img.friend8.online/2026/04/f6358dfd2393df34307939060e956a17.jpg', lrc: ''
      },
      // 占位歌曲（无真实链接会自动过滤）
      { name: '山海', artist: '草东没有派对', url: '', cover: '', lrc: '' },
      { name: '平凡之路', artist: '朴树', url: '', cover: '', lrc: '' }
    ];

    // 过滤有效歌曲
    const songs = rawSongs.filter(s => s.url && s.url.trim() !== '');
    if (songs.length === 0) {
      songs.push({
        name: '示例音乐',
        artist: 'Music Space',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        cover: 'https://picsum.photos/id/104/300/300',
        lrc: ''
      });
    }

    const DEFAULT_BANNER = 'https://img.friend8.online/2026/04/2fbb7f6dedf6df1f5d862edeea73298f.jpg';
    
    // 预加载封面
    songs.forEach(song => {
      if (song.cover && song.cover.trim()) {
        const img = new Image();
        img.src = song.cover;
      }
    });

    // ---------- 获取 Banner 并保留其原始背景样式 ----------
    const banner = document.querySelector('.banner');
    if (!banner) {
      console.warn('未找到 .banner 元素，请检查主题');
      return;
    }
    // 确保 Banner 为相对定位（用于过渡层绝对定位）
    if (getComputedStyle(banner).position === 'static') {
      banner.style.position = 'relative';
    }
    
    // 读取 Banner 当前的背景尺寸和位置（保证封面图与原图显示一致）
    let bgSize = getComputedStyle(banner).backgroundSize;
    let bgPosition = getComputedStyle(banner).backgroundPosition;
    if (bgSize === 'auto' || bgSize === 'auto auto') bgSize = 'cover';
    if (bgPosition === '0% 0%' || bgPosition === 'auto') bgPosition = 'center';
    
    // 创建过渡层
    let overlay = banner.querySelector('.banner-transition-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'banner-transition-overlay';
      banner.appendChild(overlay);
    }
    overlay.style.backgroundSize = bgSize;
    overlay.style.backgroundPosition = bgPosition;
    
    // 初始化 Banner 背景（使用 Front-matter 中的图片）
    banner.style.backgroundImage = `url("${DEFAULT_BANNER}")`;
    banner.style.backgroundSize = bgSize;
    banner.style.backgroundPosition = bgPosition;
    overlay.style.backgroundImage = 'none';
    overlay.classList.remove('exit-effect');
    
    let currentBg = DEFAULT_BANNER;
    let isSwitching = false;
    
    // ---------- 幻灯片切换（毛玻璃 + 缩放，时长 3.5 秒）----------
    function switchBannerTo(newImageUrl) {
      if (!newImageUrl || newImageUrl === currentBg) return;
      if (isSwitching) return;
      
      const targetUrl = newImageUrl.trim();
      isSwitching = true;
      
      // 1. 将过渡层背景设置为当前 Banner 正在显示的图片（旧图）
      overlay.style.backgroundImage = banner.style.backgroundImage;
      // 2. 移除退出效果类，重置状态
      overlay.classList.remove('exit-effect');
      // 强制重绘
      void overlay.offsetHeight;
      
      // 3. 更换 Banner 本身的背景为新图（此时被过渡层完全遮住）
      banner.style.backgroundImage = `url("${targetUrl}")`;
      
      // 4. 下一帧添加退出效果类：触发 3.5 秒的模糊 + 放大 + 淡出动画
      requestAnimationFrame(() => {
        overlay.classList.add('exit-effect');
      });
      
      // 5. 动画结束后清理过渡层背景
      const onFinish = () => {
        overlay.style.backgroundImage = '';
        overlay.classList.remove('exit-effect');
        isSwitching = false;
        currentBg = targetUrl;
        overlay.removeEventListener('transitionend', onFinish);
      };
      overlay.addEventListener('transitionend', onFinish);
      // 安全后备：3.6 秒后强制复位
      setTimeout(() => {
        if (isSwitching) {
          overlay.style.backgroundImage = '';
          overlay.classList.remove('exit-effect');
          isSwitching = false;
          currentBg = targetUrl;
        }
      }, 3600);
    }
    
    // ---------- 初始化 APlayer（主题色恢复 #12b7f5）----------
    let ap;
    const container = document.getElementById('aplayer');
    if (!container) return;
    
    ap = new APlayer({
      container: container,
      autoplay: false,
      theme: '#12b7f5',
      lrcType: 3,
      listMaxHeight: '450px',
      audio: songs.map(s => ({
        name: s.name,
        artist: s.artist,
        url: s.url,
        cover: (s.cover && s.cover.trim()) ? s.cover : DEFAULT_BANNER,
        lrc: s.lrc || ''
      }))
    });
    
    // 监听列表切换 → 更换 Banner 封面
    ap.on('listswitch', (data) => {
      if (data && data.index !== undefined && ap.list.audios[data.index]) {
        const newCover = ap.list.audios[data.index].cover;
        switchBannerTo(newCover || DEFAULT_BANNER);
      }
    });
    
    ap.on('play', () => {
      const idx = ap.list.index;
      const cover = ap.list.audios[idx].cover;
      if (cover) switchBannerTo(cover);
    });
    
    // 封面加载失败时替换默认图
    function fixBrokenCovers() {
      if (!ap) return;
      ap.list.audios.forEach((audio, idx) => {
        if (audio.cover && audio.cover !== DEFAULT_BANNER) {
          const testImg = new Image();
          testImg.onerror = () => {
            ap.list.audios[idx].cover = DEFAULT_BANNER;
            if (ap.list.index === idx) switchBannerTo(DEFAULT_BANNER);
            if (ap.template && ap.template.updateList) ap.template.updateList();
          };
          testImg.src = audio.cover;
        }
      });
    }
    setTimeout(fixBrokenCovers, 500);
  })();
</script>