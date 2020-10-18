/**
 * CONSTANTS
 */

const links = [
  { 'name': 'Cloudflare', 'url': 'https://www.cloudflare.com/' },
  { 'name': 'LinkedIn', 'url': 'https://www.linkedin.com/in/joshuaskkim/' },
  { 'name': 'GitHub Repo', 'url': 'https://github.com/joshskkim/cloudflare-2020-general-engineering-assignment' },
 ];
const staticURL = 'https://static-links-page.signalnerve.workers.dev';
const image = 'https://i.imgur.com/cPXU297.jpg';
const name = 'Joshua Kim';

/**
 * TRANSFORMERS
 * 
 * 
 * Targets the div#links selector
 * and adds in a new 'a' element for each link
 */
class LinksTransformer {
  constructor(links) {
     this.links = links
  }

  async element(element) {
     for (let i = 0, n = this.links.length; i < n; i += 1) {
         let link = this.links[i];
         element.append(`<a href="${link.url}">${link.name}</a>`, { html: true });
     }
  }
}

/**
 * Removes the display: none from the div#profile container
 */
class DisplayTransformer {
  async element(element) {
    const style = element.getAttribute('style');
    if(style) element.setAttribute('style', style.replace('display: none', ''));
  }
}

/**
 * Updates the two child elements in profile to show user avatar and name
 */
class ImageTransformer {
  constructor(image) {
    this.image = image
  }

  async element(element) {
    element.setAttribute('src', this.image);
  }
}

/**
 * Sets text to username
 */
class NameTransformer {
  constructor(name) {
    this.name = name;
  }

  async element(element) {
    element.setInnerContent(this.name);
  }
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * HANDLERS
 * 
 * Handles request to the path /links and returns the array of links
 * if not, renders a static HTML page
 * @param {Request} request
 */
async function handleRequest(request) {
  const init = {
    headers: {
      'content-type': 'application/json;charset=UTF-8'
    }
  };
  const url = new URL(request.url);
  const { pathname } = url;

  if (pathname === '/links') {
    return new Response(JSON.stringify(links), init);
  } else {
    return handleHTMLrequest();
  }
}

async function handleHTMLrequest() {
  const init = {
    headers: {
      'content-type': 'text/html;charset=UTF-8',
    },
  }
  const response = await fetch(staticURL, init);

  return new HTMLRewriter().on('div#links', new LinksTransformer(links))
    .on('div#profile', new DisplayTransformer())
    .on('img#avatar', new ImageTransformer(image))
    .on('h1#name', new NameTransformer(name))
    .transform(response);
}