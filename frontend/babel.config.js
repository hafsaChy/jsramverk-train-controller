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
      [
        "module-resolver",
        {
          root: ["./App"],
          resolvePath(sourcePath, currentFile, ...otherparams /* opts */) {
            return resolvePath(sourcePath, currentFile, otherparams);
          },
          loglevel: 'verbose'
        }
      ],
      ["@babel/plugin-syntax-class-properties"],
    ]
  };
};
