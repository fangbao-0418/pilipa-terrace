# version
 旧版请使用1.x，旧版最后版本为1.1.6

 新版使用3.x 

# usage
```
npm config set registry https://npmregistry.i-counting.cn
yarn add pilipa
or
yarn add pilipa --registry https://npmregistry.i-counting.cn
```

# Development
```
yarn install
yarn add ali-oss@5.1.1 font-awesome@4.7.0 jquery@3.3.1 react@16.3.1 react-dom@16.3.1 viewerjs@1.0.0 -P
yarn dev
...
yarn lib
yarn dist
```

# dependency 
### commonjs
- `yarn add @types/ali-oss --registry https://npmregistry.i-counting.cn`
- `yarn add viewerjs@^1.0.0`
- `yarn add react@^16.2.0 react-dom@^16.2.0`
- `yarn add font-awesome@^4.7.0`
- `yarn add jquery@^3.2.1`

### amd
```
define(['jquery', 'react', 'react-dom', 'viewerjs', 'ali-oss'], ($, React, ReactDom, Viewer, OSS) => {})
```

# Change Log 
### 1.1.1  
  &nbsp;&nbsp; `2018-4-8` 
  - dropdown 支持键盘上下按键选择，回车确认选择 #20

### 1.1.2  
  &nbsp;&nbsp; `2018-4-9` 
  - webuploader 添加callback #15

### 1.1.3  
  &nbsp;&nbsp; `2018-4-11` 
  - 优化notification，鼠标划过暂停消失

### 1.1.4 
  &nbsp;&nbsp; `2018-4-12` 
  - notification持续时间调整4500ms

### 1.1.4-alpha.1 
  &nbsp;&nbsp; `2018-4-12` 
  - dropdown 修复没有数据报错

### 1.1.4-alpha.9 
  &nbsp;&nbsp; `2018-4-12` 
  - autocomplete 支持上下键选择，回车确定选择

### 1.1.5-alpha.2 
  &nbsp;&nbsp; `2018-5-8` 
  - autocomplete 修复点击input闪烁问题 #22

### 1.1.5-alpha.3
  &nbsp;&nbsp; `2018-5-9` 
  - dropdown 优化icon动画 #20

### 1.1.5-alpha.8
  &nbsp;&nbsp; `2018-5-19` 
  - dropdown 添加defaultvalue 属性

### 3.0.0
  &nbsp;&nbsp; `2018-5-29` 
  - dropdown 样式优化 #30
  - modal 样式优化 #30