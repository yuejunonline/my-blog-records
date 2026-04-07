---
title: g3如何刷RADIO（.img）
tags:
  - HTC
  - 软件
id: '474'
categories:
  - - 生活点滴
date: 2011-06-19 16:53:28
---

关机，按返回+电源键进入HBOOT模式，USB连接至电脑。 1.首先下载压缩包[Fastboot工具包](\"http://paolu.8866.org/wp-content/uploads/2011/06/Fastboot工具包.rar\")，放置到C盘的根目录下； 2.将下载的，需要的RADIO的IMG文件改名为radio.img（这主要是为了下面输入命令时好输入）； 3.将radio.img放置到C盘的fanseboot文件夹中； 4.将手机重启至HBOOT，至FASTBOOT，用数据线连接至电脑，如果出现FASTBOOT USB说明连接成功了，如果没有连接成功，那么请重新连接或检查你的驱动，或重新下载HTC SYNC同步安装； 5.点击PC右下角，点击\\"运行\\"，输入\\"cmd\\",出现DOS窗口（win7 需要右击cmd，选择以管理员运行）； 6.输入：“cd C:fastboot” 然后回车，这是让我们找到fastboot所在文件夹； 7.输入：\\"fastboot devices\\" 然后回车  这是验证手机和PC是否正常连接，如果出现HT\*\*\*\*  fastboot 证明连接成功，反之，查看返回第4步查看设备连接问题； 8.输入：\\"fastboot flash radio radio.img\\" 然后回车，这是要求刷入radio.img文件； 屏幕会依次出现：send \\'radio\\'...<\*\*\*KB> 这代表正在将文件从PC发送至设备，手机的右上角会有绿色柱体的上下运动，如果出现OKAY，代表发送成功。如果出现“FAILED <status read failed\*\*\*>”代表失败，请再输入fastboot flash radio radio.img继续；发送成功后：屏幕会出现\\"Writing \\'radio\\'...\\" 直至出现OKAY，到这其实已经完全成功刷入。 9.输入：\\"fastboot reboot-bootloader\\" 然后回车，这时屏幕会暗，等一下，屏幕亮了，在HBOOT看下，RADIO是不是变成新的。重启手机吧。 1、什么是Fastboot？ Fastboot是在Hboot中实现的一个和手机进行通讯的协议。通过fastboot协议你可以通过电脑端的fastboot程序和手机的HBOOT进行通讯，包括刷机等等功能。 2、怎么进入Fastboot模式？ 在G3上进入Fastboot的模式方法是按住返回键+开机键 3、什么是HBOOT模式？ HBOOT模式是HTC实现的一种内部的刷机方式，在刚HBOOT模式的时候会自动的检查内存卡根目录下面是否有特定文件名的文件，如果有，就进入相应的功能，比如进入调试模式，如果内存卡下面是 特定的刷机包的名字，那么就会进行刷机。 4、什么是ADB？ ADB的全称是Android Debug Bridge，Android调试桥，是一个上层的调试工具。只有在内核通过HBOOT引导启动后才能跑起来。