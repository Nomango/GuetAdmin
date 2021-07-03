#!/usr/bin/env bash

# 任意命令出错时终止运行
set -e

echo "打包dist..."
npm run build
echo "打包完成..."

echo "需要进行远程部署吗? (Y/n)"
read answer
if [ "$answer" != "" ] && [ "$answer" != "Y" ] && [ "$answer" != "y" ] ;then
  echo "本地打包完成!"
  exit 0
fi

if [ `git branch | grep gh-pages` ]
then
  git checkout gh-pages
  git pull --rebase origin main
else
  git checkout -b gh-pages
fi

git add .
git commit -m 'build project'
git push origin -u gh-pages

echo '\n'
echo '部署成功'