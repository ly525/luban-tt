# 语义化版本控制

本项目使用 [standard-version](https://github.com/conventional-changelog/standard-version) 进行版本控制，遵循[语义化版本规范](https://semver.org/lang/zh-CN/)。

## 版本号规则

版本格式：主版本号.次版本号.修订号，版本号递增规则如下：

1. 主版本号：当你做了不兼容的 API 修改
2. 次版本号：当你做了向下兼容的功能性新增
3. 修订号：当你做了向下兼容的问题修正

## 提交信息规范

本项目使用 [Conventional Commits](https://www.conventionalcommits.org/zh-hans/) 规范来规范提交信息格式。提交信息应该遵循以下格式：

```
<类型>[可选的作用域]: <描述>

[可选的正文]

[可选的脚注]
```

常用的提交类型：

- `feat`: 新功能
- `fix`: 修复Bug
- `docs`: 文档更新
- `style`: 代码格式调整，不影响代码功能
- `refactor`: 代码重构，既不是新增功能，也不是修改bug的代码变动
- `perf`: 性能优化
- `test`: 测试相关
- `build`: 构建系统或外部依赖项的更改
- `ci`: CI配置文件和脚本的更改
- `chore`: 其他不修改src或测试文件的更改

## 使用方法

### 自动更新版本号

```bash
# 根据提交记录自动确定版本类型并更新
npm run release

# 指定版本类型
npm run release:patch  # 更新修订号 (1.0.0 -> 1.0.1)
npm run release:minor  # 更新次版本号 (1.0.0 -> 1.1.0)
npm run release:major  # 更新主版本号 (1.0.0 -> 2.0.0)
```

执行上述命令会：

1. 根据提交记录自动更新版本号
2. 生成/更新 CHANGELOG.md 文件
3. 创建带有版本号的 git 标签
4. 提交上述更改

### 首次使用

如果这是项目的首次发布，可以使用以下命令：

```bash
npm run release -- --first-release
```

这将创建 CHANGELOG.md 文件而不更改版本号。