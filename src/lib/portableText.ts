import { toHTML } from '@portabletext/to-html';
import { urlFor } from './sanity';

const customComponents = {
  types: {
    image: ({ value }: { value: any }) => {
      // value is the image block from Sanity
      try {
        let width = 1200;
        let className = 'content-image full-width';
        switch (value.width) {
          case 'half':
            width = 600;
            className = 'content-image half-width';
            break;
          case 'quarter':
            width = 300;
            className = 'content-image quarter-width';
            break;
        }

        if (value.alignment) {
          className += ` align-${value.alignment}`;
        }

        const src = urlFor(value).width(width).format('webp').quality(80).url();
        const alt = value.alt || '';
        return `<img src="${src}" alt="${alt}" class="${className}" />`;
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
