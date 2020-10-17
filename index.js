

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
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  return new Response('Hello worker!', {
    headers: { 'content-type': 'text/plain' },
  })
}
