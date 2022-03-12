// webpack.config.js
const Dotenv = require('dotenv-webpack');

module.exports = {
  plugins: [
    new Dotenv()
  ]
};


// node: {
//   fs: "empty"
// }
// {
//   resolve: {
//     fallback:{
//       fs:false;
//       os:false;
//       path:false;
//     }
//   }

// }