/**
 * Constants for links
 */

const links = [
  { 'name': 'Cloudflare', 'url': 'https://www.cloudflare.com/' },
  { 'name': 'DoorDash', 'url': 'https://www.doordash.com/' },
  { 'name': 'Shopify', 'url': 'https://www.shopify.com/' },
 ];

const staticURL = 'https://static-links-page.signalnerve.workers.dev';

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


addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
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
      "content-type": "text/html;charset=UTF-8",
    },
  }
  const response = await fetch(staticURL);

  return new HTMLRewriter().on("div#links", new LinksTransformer(links))
    .transform(response);
}