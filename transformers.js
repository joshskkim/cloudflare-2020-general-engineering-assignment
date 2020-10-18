/**
 * Targets the div#links selector
 * and adds in a new 'a' element for each link
 */

 export class LinksTransformer {
     constructor(links) {
        this.links = links
     }

     async element(element) {
        for (let i = 0, n = this.links.length; i < n; i += 1) {
            let link = this.links[i];
            element.append(`<a href="${link.url}">${link.name}</a>`);
        }
     }
 }
 