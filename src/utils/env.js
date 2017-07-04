
const defaultEnv = (name, defaultVal, throwIfEmpty) => {
    
    if (process.env.hasOwnProperty(name))
        return process.env[name]
    
    if (throwIfEmpty === true)
        throw 'Missing environment variable ' + name
    
    return defaultVal
    
}

const requireEnv = name => defaultEnv(name, null, true)


module.exports.defaultEnv = defaultEnv
module.exports.requireEnv = requireEnv