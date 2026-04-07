---
title: discuz6.1加个精华帖子盖章
tags:
  - 源码
id: '36'
categories:
  - - 生活点滴
date: 2008-07-03 06:12:30
---

呵呵，给[![\"\"](\"http://bbs.xi-an.cn/images/PinkDresser/logo.gif\")](\"http://bbs.xi-an.cn/index.php\" "\"长安社区\"")加上了个精华帖子盖章![\"\"](\"http://paoluftp.s122.288idc.com/blog/upload/ding_1.gif\")，挺好玩的。

怕自己吧改动方法忘记了。所以记到小博里里来。

修改方法：

第一步：

上传附件的三张图片到论坛目录images中

第二步：

打开模板文件 templatesdefaultviewthread.htm

查找代码：

<!–{if $post\[\\'subject\\'\]}–>  
       <h2>$post\[subject\]</h2>  
      <!–{/if}–>

在上面加上

  
<!–{if $thread\[\\'digest\\'\]}–><!–{if $page==1}–>  

  
![\"一级精华贴\"](\"images/ding_1.gif\")  
![\"二级精华贴\"](\"images/ding_2.gif\")  
![\"三级精华贴\"](\"images/ding_3.gif\")  

  <!–{/if}–><!–{/if}–>

第三步: 更新缓存即可

[给精华帖盖章\_【三级精华图片不同】.rar](\"http://paoluftp.s122.288idc.com/blog/upload/给精华帖盖章_【三级精华图片不同】.rar\")