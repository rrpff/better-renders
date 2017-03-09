const test = require('ava')
const React = require('react')
const { render } = require('enzyme')
const ChemistState = require('../src/ChemistState')

const strip = str => str.replace(/[\s|\n]/g, '')

test('ChemistState should define a __chemistState variable in the client application', t => {
  const wrapper = render(
    <ChemistState
      initialPage="HomePage"
      initialProps={{ some: 'props' }}
    />
  )

  t.is(strip(wrapper.html()), strip(`
    <script>
      window.__chemistState = {
        initialPage: 'HomePage',
        initialProps: { some: "props" }
      };
    </script>
  `))
})
