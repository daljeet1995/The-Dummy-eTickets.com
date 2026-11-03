// lib/wordpress.ts
const WP_API_URL =
  process.env.WORDPRESS_API_URL ||
  "https://dummy-tickets.com/blog/wp-json/wp/v2";

export interface WPPost {
  id: number;
  date: string;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url: string }>;
    "wp:term"?: Array<Array<{ id: number; name: string; slug: string }>>;
  };
}

export interface WPCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
}

export async function getPosts({
  page = 1,
  perPage = 6,
  categoryId,
}: {
  page?: number;
  perPage?: number;
  categoryId?: number;
} = {}) {
  const params = new URLSearchParams({
    _embed: "true",
    page: page.toString(),
    per_page: perPage.toString(),
  });

  if (categoryId) params.append("categories", categoryId.toString());

  try {
    const res = await fetch(`${WP_API_URL}/posts?${params.toString()}`, {
      cache: "no-store", // Next.js 16 build block fix
    });

    if (!res.ok) {
      return { posts: [] as WPPost[], totalPages: 0, totalPosts: 0 };
    }

    const posts: WPPost[] = await res.json();
    const totalPages = parseInt(res.headers.get("X-WP-TotalPages") || "0", 10);
    const totalPosts = parseInt(res.headers.get("X-WP-Total") || "0", 10);
    return { posts, totalPages, totalPosts };
  } catch {
    return { posts: [] as WPPost[], totalPages: 0, totalPosts: 0 };
  }
}

export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  try {
    const res = await fetch(`${WP_API_URL}/posts?slug=${slug}&_embed=true`, {
      cache: "no-store", // Next.js 16 build block fix
    });
    if (!res.ok) return null;
    const posts: WPPost[] = await res.json();
    return posts.length > 0 ? posts[0] : null;
  } catch {
    return null;
  }
}

export async function getCategories(): Promise<WPCategory[]> {
  try {
    const res = await fetch(`${WP_API_URL}/categories?per_page=100`, {
      cache: "no-store", // Next.js 16 build block fix
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}
