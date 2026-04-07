---
title: 群晖Docker默认网络模式bridge和host的区别
tags:
  - 源码
  - 群晖
id: '1898'
categories:
  - - 资源收集
date: 2021-01-06 19:15:00
---

1.  **host模式：**众所周知，Docker使用了Linux的Namespaces技术来进行资源隔离，如PID Namespace隔离进程，Mount Namespace隔离文件系统，Network Namespace隔离网络等。一个Network Namespace提供了一份独立的网络环境，包括网卡、路由、Iptable规则等都与其他的Network Namespace隔离。一个Docker容器一般会分配一个独立的Network Namespace。但如果启动容器的时候使用host模式，那么这个容器将不会获得一个独立的Network Namespace，而是和宿主机共用一个Network Namespace。容器将不会虚拟出自己的网卡，配置自己的IP等，而是使用宿主机的IP和端口，Docker Container可以和宿主机一样，使用宿主机的eth0，实现和外界的通信。换言之，Docker Container的IP地址即为宿主机eth0的IP地址。
2.  **bridge模式：**bridge模式是Docker默认的网络设置，此模式会为每一个容器分配Network Namespace、设置IP等，并将一个主机上的Docker容器连接到一个虚拟网桥上。Brdige桥接模式为Docker Container创建独立的网络栈，保证容器内的进程组使用独立的网络环境，实现容器间、容器与宿主机之间的网络栈隔离。另外，Docker通过宿主机上的网桥(docker0)来连通容器内部的网络栈与宿主机的网络栈，实现容器与宿主机乃至外界的网络通信。
3.  **bridge-host模式：**群晖Docker默认网络模式是bridge和host，这里手动添加第三种bridge-host模式。

Bridge:docker容器内部虚拟网桥，容器内部172.17.0.X网段，无法获取主机网络ip，访问容器需要映射端口，并且不能和主机占用端口冲突，不映射端口无法使用。  
Host：容器绑定到主机网卡使用主机的ip 并且不能和主机占用端口冲突，使用哪些端口自动占用。  
bridge-host：通过主机的虚拟网卡来创建虚拟网桥，将容器的网卡绑定到这个直通局域网的虚拟网桥上，它的优点是容器获取到局域网ip，容器ip和群晖主机一个网段，端口1-65535全端口使用 不和主机冲突并且容易ip可手动指定，可以说bridge-host模式就是把容器都桥接到你群晖所在的局域网。

*   群晖Docker设置bridge-host模式教程
    
    *   1、打开群晖控制面板 ——网络——网络界面——管理——Open vSwitch设置
    
    *   2、群晖控制面板——终端机和SNMP——开启SSH功能

![](http://home.friend8.online:4080/wordpress/wp-content/uploads/2023/02/2059795181.png)

3、用putty工具SSH登录进群晖并切换到root账户

```
//群晖切换root账户sudo -i
```

4、执行创建网络命令，指令根据自己的IP网段修改，我的IP网段为192.168.0.X，网关地址为192.168.0.1,根据自己的情况修改。

```
//执行创建网络命令docker network create -d macvlan --subnet=192.168.0.0/24 --gateway=192.168.0.1 -o parent=ovs_eth0 bridge-host
```

5、创建容器方法，网络可以在群晖docker面板——网络——里面修改

![](http://home.friend8.online:4080/wordpress/wp-content/uploads/2023/02/2906363548.png)

注意：如果创建Docker容器的时候使用bridge-host网络模式，并不手动指定IP的话，默认会从192.168.x.2,192.168.x.3排列下去。

6、我们也可以手动指定容器的IP。  
7、删除刚才创建的网络？？？