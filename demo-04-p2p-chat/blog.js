import * as api from './api.js'

const IFRAME_CSP = `default-src 'self' 'unsafe-inline';`
const IFRAME_SANDBOX = `allow-forms allow-scripts allow-popups allow-popups-to-escape-sandbox`

const PATH = '/microblog/'
var profile = undefined
try { profile = JSON.parse(localStorage.profile) }
catch (e) { console.debug(e) }

customElements.define('bb-composer', class extends HTMLElement {
  async connectedCallback () {
    if (!profile) {
      this.append(h('button', {click: this.onClickChangeProfile.bind(this)}, 'Select a profile to post with'))
    } else {
      this.append(h('form', {submit: this.onSubmit},
        h('p', h('textarea', {name: 'content', required: true, placeholder: 'Enter your post here'})),
        h('p',
          h('input', {name: 'filename', placeholder: 'Post filename (optional)'}),
          h('button', {type: 'submit'}, `Post to ${profile.title}'s microblog`),
          ' ',
          h('small', h('a', {href: '#', click: this.onClickChangeProfile.bind(this)}, 'Change profile'))
        )
      ))
    }
  }

  async onSubmit (e) {
    e.preventDefault()
    var filename = e.target.filename.value
    var content = e.target.content.value
    filename = filename || `${Date.now()}.md`
    if (filename.indexOf('.') === -1) filename += '.md'
    await beaker.hyperdrive.drive(profile.url).mkdir(PATH).catch(e => undefined)
    await beaker.hyperdrive.drive(profile.url).writeFile(PATH + filename, content)
    location.reload()
  }

  async onClickChangeProfile (e) {
    e.preventDefault()
    profile = await beaker.contacts.requestProfile()
    localStorage.profile = JSON.stringify(profile)
    location.reload()
  }
})

customElements.define('bb-feed', class extends HTMLElement {
  connectedCallback () {
    this.initialLoad()
  }

  async initialLoad () {
    if (!localStorage.profile) {
      return
    }
    this.textContent = 'Loading...'
    try {
      var posts = await api.loadFeed(({label, progress}) => {
        this.textContent = `${label} (${(progress * 100)|0}%)`
      })
    } catch (e) {
      this.textContent = e.toString()
      console.debug(`Unable to query ${PATH}`, e)
      return
    }
    this.textContent = ''

    for (let post of posts) {
      this.append(new BBFeedPost(post))
    }
  }
})

class BBFeedPost extends HTMLElement {
  constructor (post) {
    super()
    this.load(post)
  }

  async load (post) {   
    this.append(
      h('a', {class: 'thumb', href: post.author.url},
        h('img', {src: `${post.author.url}thumb`})
      )
    )

    let edited = '';
    let day = niceDate(post.ctime)
    if (post.mtime > post.ctime) {
      edited = ` (edited: ${new Intl.DateTimeFormat('default').format(post.mtime)})`
    }
    
    this.append(h('div', {class: 'meta'}, 
      h('a', {href: post.url, title: post.filename}, post.filename),
      ' ',
      day,
      edited
    ))

    var contentDiv = h('div', {class: 'content'}, 'Loading...')
    this.append(contentDiv)

    try {
      await api.loadPost(post)

      contentDiv.innerHTML = ''
      if (post.content.img) {
        contentDiv.append(h('img', {src: post.content.img}))
      } else if (post.content.video) {
        contentDiv.append(h('video', {controls: true}, h('source', {src: post.content.video})))
      } else if (post.content.audio) {
        contentDiv.append(h('audio', {controls: true}, h('source', {src: post.content.audio})))
      } else if (post.content.link) {
        contentDiv.append(h('a', {
          href: post.content.link.href
        }, post.content.link.title || post.content.link.href))
      } else if (post.content.iframe) {
        contentDiv.append(h('iframe', {
          class: 'content',
          csp: IFRAME_CSP,
          sandbox: IFRAME_SANDBOX,
          src: post.content.iframe
        }))
      } else if (post.content.html) {
        contentDiv.innerHTML = post.content.html
      } else if (post.content.txt) {
        contentDiv.append(h('pre', post.content.txt))
      }
    } catch (e) {
      console.error('Failed to render', post)
      console.error(e)
      return
    }
  }
}
customElements.define('bb-feed-post', BBFeedPost)

function h (tag, attrs, ...children) {
  var el = document.createElement(tag)
  if (isPlainObject(attrs)) {
    for (let k in attrs) {
      if (typeof attrs[k] === 'function') el.addEventListener(k, attrs[k])
      else el.setAttribute(k, attrs[k])
    }
  } else if (attrs) {
    children = [attrs].concat(children)
  }
  for (let child of children) el.append(child)
  return el
}

function isPlainObject (v) {
  return v && typeof v === 'object' && Object.prototype === v.__proto__
}

var today = (new Date()).toLocaleDateString()
var yesterday = (new Date(Date.now() - 8.64e7)).toLocaleDateString()
function niceDate (ts) {
  var date = (new Date(ts)).toLocaleDateString()
  if (date === today) return 'Today'
  if (date === yesterday) return 'Yesterday'
  return date
}