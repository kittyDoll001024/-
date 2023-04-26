# 软件设置操作

## typora图床

默认我们的typora存储图片是保存到本地，那么如果换一台电脑或者本地图片删除掉，那么之前的图片将消失，我们可以使用图床的方式来将我们的图片保存到网络上，这样的话我们的图片将一直保存

### 阶段一：调整typora设置

1. 确保typora的版本在0.9.86以上

![image-20211022161413717](https://i.loli.net/2021/10/22/P2XgWzFjElKr6b5.png)

2. 打开typora，点开最上面的帮助，点击里面的检测更新，先升级一下版本，确保能用。

<img src="https://i.loli.net/2021/10/22/F9YGpmwbP8Zucs4.png" alt="image-20211022161440187" style="zoom: 67%;" />

3. 接着点开 最上面的文件，点倒数第二个**偏好设置**

<img src="C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20211022161513696.png" alt="image-20211022161513696" style="zoom: 67%;" />

4. 点击图像，按照图中设置

![img](https://pic3.zhimg.com/80/v2-2f7c965687ee0689ced4a80a608599be_720w.jpg)

5. 点击下载或更新

![img](https://pic4.zhimg.com/80/v2-7c8667baf9a9461fca921fd3ae797013_720w.jpg)

### 阶段二：注册smms，获取token

1. 复制下面这条链接，并注册账号

> https://sm.ms/home/apitoken

![img](https://pic3.zhimg.com/80/v2-7648d13050e5df30d974dcef84b90ef2_720w.jpg)

2. 登录你注册的账号（注意用户名是用户名，不是邮箱），接着复制下面的链接，再次访问

> https://sm.ms/home/apitoken

3. 然后，你就进入到这个页面

![image-20211022162150842](https://i.loli.net/2021/10/22/4Y6Mk9J2elK8VqF.png)

![image-20211022162209355](https://i.loli.net/2021/10/22/vGWbRrdiqIxthTN.png)

4. 回到你的typora，点击打开配置文件

![image-20211022162230448](https://i.loli.net/2021/10/22/cl25A9LUbteE73r.png)

5. 将下面代码复制粘贴到你的配置文件中。

   ```json
   {
     "picBed": {
       "current": "smms-user",
       "uploader": "smms-user",  // 代表当前的默认上传图床为 SM.MS,
       "smms-user": {
         "Authorization": "这里面的token换成你上个页面的申请的token"  //一定要换
       },
       "transformer": "path"
     },
     "picgoPlugins": {
       "picgo-plugin-smms-user": true  // 为插件预留
     }
   }
   ```
   
   