# Notes
* antd推荐使用3.10.1
* 依赖资源包jquery、react、react-dom、react-router、react-router-dom、antd

# usage
```
yarn add pilipa-terrace --registry https://npmregistry.i-counting.cn
```

# Development
```
yarn install
yarn dev
...
yarn lib
yarn dist
```

### script引用资源包时webpack下的配置
```
externals: {
  jquery: 'jQuery',
  react: 'React',
  'react-dom': 'ReactDOM',
  'react-router': 'ReactRouter',
  'react-router-dom': 'ReactRouterDOM',
  antd: 'antd',
  'pilipa-terrace': 'terrace'
}
```

# Change Log 

### 1.0.7
  &nbsp;&nbsp; `2018-11-28` 
  - 支持无痕模式