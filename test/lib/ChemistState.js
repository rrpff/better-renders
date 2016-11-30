const React = require('react')
const { render } = require('enzyme')
const ChemistState = require('../../app/lib/ChemistState')

const strip = str => str.replace(/[\s|\n]/g, '')

describe('ChemistState', function () {
  it('should define a __chemistState variable in the client application', function () {
    const wrapper = render(
      <ChemistState
        host="http://www.example.com:3000"
        initialComponent="HomePage"
        initialProps={{ some: 'props' }}
      />
    )

    expect(strip(wrapper.html())).to.eq(strip(`
      <script>
        window.__chemistState = {
          host: 'http://www.example.com:3000',
          initialComponent: 'HomePage',
          initialProps: { some: "props" }
        };
      </script>
    `))
  })
})
