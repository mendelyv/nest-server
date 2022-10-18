# nestjs模板

## 📌 简介
基于 `nestjs` +`sequelize`+`redis`+`mysql`+`class-validator`+`restful`。

Nodejs服务器代码框架，力求快速部署微服务。

## 📂 文件结构
```
src
├── app.controller.ts                       // 根控制器
├── app.module.ts                           // 启动模块
├── common                                  // 通用文件
│   ├── config                              // 项目配置文件
│   │   ├── default.ts                      // 项目默认配置
│   │   ├── entities
│   │   │   └── env-config.entity.ts        // 配置数据实例结构
│   │   ├── index.ts                        // 配置入口逻辑
│   │   └── log4js.ts                       // log4js配置
│   ├── constants                           // 项目常量
│   ├── filter
│   ├── interceptor
│   └── middleware
├── main.ts
├── swagger.ts                              // swagger配置
├── system                                  // 系统模块
│   ├── cache
│   ├── database
│   ├── log
│   └── oss
└── user                                    // user模块
    ├── dto
    ├── entities
    ├── providers
    ├── user.controller.ts
    ├── user.module.ts
    └── user.service.ts
```

## 📄 环境配置 
根目录下创建env.{NODE_ENV}.yaml文件，变量名同env-config.entity.ts

NODE_ENV配置详见package.json

## 📦 数据库
database.manager.ts初始化sequelize，默认初始化时添加表Model，表结构详见User模块user.entity.ts

database模块未全局化，需要手动引入

使用Sequelize ORM，API详见[Sequelize文档][sequelize herf]

## 💾 缓存
缓存采用Nestjs的缓存模块托管Redis，配置未开启时则使用内存

app-cache模块为全局模块

app-cache.service.ts提供Redis单例，使用时仅需注入AppCacheService即可

## 🗄️ 文件存储
仅简单实现了文件上传

采用阿里云OSS服务，详见[阿里云OSS文档][aliOSS herf]

## 🗂️ API文档
采用Swagger自动生成，详细使用说明见[Nestjs OpenAPI][Nestjs OpenAPI herf]

## 📑 静态网页
文件存于views

使用nunjucks渲染

示例代码见app.controller.ts中@Render修饰函数

## 📝 日志
使用log4js完成日志的打印及落盘
```
logs
├── access          // 请求及响应日志
├── app-out         // 所有通过LogManger输出的日志
└── errors          // 异常日志
src
├── ····
```


[sequelize herf]: https://sequelize.org
[aliOSS herf]: https://help.aliyun.com/document_detail/32070.html
[Nestjs OpenAPI herf]: https://docs.nestjs.cn/8/openapi