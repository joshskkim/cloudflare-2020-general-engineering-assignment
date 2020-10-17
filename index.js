

/**
 * Constants for links
 */

 const links = [
  { 'name': 'Cloudflare', 'url': 'https://www.cloudflare.com/' },
  { 'name': 'DoorDash', 'url': 'https://www.doordash.com/' },
  { 'name': 'Shopify', 'url': 'https://www.shopify.com/' },
 ];


addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * Handles request to the path /links and returns the array of links
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
  }
}
