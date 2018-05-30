/** @module Utils/env */

/**
 * Gets an environment variable, with optional default, and required flag.
 * 
 * @param  {String}  name           Name of environment variable (e.g. "NODE_ENV")
 * @param  {Any}     [defaultVal]   Default value, if env var is empty
 * @param  {Boolean} [throwIfEmpty] Throw an error if the env is missing/empty
 * @return {Any}                    Env var value
 */
export const defaultEnv = (name, defaultVal = null, throwIfEmpty = false) => {
    
    if (name in process.env)
        return process.env[name]
    
    if (throwIfEmpty === true)
        throw new Error(`Missing environment variable ${name}`)
    
    return defaultVal
    
}

/**
 * Require an environment variable.
 * 
 * @param  {String} name Name of environment variable (e.g. "NODE_ENV")
 */
export const requireEnv = name => defaultEnv(name, null, true)
