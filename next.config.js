const path = require('path')
require('dotenv').config()

module.exports = {
    env: {
        API_URL: process.env.API_URL
    },

    webpack: config => {
        config.resolve.alias['src/components'] = path.join(__dirname, 'components')
        config.resolve.alias['src/utils'] = path.join(__dirname, 'utils')
        config.resolve.alias['public'] = path.join(__dirname, 'public')

        return config
    },
}
