const HappyPack = require('happypack');
const os = require('os');
//开辟一个线程池
// 拿到系统CPU的最大核数，每个核起一个编译进程 -> 一个js线程，happypack将编译工作灌满所有线程
const happyThreadPoll = HappyPack.ThreadPool({ size: os.cpus().length });
module.exports.plugins = [
  new HappyPack({
    id: 'babel',
    threadPool: happyThreadPoll,
    loaders: [{
      loader: 'babel-loader',
      query: {
        presets: [["env", { "modules": false }]]
      }
    }]
  }),
  new HappyPack({
    id: 'css',
    threadPool: happyThreadPoll,
    loaders: [{ 
      loader: 'css-loader', 
      options: { importLoaders: 1 } 
    },'postcss-loader']
  })
];