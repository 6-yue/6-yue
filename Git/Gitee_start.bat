@ echo off
::如果新创建一个仓库，
::然后把数据pull到本地
::首先获取仓库地址
set /p choice=输入仓库地址:
set /p mulu=输入工作目录：
md mulu
cd mulu
git init
git remote add origin %choice%

echo.>README.md
git add README.md 
git commit -m "first commit"
git push -u origin "master"

pause