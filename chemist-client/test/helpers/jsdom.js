const { jsdom } = require('jsdom')

global.document = jsdom('', { url: 'http://www.example.com' })
global.window = document.defaultView

global.navigator = {
  userAgent: 'node.js'
}
