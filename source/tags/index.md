---
title: 标签
layout: tags
banner_img: https://img.friend8.online/2026/04/2fbb7f6dedf6df1f5d862edeea73298f.jpg
banner_img_height: 50
banner_mask_alpha: 0.5
header_style: |
  /* 强制锁定 Banner 容器高度 */
  .banner, .banner .mask {
    height: 50vh !important;
    min-height: 50vh !important;
    max-height: 50vh !important;
  }
  /* 解决内部文字居中导致的偏移 */
  .banner .full-bg-img {
    padding: 0 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
  }
---