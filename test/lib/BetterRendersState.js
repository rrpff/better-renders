const React = require('react')
const { render } = require('enzyme')
const BetterRendersState = require('../../app/lib/BetterRendersState')

const strip = str => str.replace(/[\s|\n]/g, '')

describe('BetterRendersState', function () {
  it('should define a __betterState variable in the client application', function () {
    const wrapper = render(
      <BetterRendersState
        host="http://www.example.com:3000"
        initialComponent="HomePage"
        initialProps={{ some: 'props' }}
      />
    )

    expect(strip(wrapper.html())).to.eq(strip(`
      <script>
        window.__betterState = {
          host: 'http://www.example.com:3000',
          initialComponent: 'HomePage',
          initialProps: { some: "props" }
        };
      </script>
    `))
  })
})
