@ echo off
::start
::这是把已有的仓库拉到本地
cls

set /p choice=输入仓库地址：
git init
git remote add origin %choice%
git pull

for /f "tokens=1-2 delims=/" %%a in ('git branch -r') do git checkout -b %%b %%a/%%b
git checkout master
pause
::goto start