

npm install -g pnpm@next-7

node >= v14.19

接着在根目录下创建npm的配置文件.npmrc，增加配置项
```
shamefully-hoist = true
```
如果不添加shamefully-hoist = true配置，会发现node_modules并没有@vue、@babel等依赖包下面步骤会执行失败

pnpm install vue@next typescript -D

npx tsc --init

pnpm create vite app

cd app

pnpm install

pnpm dev


pnpm config get registry
pnpm config set registry http://registry.npm.taobao.org
