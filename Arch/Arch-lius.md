#### 验证UEFI

ls /sys/firmware/efi/efivars

#### 禁用Reflector

systemctl stop refector.service

#### 配置网络

1. 如果网卡被禁用，执行：rfkill unblock all
2. 输入iwctl进行wifi连接界面
3. device list 查看当前网卡设备
4. station <device> scan 扫描wifi设备
5. station <device> get-networks 显示当前可连接网络
6. station <device> connect <wifi name> 连接wifi
7. password: 根据提示输入密码
8. quit 退出wifi连接界面
9. ping www.baidu.com 测试网络是否连接成功

#### 更新系统时间

1. timedatectl set-ntp true 同步时间
2. timedatectl status 查看系统时间状态

#### 换源

1. vim /etc/pacman.d/mirrorlist
2. Server = https://mirrors.ustc.edu.cn/archlinux/$repo/os/$arch 中科大-源
3. Server = https://repo.huaweicloud.com/archlinux/$repo/os/$arch 华为-源
4. Server = http://mirrors.aliyun.com/archlinux/$repo/os/$arch 阿里云-源

#### 更新软件包

1. pacman -Syy

#### 硬盘分区

1. 单系统
   1. /boot分区 不少于512M
   2. /分区不小于30G
   3. swap分区等于或二倍于真实内存
   4. 其他的分给/home分区
2. 双系统
   1. 执行gdisk可以查看当前硬盘结构
   2. 如果 /dev/sda是要分区的硬盘
   3. 执行 gdisk /dev/sda
   4. 双系统的话，不需要单独设置 /boot分区，直接挂载到windows的boot分区上
   5. 其他的按单系统的进行操作

#### 格式化

1. mkfs.ext4 /dev/sda(x) 此处的x代替 /分区和/home分区
2. mkswap /dev/sda(x) 此处的x代替 swap分区
3. 如果是单系统，执行 mkfs.vfat /dev/sda(x) 此处的x代替/boot分区

#### 挂载分区

1. mount /dev/sda(x) /mnt 此处的x代替根分区
2. mkdir /mnt/boot
3. mount /dev/sda(x) /mnt/boot 此处的x代替/boot分区
   1. 单系统挂载新创建的boot分区
   2. 双系统挂载windows的boot分区
4. mkdir /mnt/home
5. mount /dev/sda(x) /mnt/home 此处的x代替/home分区
6. swapon /dev/sda(x) 此处的x代替swap分区

#### 安装系统

1. ```javascript
   // 必须的基础包
   pacstrap /mnt base base-devel linux linux-headers linux-firmware #base-devel在AUR包的安装是必须的
   // 必须的功能性软件
   pacstrap /mnt dhcpcd vim bash-completion networkmanager  #一个有线所需(iwd也需要dhcpcd) 一个无线所需 一个编辑器 一个补全工具
   ```

#### 生成文件系统表

1. genfstab -U /mnt >> /mnt/etc/fstab
2. 查看是否生成
3. cat /mnt/etc/fstab

#### 进入安装的系统

1. arch-chroot /mnt

#### 设置时区

1. ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
2. 同步硬件时钟
3. hwclock --systohc

#### 本地化

1. vim /etc/locale.gen
2. 取消以下注释
   1. en_US.UTF-8
   2. zh_CN.UTF-8
   3. zh_CN.GB18030 GB18030  
   4. zh_CN.GBK GBK  
   5. zh_CN.UTF-8 UTF-8  
   6. zh_CN GB2312 
3. echo "LANG=en_US.UTF-8" >> /etc/locale.conf

#### 主机名配置

1. 这里可以换成自己想要的名字
2. echo "ArchLinux" >> /etc/hostname

#### 生成对应hosts

1. 将 下面hostname换成自己的主机名，与 /etc/hostname 里面的名字一样

2. ```js
   vim /etc/hosts // 写入以下内容
   127.0.0.1  localhost
   ::1  localhost
   127.0.1.1 hostname
   ```

#### 设置root密码

1. passwd root
2. 或则直接 passwd

#### 安装微码

1. amd 电脑安装
2. pacman -S amd-ucode
3. intel 电脑安装
4. pacman -S intel-ucode

#### 配置grub

1. Arch使用grub2管理引导，安装相关程序
2. pacman -S grub efibootmgr efivar os-prober

#### 安装引导

1. grub-install --target=x86_64-efi --efi-directory=/boot --bootloader-id=Arch --recheck
2. --bootloader-id=name  其中 name 可以更改为自己想要的名称，建议简短明确

#### 双系统引导

1. 注：grub2默认禁用了 os-prober ，如果你是选择的双系统或多系统安装，需要手动开启该选项，os-prober 可以检查其他硬盘上的其他系统引导，如果不开启，可能无法识别其他系统，如果你是全盘单系统安装，可以忽略这个选项
2. 需要开启 os-prober 执行下面命令
3. echo "GRUB_DISABLE_OS_PROBER=false" >> /etc/default/grub

#### 生成引导配置文件

1. grub-mkconfig -o /boot/grub/grub.cfg
2. 如果出现错误，请回头检查命令是否输入错误或者配置是否出错，安装时的一点错误都可能成为你无法开机的原因或者以后使用时的bug。
3. 如果检查没有问题，那么我们就可以进行最后的一点设置了。

#### 配置开机启动项

1. ArchLinux 使用 systemd 管理后台服务，我们希望开机之后自动连接网络，所以需要下载联网程序并设置开机自启动：
2. 下载wifi 管理
3. pacman -S dhcpcd iwd networkmanager
4. 设置开机自启动
5. systemmctl enable dhcpcd
6. systemctl enable iwd
7. systemctl enable NetworkManager

#### 结束(a half)

1. 到了这里，ArchLinux的安装也就到了尾声，接下来你只需要退出安装程序，然后取消挂载分区，重启选择Arch系统就可以进入ArchLinux了
2. 退出arch root 安装环境
3. exit
4. 取消挂载
5. umount -R /mnt
6. 重启
7. reboot

#### 新建用户

1. 开机之后会显示一个终端的登陆界面，由于我们刚才安装时没有新建用户，默认只有一个root用户，所以我们直接使用 root 和 root 密码登录。

2. 运行以下命令新建用户

3. useradd -m -G wheel -s /bin/bash <username>

4. <username> 为你自己的用户名，登录用，注意用户名必须全小写

5. 设置用户密码

6. passwd <username>

7. <username> 为用户名

8. 赋予用户 sudo 权限，就是给普通用户大哥的令牌，可以临时使用 root 权限

9. ```js
   vim /etc/sudoers
   --------------------
   # 找到
   # Uncomment to allow members of group wheel to execute any command
   # %wheel ALL=(ALL) ALL
   # 上面这两行，然后输入 i 进入编辑模式，删掉 %wheel行前的 "#" 号
   # 删除后如下：
   # Uncomment to allow members of group wheel to execute any command
   %wheel ALL=(ALL) ALL
   
   # 保存退出
   ESC
   :wq
   ```

#### 字体安装

1. sudo pacman -S ttf-hannom noto-fonts noto-fonts-extra noto-fonts-emoji noto-fonts-cjk adobe-source-code-pro-fonts adobe-source-sans-fonts adobe-source-serif-fonts adobe-source-han-sans-cn-fonts adobe-source-han-sans-hk-fonts adobe-source-han-sans-tw-fonts adobe-source-han-serif-cn-fonts adobe-source-han-serif-tw-fonts wqy-zenhei wqy-microhei wqy-microhei-lite

#### 桌面环境

1. 根据wiki说明，kde依赖 xorg ，先安装 xorg软件包

2. sudo pacman -S xorg xorg-server

3. ```js
   # 最小化安装
   sudo pacman -S plasma-meta kde-application-meta sddm
   # 疯狂全家桶安装
   sudo pacman -S plasma kde-application sddm
   ```

4. ```js
   # 常用软件的安装
   sudo pacman -S konsole alacritty dolphin ark gwenview lolcat sl neofetch
   # konsole 和 alacritty 都是终端
   # dolphin 是文件管理器
   # ark 是归档管理器，就是解压缩的
   # gwenview 是看图片的
   # lolcat neofetch 和 sl 是防止你打开终端没事干(选)
   # sl | lolcat(选)
   # neofetch | lolcat(选)
   ```

5. 设置sddm开机自启

6. sudo systemctl enable sddm

#### 驱动

1. 显卡
   1. AMD：pacman -S xf86-video-amdgpu xf86-video-ati mesa vulkan-radeon
   2. Intel：pacman -S xf86-video-intel vulkan-intel mesa
   3. NVIDIA：
      1. pacman -S nvidia nvidia-settings nvidia-utils
      2. yay -S optimus-manager
      3. yay -S optimus-manager-qt
2. 声卡
   1. sudo pacman -S alsa-utils pulseaudio pulseaudio-bluetooth cups
3. 触摸板
   1. sudo pacman -S xf86-input-synaptics
4. 蓝牙
   1. sudo pacman -S bluez bluez-utils bluedevil
   2. sudo systemctl enable --now bluetooth.service

#### 安装结束

```js
# 重启
sudo reboot
# 立刻关机
sudo shutdown now
```

#### 开启32位库

1. vim /etc/pacman.conf

2. ```js
   # 找到下面两行，删除前面的注释#
   [multilib]
   Include = /etc/pacman.d/mirrorlist
   ```

#### 配置archlinuxcn

1. vim /etc/pacman.conf

2. ```js
   [archlinuxcn]
   Server = https://mirrors.ustc.edu.cn/archlinuxcn/$arch
   ```

3. sudo pacman -Syyu

4. sudo pacman -S archlinuxcn-keyring

5. 如果报错

6. ```js
   pacman -Syu haveged
   systemctl start haveged
   systemctl enable haveged
   
   rm -fr /etc/pacman.d/gnupg
   pacman-key --init
   pacman-key --populate manjaro
   pacman-key --populate archlinux
   pacman-key --populate archlinuxcn
   
   sudo pacman -Syy
   sudo pacman -S archlinuxcn-keyring
   
   ```

7. sudo pacman -S yay

#### 安装开发工具

##### vscode

1. yay -S visual-studio-code-bin

##### code-css

1. sudo pacman -S code

2. Code-OSS安装之后无法连接到插件商店解决方案

3. arch打包的Code-OSS默认不使用官方市场，可以手动修改`/usr/lib/code/product.json`使用官方市场，**修改**这个字段：

4. ```js
   "extensionsGallery": {
         "serviceUrl": "https://marketplace.visualstudio.com/_apis/public/gallery",
         "cacheUrl": "https://vscode.blob.core.windows.net/gallery/index",
         "itemUrl": "https://marketplace.visualstudio.com/items"
   }
   ```

##### fcitx

1. sudo pacman -S fcitx5 fcitx5-im fcitx5-chinese-addons

2. vim /etc/environment 写入以下内容

3. ```js
   GTK_IM_MODULE=fcitx
   QT_IM_MODULE=fcitx
   XMODIFIERS=@im=fcitx
   INPUT_METHOD=fcitx
   SDL_IM_MODULE=fcitx
   GLFW_IM_MODULE=ibus
   
   ```

4. 在启动菜单中找到fcitx,点击启动，并进行配置

##### typora

1. yay -Ss typora

2. 找到需要的版本并进行安装

3. ```js
   aur/typora-free-cn 0.11.18-2 (+0 0.00) (已安装)
       typora历史旧版本，中国下载地址构建。
   aur/typoratio-git 1.0.r1.gd03e51e-1 (+0 0.00) 
       A tool that calculates typographical ratios.
   aur/typora-free 0.11.18-2 (+19 2.37) 
       A minimal markdown editor and reader.
   aur/typora 1.2.4-1 (+122 1.69) 
       A minimal markdown editor and reader.
   archlinuxcn/typora 1.2.4-1 (72.7 MiB 226.1 MiB) 
       A minimal markdown editor and reader.
   
   ```

4. 以上图，执行 yay -S typora-free-cn 进行安装

##### NodeJs

1. sudo pacman -Ss nodejs-lts

2. ```js
   community/nodejs-lts-erbium 12.22.12-2
       Evented I/O for V8 javascript (LTS release: Erbium)
   community/nodejs-lts-fermium 14.19.3-1
       Evented I/O for V8 javascript (LTS release: Fermium)
   community/nodejs-lts-gallium 16.15.0-1 [已安装]
       Evented I/O for V8 javascript (LTS release: Gallium)
   ```
   
   ```js
   安装vue脚手架
   yarn global add @vue/cli
   ```
   
   
   
3. 如上图，执行 sudo pacman -S nodejs-lts-gallium npm yarn 进行安装

4. 如果要使用vue,则还需要执行 npm install -g @vue/cli 进行安装

##### Git

1. sudo pacman -S openssh 如果需要本地推送到远程，需要安装 ssh

2. ```js
   $ git config --global user.name "Element"
   $ git config --global user.email Element@vip.com
   ```

3. 公钥的相关配置参考官方文档即可

4. 使用方法

   1. git remote add origin 'URL' 本地与远程建立连接
   2. git remote remove origin 删除本地与远程的连接
   3. git push -f origin 覆盖上传
   4. git push -u origin 正常上传


##### 网易云

1. sudo pacman -S netease-cloud-music

2. 修改字体太小解决方案

3. 去修改：  vim  /opt/netease/netease-cloud-music/netease-cloud-music.bash 

4. 修改后（最后一行中加入一段配置 **-force-device-scale-factor=1.6** ）：

5. ```js
   #!/bin/sh
   HERE="$(dirname "$(readlink -f "${0}")")"
   export LD_LIBRARY_PATH="${HERE}"/libs
   export QT_PLUGIN_PATH="${HERE}"/plugins
   export QT_QPA_PLATFORM_PLUGIN_PATH="${HERE}"/plugins/platforms
   exec "${HERE}"/netease-cloud-music -force-device-scale-factor=1.6  $@
   ```

##### 浏览器

1. sudo pacman -S chromium
   1. 修改为百度搜索引擎
   2. 设置->搜索引擎->管理搜索引擎和网站搜索->添加
   3. 搜索引擎 -> 百度
   4. 快捷字词 -> baidu
   5. 网址格式（用“%s”代替搜索字词）-> `https://www.baidu.com/#ie={inputEncoding}&wd=%s`
   6. 点"**添加**"按钮，就可以添加百度搜索引擎。


##### 腾讯会议

1. yay -S wemeet-bin

##### OBS

1. sudo pacman -S obs-studio

##### lux-dl

1. yay lux-dl

2. ```js
   3 aur/lux-dl-bin 0.15.0-1 (+0 0.00) 
       Fast and simple video download library and CLI tool written in Go
   2 aur/lux-dl 0.15.0-1 (+4 0.00) (已安装)
       Fast and simple video download library and CLI tool written in Go
   1 archlinuxcn/lux-dl 0.15.0-1 (4.9 MiB 16.7 MiB) (已安装)
       Fast and simple video download library and CLI tool written in Go
   ==> 要安装的包 (示例: 1 2 3, 1-3 或 ^4)
   ```

3. ```js
   出现上述情况:
   yay -S lux-dl
   ```

##### wps

```js
yay -S wps-office-cn wps-office-mui-zh-cn ttf-wps-fonts
```

##### pip

```js
// 安装pip
sudo pacman -S python-pip
// 安装django python开发web
// 临时换源安装
sudo pip install -i https://pypi.tuna.tsinghua.edu.cn/simple django
```

```js
// 使用 django-admin 来创建 HelloWorld 项目：
django-admin startproject HelloWorld
// 进入项目，运行项目
cd HelloWorld
python manage.py runserver || python3 manage.py runserver 0.0.0.0:8000
// 运行项目报错，执行下述命令
python manage.py migrate
```

```js
// 设为默认

// 升级 pip 到最新的版本 (>=10.0.0) 后进行配置：

python -m pip install --upgrade pip
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple

// 如果您到 pip 默认源的网络连接较差，临时使用本镜像站来升级 pip：

python -m pip install -i https://pypi.tuna.tsinghua.edu.cn/simple --upgrade pip
```

##### 迅雷

```js
yay xunlei-bin
```

gnome-boxes

```js
sudo pacman -S gnome-boxes
```

##### 微信开发者工具

```js
yay wechat-devtool
```

##### 截图工具

```js
sudo pacman -S flameshot
```

##### qumu

```js
lscpu
zgrep CONFIG_KVM /proc/config.gz
#安装套件(仅适用于Manjaro / Arch Linux)
sudo pacman -S qemu \
libvirt \
virt-manager \
virt-viewer \
archlinux-keyring \
ebtables \
dnsmasq \
bridge-utils \
openbsd-netcat \
edk2-ovmf
#调整权限
sudo vim /etc/polkit-1/rules.d/50-libvirt.rules
填入以下内容：
/* Allow users in kvm group to manage the libvirt
daemon without authentication */
polkit.addRule(function(action, subject) {
 if (action.id == "org.libvirt.unix.manage" &&
  subject.isInGroup("kvm")) {
   return polkit.Result.YES;
 }
});

#调整权限 & 设定服务自动启动
sudo usermod -a -G kvm $(whoami)
sudo systemctl enable libvirtd.service
sudo systemctl start libvirtd.service
sudo systemctl start virtlogd.service
```

#### 忘记密码

1. 重新启动或打开Arch服务器系统。默认情况下，将首先选择第一个栏目
2. 通过按‘e’键盘上的来更改启动项来中断启动过程。
3. 在下一步中，向下滚动并找到以以下内容开头的行：
4. linux / boot / vmlinuz-linux
5. 使用箭头键导航到该行的结尾(以结束)quiet。接下来，init =/bin/bash 附加参数
6. 接下来，按下ctrl + x组合键以进入单用户模式，并安装具有只读 (ro)访问权限的根文件系统。
7. 我们需要重新安装与根文件系统的读取和写入权限。
8. ＃mount -n -o remount，rw /
9. 现在，您可以继续使用passwd命令重置root密码。
10. ＃passwd
11. 指定新的root密码并确认。如果一切顺利，您将获得看到：
12. “password updated successfully”。
13. 最后，运行以下命令以保存更改并启动ArchLinux。
14. ＃exec / sbin / init
15. 就是这样！如您所见，这是一个简单明了的过程。现在，您应该可以轻松重置服务器的root密码，以防万一您忘记了它。

#### 调整CPU

```js
使用 cpupower 需要提前进行安装
sudo pacman -S cpupower
cpupower 是一组为辅助 CPU 调频而设计的用户空间工具。linux内核支持调节CPU主频，降低功耗，已到达节能的效果。对于移动设备和笔记本来说，在没有接通电源的时候，续航是很重要的。

通过选择系统空闲状态不同的电源管理策略，可以实现不同程度降低服务器功耗。但是，更低的功耗策略意味着 CPU 唤醒更慢对性能影响更大。对于对时延和性能要求高的应用。

对于服务器，一般都是接着电源的，而且要求性能比较高，因此，建议关闭 CPU 的动态调节功能，禁止 CPU 休眠，并把 CPU 频率固定到最高。

一般在服务器 BIOS 中修改电源管理为 Performance，如果发现 CPU 模式为 conservative 或者 powersave，可以使用 cpupower 设置 CPU Performance 模式，效果也是相当显著的。

语法格式：cpupower [参数]

常用参数：

参考实例

查看当前生效的策略:

[root@lmlphp.com ~]# cat /sys/devices/system/cpu/cpu0/cpufreq/scaling_governor
powersave

查看当前CPU频率：

[root@lmlphp.com ~]# cat /sys/devices/system/cpu/cpu0/cpufreq/scaling_cur_freq
900022

查看当前所有CPU的信息：

[root@lmlphp.com ~]# cpupower -c all frequency-info

设置所有CPU为性能模式：

[root@lmlphp.com ~]# cpupower -c all frequency-set -g performance

设置所有CPU为节能模式：

[root@lmlphp.com ~]# cpupower -c all frequency-set -g powersave

查看频率信息：

[root@lmlphp.com ~]# cpupower frequency-info

cpupower设置performance：

[root@lmlphp.com ~]# cpupower frequency-set -g performance
```
