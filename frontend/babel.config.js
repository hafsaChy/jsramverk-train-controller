module.exports = function(api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo",
              "@babel/preset-env",
              "@babel/preset-react"
    ],
    plugins: [
      ["@babel/plugin-transform-private-methods", {
        "loose": true
      }],
      ["@babel/plugin-transform-private-property-in-object", {
        "loose": true
      }],
      ["@babel/plugin-transform-class-properties", { 
        "loose": true 
      }],
      ["@babel/plugin-syntax-class-properties"],
      [
        "module-resolver",
        {
          root: ["./App.tsx"],
          extensions: [".js", ".ios.js", ".android.js"],
          resolvePath(sourcePath, currentFile, ...otherparams /* opts */) {
            return resolvePath(sourcePath, currentFile, otherparams);
          },
          loglevel: "verbose",
        },
      ]
    ]
  };
};
