const React = require('react')
const sanitize = require('sanitize-html')
const createRenderer = require('../../app/lib/createRenderer')

describe('Rendering', function () {
  describe('when rendering a component', function () {
    describe('which is not registered', function () {
      it('should reject with an error', async function () {
        const Layout = () => null

        const renderer = createRenderer({ Layout, components: {} })
        const render = renderer({ mode: 'HTML' })

        try {
          await render('MyMissingComponent')
        } catch (e) {
          expect(e.message).to.eq('The component MyMissingComponent is not registered')
        }
      })
    })

    describe('which is not defined', function () {
      it('should reject with an error', async function () {
        const Layout = () => null

        const renderer = createRenderer({ Layout, components: {} })
        const render = renderer({ mode: 'HTML' })

        try {
          await render()
        } catch (e) {
          expect(e.message).to.eq('You must pass a component into render')
        }
      })
    })

    it('should render the component if no Layout is defined', async function () {
      const Title = props => <h1>{props.text}</h1>

      const renderer = createRenderer({ components: { Title } })
      const render = renderer({ mode: 'HTML' })

      const html = await render('Title', { text: 'My title' })
      const cleanHtml = sanitize(html, { allowedTags: ['section', 'h1'] })
      const expectedHtml = '<h1>My title</h1>'

      expect(cleanHtml).to.eq(expectedHtml)
    })

    it('should wrap the component in a Layout if Layout is defined', async function () {
      const Title = props => <h1>{props.text}</h1>
      const Layout = props =>
        <section><div dangerouslySetInnerHTML={{ __html: props.content }} /></section>

      const renderer = createRenderer({ Layout, components: { Title } })
      const render = renderer({ mode: 'HTML' })

      const html = await render('Title', { text: 'My title' })
      const cleanHtml = sanitize(html, { allowedTags: ['section', 'h1'] })
      const expectedHtml = '<section><h1>My title</h1></section>'

      expect(cleanHtml).to.eq(expectedHtml)
    })

    it('should pass component html, props and name into the Layout', async function () {
      const Title = props => <h1>{props.text}</h1>
      const Layout = props => {
        const { childProps, component, content } = props
        expect(childProps).to.deep.equal({ base: true, text: 'My title' })
        expect(component).to.eq('Title')
        expect(content).to.eq('<h1 data-reactroot="" data-reactid="1" data-react-checksum="-863760114">My title</h1>')
        return null
      }

      const renderer = createRenderer({ Layout, components: { Title } })
      const render = renderer({ mode: 'HTML', baseProps: { base: true } })

      await render('Title', { text: 'My title' })
    })

    it('should render the layout statically and the content with react data attributes', async function () {
      const Title = props => <h1>{props.text}</h1>
      const Layout = props =>
        <section dangerouslySetInnerHTML={{ __html: props.content }} />

      const renderer = createRenderer({ Layout, components: { Title } })
      const render = renderer({ mode: 'HTML' })
      const html = await render('Title', { text: 'My title' })

      expect(html).to.include('<section>')
      expect(html).to.include('<h1 data-reactroot')
    })

    it('should merge base props with render props', async function () {
      const BlogPost = props => <div><h1>{props.title}</h1><p>{props.body}</p></div>
      const Layout = props =>
        <section dangerouslySetInnerHTML={{ __html: props.content }} />

      const renderer = createRenderer({ Layout, components: { BlogPost } })
      const render = renderer({ mode: 'HTML', baseProps: { title: 'My title' } })

      const html = await render('BlogPost', { body: 'My body' })
      const cleanHtml = sanitize(html, { allowedTags: ['section', 'h1', 'div', 'p'] })
      const expectedHtml = '<section><div><h1>My title</h1><p>My body</p></div></section>'

      expect(cleanHtml).to.eq(expectedHtml)
    })

    it('should render JSON when the mode is JSON', async function () {
      const Title = props => <h1>{props.text}</h1>
      const Layout = props =>
        <section dangerouslySetInnerHTML={{ __html: props.content }} />

      const renderer = createRenderer({ Layout, components: { Title } })
      const render = renderer({ mode: 'JSON' })
      const json = await render('Title', { text: 'My title' })

      expect(json).to.deep.equal({
        component: 'Title',
        props: {
          text: 'My title'
        }
      })
    })
  })
})
