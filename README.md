# 项目介绍

会封装一个组件.

## 42，组件封装

### 1，配置工作

要开发的是组件，不是web工程，要进行一些改造，

1. 在`build\webpack.base.config.js`中，
- 将入口文件抽离了出去，因为开发环境和生产 环境，需要不同的入口，
- 指定输入文件名，也就是这个库的文件名
- `HtmlWebpackPlugin`从公共配置中，提取了出来，放到了开发配置中，

2. 在`build\webpack.dev.config.js`中，
- 指定了入口文件
- 添加了 `HtmlWebpackPlugin`，因为只有开发环境需要一个页面进行调试。

3. 在`build\webpack.pro.config.js`中，
- 指定了入口文件
- 输出时，打包为 umd 模块
```
module.exports = {
    entry: './src/main.ts',
    output: {
        // 打包为 umd 模块（全局环境，会挂载在window下），库名为 EmployeeQuery
        libraryTarget: 'umd',
        library: 'EmployeeQuery'
    },
    // 这个插件，可以在打包时，剔除 vue 的源码
    externals: [nodeExternals()],
    plugins: [
        new CleanWebpackPlugin()
    ]
}
```

4. 在`package.json`中，指定了整个库的入口文件
```
{
  "main": "./dist/employee-query.js",
}
```

### 2，组件编写