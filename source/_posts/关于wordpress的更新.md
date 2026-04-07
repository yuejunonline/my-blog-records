---
title: 关于wordpress的更新
tags:
  - wordpress
  - 源码
id: '1893'
categories:
  - - 资源收集
date: 2021-12-06 19:11:00
---

wordpress一直是心中的痛~好用，又不好用~  
好用是主题多，插件多，功能强大~  
不好用是：无法更新，速度慢~

**无法更新，是因为 WordPress 默认的自动更新调用请求的 downloads.wordpress.org 服务器是在国外造成的，在国内自动升级 wordpress 的话会非常慢甚至超时失败。某位站长在国外服务器架设了一台代理服务器，可以直接拿来用，由于代理服务器限制了只能代理 wordpress.org 域名，使用完后请注释掉代码，以免影响 wordpress 使用。**

![](http://home.friend8.online:4080/wordpress/wp-content/uploads/2023/02/1818063473.png)

wp-config.php后面加代码~用完使用//注释掉即可~

```
 /* 配置代理 */
define('WP_PROXY_HOST', 'home.friend8.online');//代理服务器
define('WP_PROXY_PORT', '10809');//代理端口
define('WP_PROXY_USERNAME', '');//代理用户名（可选）
define('WP_PROXY_PASSWORD', '');//代理密码(可选）
define('WP_PROXY_BYPASS_HOSTS', 'localhost');//排除域名
```