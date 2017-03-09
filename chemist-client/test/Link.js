const test = require('ava')
const React = require('react')
const { spy } = require('sinon')
const { shallow } = require('enzyme')
const Link = require('../src/Link')

test('Link should render an <a> tag with the content given', t => {
  const link = <Link href="/about">About Us</Link>
  const context = { router: { pushLocation: () => {} } }
  const wrapper = shallow(link, { context })

  t.is('<a href="/about">About Us</a>', wrapper.html())
})

test('Link should not require an onClick event', t => {
  const event = { preventDefault: () => {} }
  const link = <Link href="/about">About Us</Link>
  const context = { router: { pushLocation: () => {} } }
  const wrapper = shallow(link, { context })

  wrapper.find('a').simulate('click', event)
  t.pass()
})

test('Link should not refresh the page when clicked', t => {
  const preventDefault = spy()
  const onClick = spy()
  const event = { preventDefault }
  const link = <Link href="/about" onClick={onClick}>About Us</Link>
  const context = { router: { pushLocation: () => {} } }
  const wrapper = shallow(link, { context })

  wrapper.find('a').simulate('click', event)

  t.is(1, preventDefault.callCount)
  t.deepEqual([event], onClick.firstCall.args)
})

test('Link should trigger a history push on click', t => {
  const event = { preventDefault: () => {} }
  const link = <Link href="/about?test=123&great">About Us</Link>
  const pushLocation = spy()
  const context = { router: { pushLocation } }
  const wrapper = shallow(link, { context })

  wrapper.find('a').simulate('click', event)

  t.deepEqual(['/about?test=123&great'], pushLocation.firstCall.args)
})
