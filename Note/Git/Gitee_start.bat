@ echo off
::����´���һ���ֿ⣬
::Ȼ�������pull������
::���Ȼ�ȡ�ֿ��ַ
set /p choice=����ֿ��ַ:
set /p mulu=���빤��Ŀ¼��
md mulu
cd mulu
git init
git remote add origin %choice%

echo.>README.md
git add README.md 
git commit -m "first commit"
git push -u origin "master"

pause