const React = require('react')
const { spy } = require('sinon')
const { shallow } = require('enzyme')
const Link = require('../../app/lib/Link')

describe('Link', function () {
  it('should render an <a> tag with the content given', function () {
    const link = <Link href="/about">About Us</Link>
    const context = { router: { pushToHistory: () => {} } }
    const wrapper = shallow(link, { context })

    expect(wrapper.html()).to.eq('<a href="/about">About Us</a>')
  })

  it('should not require an onClick event', function () {
    const event = { preventDefault: () => {} }
    const link = <Link href="/about">About Us</Link>
    const context = { router: { pushToHistory: () => {} } }
    const wrapper = shallow(link, { context })

    wrapper.find('a').simulate('click', event)
  })

  it('should not refresh the page when clicked', function () {
    const preventDefault = spy()
    const onClick = spy()
    const event = { preventDefault }
    const link = <Link href="/about" onClick={onClick}>About Us</Link>
    const context = { router: { pushToHistory: () => {} } }
    const wrapper = shallow(link, { context })

    wrapper.find('a').simulate('click', event)

    expect(preventDefault.callCount).to.eq(1)
    expect(onClick.firstCall.args).to.deep.equal([event])
  })

  it('should trigger a history push on click', function () {
    const event = { preventDefault: () => {} }
    const link = <Link href="/about?test=123&great">About Us</Link>
    const pushToHistory = spy()
    const context = { router: { pushToHistory } }
    const wrapper = shallow(link, { context })

    wrapper.find('a').simulate('click', event)

    expect(pushToHistory.firstCall.args).to.deep.equal(['/about?test=123&great'])
  })
})
