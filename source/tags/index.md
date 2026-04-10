---
title: 标签
layout: tags
banner_img: https://img.friend8.online/2026/04/2fbb7f6dedf6df1f5d862edeea73298f.jpg
banner_img_height: 50
banner_mask_alpha: 0.5
header_style: |
  /* 1. 彻底抹除那个箭头所在的条状区域空间 */
  .scroll-down-bar {
    display: none !important;
    height: 0 !important;
  }

  /* 2. 强制锁定容器高度，并清除 Fluid 默认给标签页加的 Padding */
  .banner, .banner .full-bg-img {
    height: 50vh !important;
    min-height: 50vh !important;
    max-height: 50vh !important;
    padding-bottom: 0 !important;
  }

  /* 3. 修正白色面板 (Board) 的位置，确保它和分类页的衔接点一致 */
  #board {
    margin-top: -3rem !important;
  }
---