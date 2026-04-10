---
title: 音乐空间1
layout: page
banner_img: https://img.friend8.online/2026/04/2fbb7f6dedf6df1f5d862edeea73298f.jpg
banner_img_height: 60
banner_mask_alpha: 0.5
index_img: https://img.friend8.online/2026/04/2fbb7f6dedf6df1f5d862edeea73298f.jpg
comments: true
---
11
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/aplayer/1.10.1/APlayer.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/aplayer/1.10.1/APlayer.min.js"></script>

<style>
  /* 保证 Banner 区域支持相对定位和溢出隐藏 */
  .banner {
    position: relative !important;
    overflow: hidden;
    transition: filter 0.3s ease;
  }
  
  /* 过渡层：实现毛玻璃 + 缩放的高级幻灯片效果 */
  .banner-transition-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    pointer-events: none;
    z-index: 5;
    opacity: 1;
    filter: blur(0px) scale(1);
    transition: all 3.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    will-change: opacity, filter, transform;
  }
  
  /* 当过渡层处于“退出”状态时，模糊+放大+淡出 (旧图远去效果) */
  .banner-transition-overlay.exit-effect {
    filter: blur(30px) scale(1.08);
    opacity: 0;
  }
  
  /* 保证 Banner 内的文字、遮罩等位于过渡层之上 */
  .banner .container, 
  .banner .banner-mask,
  .banner > *:not(.banner-transition-overlay) {
    position: relative;
    z-index: 10;
  }
  
  /* 播放器卡片美化 */
  #aplayer {
    margin: 30px auto;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 15px 30px -10px rgba(0, 0, 0, 0.3);
    max-width: 880px;
    background: rgba(0,0,0,0.3);
    backdrop-filter: blur(8px);
  }
  .aplayer {
    background: transparent !important;
    font-family: inherit;
  }
  .aplayer .aplayer-info {
    background: rgba(0,0,0,0.65) !important;
  }
  .aplayer .aplayer-pic {
    border-radius: 12px !important;
  }
  .aplayer .aplayer-lrc {
    background: rgba(0,0,0,0.6) !important;
    color: #f0f0f0;
  }
  .aplayer .aplayer-lrc p.aplayer-lrc-current {
    color: #7bcbff !important;
  }
  .aplayer-list ol li:hover {
    background: rgba(90, 150, 220, 0.3) !important;
  }
</style>

<div id="aplayer"></div>

<script>
  (function() {
    // ---------- 歌曲数据（可自由增删，无效 url 自动过滤）----------
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
      // 以下为占位示例（无真实链接会自动隐藏）
      { name: '夜曲', artist: '周杰伦', url: '', cover: '', lrc: '' },
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

    // ---------- 获取 Banner 并注入过渡层 ----------
    const banner = document.querySelector('.banner');
    if (!banner) {
      console.warn('未找到 .banner 元素，请检查主题');
      return;
    }
    if (getComputedStyle(banner).position === 'static') {
      banner.style.position = 'relative';
    }
    
    let overlay = banner.querySelector('.banner-transition-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'banner-transition-overlay';
      banner.appendChild(overlay);
    }
    
    // 初始化 Banner 背景
    banner.style.backgroundImage = `url("${DEFAULT_BANNER}")`;
    banner.style.backgroundSize = 'cover';
    banner.style.backgroundPosition = 'center';
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
      // 2. 移除可能残留的退出效果类，重置样式
      overlay.classList.remove('exit-effect');
      // 强制重绘，确保过渡层可见且无模糊
      void overlay.offsetHeight;
      
      // 3. 将 Banner 本身的背景更换为新图（此时被过渡层完全遮住）
      banner.style.backgroundImage = `url("${targetUrl}")`;
      
      // 4. 在下一帧添加退出效果类：触发 3.5 秒的模糊 + 放大 + 淡出动画
      requestAnimationFrame(() => {
        overlay.classList.add('exit-effect');
      });
      
      // 5. 动画结束后清理过渡层背景并重置标志
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
    
    // ---------- 初始化 APlayer ----------
    let ap;
    const container = document.getElementById('aplayer');
    if (!container) return;
    
    ap = new APlayer({
      container: container,
      autoplay: false,
      theme: '#3b82f6',
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
    
    // 监听列表切换（点击任意歌曲、上下曲）→ 更换 Banner
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

<!-- 如果希望尝试百叶窗效果，可将上述 switchBannerTo 替换为下方的备选代码（取消注释并注释原函数） -->
<!-- 
百叶窗效果（简单实现）：需要多个条状层，这里提供一个示意，由于复杂性较高且兼容性一般，建议使用上方毛玻璃缩放效果。
如需真正的百叶窗，可以使用 CSS Grid 或 flex 生成多个 div，通过动画控制每个条的 opacity/transform。但会显著增加代码量。
-->