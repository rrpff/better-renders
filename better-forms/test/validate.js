const form = require('../src')

describe('form', function () {
  describe('#validate', function () {
    it('should support asynchronous validators', async function () {
      const testForm = form({
        fields: {
          async username (value) {
            const taken = await Promise.resolve(value === 'this-one-is-taken')
            if (taken) return 'This username is already taken'
            return true
          }
        }
      })

      expect(await testForm.validate('username', 'this-one-is-taken')).to.deep.equal({
        error: 'This username is already taken',
        valid: false
      })

      expect(await testForm.validate('username', 'this-one-is-free')).to.deep.equal({
        error: null,
        valid: true
      })
    })

    it('should support synchronous validators', async function () {
      const testForm = form({
        fields: {
          age (value) {
            if (value < 18) return 'You are too young'
            if (value > 80) return 'You are too old'
            return true
          }
        }
      })

      expect(await testForm.validate('age', 21)).to.deep.equal({
        error: null,
        valid: true
      })

      expect(await testForm.validate('age', 5)).to.deep.equal({
        error: 'You are too young',
        valid: false
      })

      expect(await testForm.validate('age', 500)).to.deep.equal({
        error: 'You are too old',
        valid: false
      })
    })

    it('should support missing validators', async function () {
      const testForm = form()
      expect(await testForm.validate('some-field', 'blah')).to.deep.equal({
        error: null,
        valid: true
      })
    })

    it('should support helper replacement', async function () {
      const testForm = form({
        helpers: {
          valid: () => false
        },
        fields: {
          name: (value, helpers) => helpers.valid()
        }
      })

      testForm.helpers.valid = () => true
      expect(await testForm.validate('name', 'test')).to.deep.equal({
        error: null,
        valid: true
      })
    })
  })
})
