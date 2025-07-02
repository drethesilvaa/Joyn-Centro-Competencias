export interface ArticleMetadata {
  title: string;
  subTitle: string;
  author: string;
  authorRole: string;
  authorPic: string;
  articleImage: string;
  slug: string;
  readTime?: number;
}

export interface Article extends ArticleMetadata {
  content: string;
}

export interface ArticleListItem extends ArticleMetadata {
  excerpt: string;
}

export interface ArticlesListResponse {
  articles: ArticleListItem[];
  total: number;
}
