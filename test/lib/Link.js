const React = require('react')
const { spy } = require('sinon')
const { shallow } = require('enzyme')
const Link = require('../../app/lib/Link')

describe('Link', function () {
  it('should render an <a> tag with the content given', function () {
    const wrapper = shallow(<Link href="/about">About Us</Link>)
    expect(wrapper.html()).to.eq('<a href="/about">About Us</a>')
  })

  it('should not require an onClick event', function () {
    const preventDefault = spy()
    const event = { preventDefault }
    const wrapper = shallow(<Link href="/about">About Us</Link>)
    wrapper.find('a').simulate('click', event)
  })

  it('should not refresh the page when clicked', function () {
    const preventDefault = spy()
    const onClick = spy()
    const event = { preventDefault }
    const wrapper = shallow(<Link href="/about" onClick={onClick}>About Us</Link>)

    wrapper.find('a').simulate('click', event)
    expect(preventDefault.callCount).to.eq(1)
    expect(onClick.firstCall.args).to.deep.equal([event])
  })
})
