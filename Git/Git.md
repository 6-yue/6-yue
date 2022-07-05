1. 创建远程的仓库(创建时，最后有复选框，勾选和不勾选将会导至两种关联方式)  `git@gitee.com:lius_6y/data.git`

   1. 当不勾选(创建了空仓库)
      1.  `mkdir 文件夹名`在本地创建项目文件夹
      2. `git init`初始化本地目录
      3. `touch 文件`保证文件夹内有文件
      4. `git add .`
      5. `git commit -m "备注"`
      6. `git remote add origin 仓库地址`(设置远程仓库地址，origin是仓库名)
      7. `git push -u origin "master"`(-u origin master设置默认推送)
      8. `git remote remove origin`断开远程连接
   2. 当勾选(创建非空仓库，或者说去到单位，单位已有项目)
      1. 进入到要存放项目的文件夹
      2. 在文件夹上打开命令行
      3. `git clone仓库地址(克隆/下载复制来的地址)`
      4. 不需要做任何配置，直接进行后续的开发

2. 开发

   1. 每完成一个功能或一个页面
   2. `git add .`
   3. `git commit -m  "备注"`
   4. `git push`

   **步骤234重复执行**

3. 分支

   1. `git branch`查看分支
   2. `git branch 分支名称`创建分支
   3. `git checkout 分支名`选择分支
   4. `git merge 要合并的分支名`先回到主分支`git checkout master`，然后合并分支

4. question

   1. git提交推送到远程出现 报错 The current branch bugfix/xxxx has no upstream branch.

      原因 没有和远方的仓库关联 （找不到家）推送不上去

      解决办法
      git push --set-upstream origin 分支名

      origin 是指定仓库

   2. 先删除远程 Git 仓库
      git git remote rm origin

   3. 拉取本地

- 对于error: failed to push some refsto‘远程仓库地址’
  1 使用如下命令

> git pull --rebase origin master

2 然后再进行上传:

> git push -u origin master
使用命令：

git checkout –b develop origin/develop


git远程仓库拉取dev分支，但是操作失败，提示操作出错。

```
fatal: 'origin/dev' is not a commit and a branch 'dev' cannot be created from it
1
```

1. 首先要确定你在远程仓库是否创建成功dev分支
2. `git branch -r`
3. 输入这个命令后查看远程所有的分支，检查你所需要下拉的分支是否已经在远程仓库底下。
4. 如果分支已经创立好了，而执行还是同样的错误，那么就需要从git上重新拉取数据然后再创建远程分支到本地
5. `git pull`
6. `git checkout -b 分支名 origin/分支名`
7. 如果你的远程分支仓库并未创建出来，那么你可以选择执行下面这条语句，在远程仓库创建你需要的分支

```
git push origin 分支名
1
```

创建完分支后再重复前面第一步操作检查是否创建成功，然后再重复第二步操作，从git上重新拉取数据然后再创建远程分支到本地，即可实现下拉远程新分支。