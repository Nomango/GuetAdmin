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
    echo "Branch named gh-pages already exists"
else
  git checkout -b gh-pages
fi

git add -f dist
git commit -m 'build project'
git subtree push --prefix dist origin gh-pages

echo '\n'
echo '部署成功'