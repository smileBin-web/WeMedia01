Dear WeMedia01 team !

this test project is build depending Umijs [more about Umijs][1]

#### 安装环境

安装 yarn

```js
$ npm i yarn tyarn -g
$ tyarn -v
```
安装 umi

```js
$ yarn global add umi
$ umi -v
```
如果提示 umi: command not found，你需要将 yarn global bin 路径配置到环境变量中，方法如下：

```js
# mac 系统:
$ sudo vi ~/.bash_profile
# 在 .bash_profile 中添加下面一行：
export PATH="$PATH:`yarn global bin`"

# windows系统:
# 获取 global bin 的路径
$ yarn global bin
C:\Users\Administrator\AppData\Local\Yarn\bin
# 复制上面的 global bin 的路径，添加到系统环境变量 PATH。
```

#### 安装依赖
```js
$ yarn
```

启动本地服务器

```js
umi dev
```
open browser on http://localhost:8000

#### welcome to provide precious suggestion

[1]:https://umijs.org/zh/ "umi官网"

# Think you !