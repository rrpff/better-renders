const index = require('../app')
const server = require('../app/server')

describe('Exports', function () {
  describe('index', function () {
    it('exports all public client modules', function () {
      expect(Object.keys(index)).to.deep.equal([
        'BetterRendersState',
        'ClientRouter',
        'createRoutingReducer',
        'Form',
        'Link',
        'syncHistoryToStore'
      ])
    })
  })

  describe('server', function () {
    it('exports all public server modules', function () {
      expect(Object.keys(server)).to.deep.equal([
        'config',
        'middleware'
      ])
    })
  })
})
