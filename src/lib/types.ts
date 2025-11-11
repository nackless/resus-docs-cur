export interface Author {
  name: string;
  image?: {
    asset: {
      _ref: string;
    };
  };
  bio?: string;
}

export interface Category {
  title: string;
}

export interface SanityPost {
  title: string;
  slug: { current: string };
  excerpt?: string;
  publishedAt: string;
  mainImage?: {
    asset: {
      _ref: string;
    };
  };
  // legacy fallbacks
  image?: {
    asset: {
      _ref: string;
    };
  };
  content?: any[];
  author?: Author;
  categories?: Category[];
  body?: any[];
}
