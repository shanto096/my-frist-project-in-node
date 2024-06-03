const environments = {}

environments.develop = {
    port: 3000,
    envName: 'develop'
}
environments.production = {
    port: 5000,
    envName: 'production'
}

const currentEnv = typeof process.env.NODE_ENV === 'string' ? process.env.NODE_ENV : 'develop';

const environmentToExport = typeof environments[currentEnv] === 'object' ? environments[currentEnv] : environments.develop;

module.exports = environmentToExport