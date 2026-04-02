// Hexo 自定义 R2 音乐标签插件
// 使用方法: {% r2_music "歌曲名" "歌手" "R2链接" "封面链接" %}

hexo.extend.tag.register('r2_music', function(args) {
  const name = args[0] || '未知歌曲';
  const artist = args[1] || '未知歌手';
  const url = args[2] || '';
  const cover = args[3] || 'https://p2.music.126.net/6y-p6mEqL1E6xej_UchW9w==/109951165034937231.jpg'; // 默认封面

  return `
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/aplayer/dist/APlayer.min.css">
    <script src="https://cdn.jsdelivr.net/npm/aplayer/dist/APlayer.min.js"></script>
    <div id="aplayer-${Math.random().toString(36).substr(2, 9)}" class="aplayer-r2-container" style="margin: 2rem 0;"></div>
    <script>
      var ap = new APlayer({
        container: document.lastChild.previousSibling, // 自动抓取上一个 div
        autoplay: true,
        mini: true, 
        fixed: true,
        theme: '#607d8b',
        loop: 'all',
        audio: [{
          name: '${name}',
          artist: '${artist}',
          url: '${url}',
          cover: '${cover}'
        }]
      });
    </script>
  `;
});