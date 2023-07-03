module.exports = function override (config, env) {
    console.log('override')
    let loaders = config.resolve
    loaders.fallback = {
        "fs": false,
        "os": require.resolve("os-browserify/browser"),
        "path": require.resolve("path-browserify"),
        "crypto": false,
   }
    
    return config
}