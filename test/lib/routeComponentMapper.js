const routeComponentMapper = require('../../app/lib/routeComponentMapper')

describe('Route Component Mapper', function () {
  it('maps routes to components', function () {
    const ComponentA = () => {}
    const ComponentB = () => {}
    const ComponentC = () => {}

    const getComponentForRoute = routeComponentMapper({
      '/': ComponentA,
      '/test': ComponentB,
      '/test/with/:param': ComponentC,
    })

    expect(getComponentForRoute('/')).to.eq(ComponentA)
    expect(getComponentForRoute('/test')).to.eq(ComponentB)
    expect(getComponentForRoute('/test/with/the-third-one')).to.eq(ComponentC)
  })
})
