const path = require('path');

module.exports = {
    mode: 'development', // o production
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        static: './dist',
      },
     
};
