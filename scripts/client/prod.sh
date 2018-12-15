#!/usr/bin/env sh
# 添加sh文件之后一定要修改文件权限

webpack --mode production --module-bind js=eslint-loader!babel-loader