import { toHTML } from '@portabletext/to-html';
import { urlFor } from './sanity';

const customComponents = {
  types: {
    image: ({ value }: { value: any }) => {
      // value is the image block from Sanity
      try {
        const src = urlFor(value).width(1200).url();
        const alt = value.alt || '';
        return `<img src="${src}" alt="${alt}" class="content-image" />`;
      } catch (e) {
        return '';
      }
    }
  },
  marks: {
    link: ({ children, value }: { children: any, value: any }) => {
      const href = value?.href || '#';
      const target = value?.blank ? ' target="_blank" rel="noopener noreferrer"' : '';
      return `<a href="${href}"${target}>${children}</a>`;
    }
  }
};

export function sanityPortableText(portabletext: any) {
  return toHTML(portabletext, { components: customComponents });
}
