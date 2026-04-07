---
title: Docker 中的容器需要自动启动
tags:
  - Docker
  - 代码
id: '1889'
categories:
  - - 资源收集
date: 2021-12-06 19:05:00
---

在阿里云做了一个子域名解析，群晖中的docker下了一个脚本。保证子域名能解析到正确的IP地址。用了1年多，还算稳定。今日发现无法登录了，幸亏群晖中还添加了一个DDNS地址，ping了下通着~登录上去看了下，原来阿里云域名脚本容器关闭了。查了日志没有发现如何关闭的。先想办法开启自动重启容器吧。  
telnet登群晖

创建容器时，设置自动启动容器

```
docker run --restart=always 容器id（或者容器名称）
```

如果创建时未指定 --restart=always ,可通过update 命令设置

```
docker update --restart=always 容器id（或者容器名称）
```

再用用看看效果吧。