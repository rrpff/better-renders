const form = require('../src')

xdescribe('form', function () {
  const testForm = form({
    fields: {
      async username (value) {
        const taken = await Promise.resolve(value === 'this-one-is-taken')
        if (taken) return 'This username is already taken'
        return true
      }
    }
  })

  describe('when called with no arguments', function () {
    it('should return a serializable form object', async function () {
      expect(testForm()).to.deep.equal({
        fields: {
          username: ''
        }
      })
    })
  })

  describe('when given an entry', function () {
    it('should return ', function () {

    })
  })
})
