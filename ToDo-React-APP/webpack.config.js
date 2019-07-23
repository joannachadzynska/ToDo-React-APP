const path = require("path");
// const entryFile = "app.js";
module.exports = {
  entry: `./js/app.js`,
  output: {
    filename: "out.js",
    path: path.resolve(__dirname, "build")
  },
  devServer: {
    contentBase: path.join(__dirname, "./"),
    publicPath: "/build/",
    compress: true,
    open: true,
    port: 3001
  },
  watch: true,
  mode: "production",
  module: {
    rules: [
      // Obsługa plików React JS
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: [
              ["@babel/plugin-proposal-class-properties", { loose: true }]
            ]
          }
        }
      }
    ]
  }
};
