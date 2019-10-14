# 项目介绍

将[ts_react_app](https://github.com/crane0/ts_react_app/tree/redux-version)项目中，

使用到的表单组件封装一个组件。

## 42，组件封装

### 1，配置工作

要开发的是组件，不是web工程，要进行一些改造，

1. 在`build\webpack.base.config.js`中，
- 将入口文件抽离了出去，因为开发环境和生产环境，需要不同的入口，
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
        // 打包为 umd 模块，库名为 EmployeeQuery（全局环境，会挂载在window下）
        libraryTarget: 'umd',
        library: 'EmployeeQuery'
    },
    // 这个插件，可以在打包时，剔除 vue 的源码
    externals: [nodeExternals()],
}
```

4. 在`package.json`中，指定了整个库的入口文件
```
{
  "main": "./dist/employee-query.js",
}
```

### 2，组件编写，`src/components/EmployeeQuery.vue`

1. 使用了装饰器模式，所以要更改 tsconfig.json 配置，支持装饰器模式
```
{
    "compilerOptions": {
        "experimentalDecorators": true,
    }
}
```
2. 在开发环境入口导入组件，`src/index.ts`

现在 `npm start` 启动就不会报错了。

开发环境测试没有问题了，再去构建生产环境的代码。

### 3，构建生产环境代码

入口，`src/main.ts`

因为只使用了一个单文件组件，所以直接导出就可以了。

最后 `npm run build` 构建即可。

---

## 43，组件发布

将上节课构建的文件，发布到 npm 上。

因为构建出的是 js 文件，在 ts 中使用时，还需要声明文件。 

为一个库编写声明文件时，需要 package.json 中的一个字段，指定声明文件的入口。
```
{
    "types": "./types/employee-query.d.ts"
}
```
1. 编写声明文件，在 `types/employee-query.d.ts` 中，

2. 发布，
- 登录 npm 账号
- `npm publish`

发布时，[可能出现的问题](https://www.cnblogs.com/chengzp/p/7757839.html)

要么就是使用了淘宝源，要么就是要发布的包和别人的重名了，

如果重名，修改 package.json 中的 name。

另外，记得修改 package.json 中的 author

3. 使用

目前，只在 [ts-vue](https://github.com/crane0/ts-vue) 项目中测试使用了。
