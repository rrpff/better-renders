const ora = require('ora')

exports.spinner = message => ora(message).start()
