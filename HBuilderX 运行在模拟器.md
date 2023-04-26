# 在HbuliderX中写uni-app程序运行在模拟器上（演示模拟器为逍遥模拟器）

### 一、下载: [HBuilderX下载地址](https://www.dcloud.io/hbuilderx.html)

1.  下载完成后找到自己 `HBuilderX` 安装位置下的 `adb.exe` 并复制路径

![image-20220914140125707](https://s2.loli.net/2022/12/09/TRsN6M5wC8zgd7c.png)

2.  接下来配置环境变量（演示机为 windows10）

![image-20220914140209576](https://s2.loli.net/2022/12/09/6dmk2TIaM8WAeqB.png)

![image-20220914140233203](https://s2.loli.net/2022/12/09/2hGzDvwHtXd6sCI.png)

![image-20220914140341513](https://s2.loli.net/2022/12/09/5awboYzevJ9jN87.png)

![image-20220914140412340](https://s2.loli.net/2022/12/09/TpO7nkuQtc6qY5F.png)

![image-20220914140447338](https://s2.loli.net/2022/12/09/49rai8lPByC3zSf.png)

3.  新建后把复制的 `adb.exe` 路径填进去；一路确定退出来

### 二、运行 `cmd`

 查看 `adb` 的版本（是否能够使用）

- adb version 查看 adb 的版本（测试是否能使用）
- adb devices 使用 adb命令 查看 连接的设备（List of devices attached 设备列表）

![image-20220914140918974](https://s2.loli.net/2022/12/09/YB8sjFepyWgZn2c.png)

下面运行我们 `HBuilderX` 编辑器；首先先安装一个插件

![image-20220914141150837](https://s2.loli.net/2022/12/09/G4zepy2OWkZNxDf.png)

![image-20220914141219257](https://s2.loli.net/2022/12/09/Sr8Ad7wZb1uIzyY.png)

接下来安装模拟器（我用的逍遥模拟器）

下载地址：[逍遥安卓模拟器](http://www.xyaz.cn/)

无脑安装就完了

找到模拟器安装位置 `cmd` 就完了

![image-20220914141734563](https://s2.loli.net/2022/12/09/ikMAEtXKZWGHJC3.png)

接着执行上面的命令行

![image-20220914141857023](https://s2.loli.net/2022/12/09/1wSzDuZf5ECJFTi.png)

如果没有显示端口号 `21503` 

- 一种就是没有启动模拟器
- 还有就是可能没检测到；总之重新打开就完了

开始配置 `HBuilderX` 运行配置

![image-20220914142202654](https://s2.loli.net/2022/12/09/tapdobcvEQ3UqgR.png)

![image-20220914142241479](https://s2.loli.net/2022/12/09/tH2517lxoNYrnJp.png)

adb路径：

找到模拟器安装位置，文件下找到 `adb.exe` 

![image-20220914142423353](https://s2.loli.net/2022/12/09/vTKuR8pSfEBxDbH.png)

端口号就是我们 `cmd` 检测出的那个端口号 `21503` (端口号为固定的)

开始运行吧

![image-20220914142619208](https://s2.loli.net/2022/12/09/s83DOHzSrZY5kPN.png)

这一步可能需要等待一会

![image-20220914142640707](https://s2.loli.net/2022/12/09/qABtE8opXr132sm.png)

![image-20220914142718713](https://s2.loli.net/2022/12/09/mdYS4GDzbWICLi1.png)

这样就运行完成了