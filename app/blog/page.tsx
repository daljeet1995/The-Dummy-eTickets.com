// app/blog/page.tsx
import { Suspense } from "react";
import Link from "next/link";
import { getPosts, getCategories } from "@/lib/wordpress";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Travel Tips, Visa Guides & Updates | The Dummy-Tickets Blog",
  description:
    "Read the latest travel tips, embassy news, and visa application guides to make your international travel seamless.",
  openGraph: {
    title: "Travel Tips & Visa Guides",
    description:
      "Read the latest travel tips, embassy news, and visa application guides.",
  },
};

// ... (Baki ka code jo pehle se hai waisa hi rahega: CategoryBar, BlogPosts, etc.)

// ---------- Category Filter Bar (static data, no params) ----------
async function CategoryBar() {
  const categories = await getCategories();
  if (categories.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      <div className="flex flex-wrap items-center gap-2">
        <Link
          href="/blog"
          className="text-xs font-bold px-4 py-2 rounded-full bg-brandPink-500 text-white shadow-sm"
        >
          All Posts
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/blog/category/${cat.slug}`}
            className="text-xs font-bold px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 transition"
          >
            {cat.name}{" "}
            <span className="text-[10px] text-slate-400">({cat.count})</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

// ---------- Post list (reads searchParams inside Suspense) ----------
async function BlogPosts({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const currentPage = Math.max(1, Number(page) || 1);
  const { posts, totalPages } = await getPosts({
    page: currentPage,
    perPage: 6,
  });

  if (posts.length === 0) {
    return <p className="text-center text-slate-500">No posts found.</p>;
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => {
          const img =
            post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
            "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=600&q=80";
          const cats = post._embedded?.["wp:term"]?.[0] || [];

          return (
            <article
              key={post.id}
              className="bg-white rounded-3xl p-4 border border-slate-200/80 hover:shadow-xl transition flex flex-col justify-between"
            >
              <div>
                <Link href={`/blog/${post.slug}`}>
                  <div className="h-44 rounded-2xl overflow-hidden mb-4 bg-slate-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img}
                      alt={post.title.rendered}
                      className="w-full h-full object-cover hover:scale-105 transition duration-500"
                    />
                  </div>
                </Link>

                {cats.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {cats.slice(0, 2).map((c) => (
                      <Link
                        key={c.id}
                        href={`/blog/category/${c.slug}`}
                        className="text-[10px] font-bold text-brandOrange-600 bg-orange-50 px-2 py-0.5 rounded-full uppercase"
                      >
                        {c.name}
                      </Link>
                    ))}
                  </div>
                )}

                <h2 className="font-extrabold text-slate-900 text-base mb-2 hover:text-brandPink-500 transition">
                  <Link
                    href={`/blog/${post.slug}`}
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                  />
                </h2>

                <div
                  className="text-xs text-slate-500 leading-relaxed line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-4 border-t border-slate-200/80 mt-4">
                <span>
                  <i className="fa-regular fa-calendar text-brandPink-500 mr-1" />
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="font-bold text-brandPink-500 hover:underline flex items-center gap-1"
                >
                  Read More <i className="fa-solid fa-arrow-right text-[9px]" />
                </Link>
              </div>
            </article>
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-12">
          {currentPage > 1 ? (
            <Link
              href={`/blog?page=${currentPage - 1}`}
              className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-bold text-slate-700 hover:bg-slate-100 transition"
            >
              <i className="fa-solid fa-chevron-left text-xs mr-1" /> Previous
            </Link>
          ) : (
            <span className="px-4 py-2 bg-slate-100 rounded-full text-sm font-bold text-slate-400 cursor-not-allowed">
              <i className="fa-solid fa-chevron-left text-xs mr-1" /> Previous
            </span>
          )}

          <span className="text-sm font-bold text-slate-600 px-3">
            Page {currentPage} of {totalPages}
          </span>

          {currentPage < totalPages ? (
            <Link
              href={`/blog?page=${currentPage + 1}`}
              className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-bold text-slate-700 hover:bg-slate-100 transition"
            >
              Next <i className="fa-solid fa-chevron-right text-xs ml-1" />
            </Link>
          ) : (
            <span className="px-4 py-2 bg-slate-100 rounded-full text-sm font-bold text-slate-400 cursor-not-allowed">
              Next <i className="fa-solid fa-chevron-right text-xs ml-1" />
            </span>
          )}
        </div>
      )}
    </>
  );
}

// ---------- Page Shell ----------
export default function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <span className="bg-brandPink-500 text-white text-xs font-bold px-4 py-1.5 rounded-full inline-block mb-3">
            Our Blog
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
            Travel Tips &amp; <span className="text-brandPink-500">Guides</span>
          </h1>
          <p className="text-slate-500 text-sm mt-2">
            Get expert tips, travel guides and the latest updates.
          </p>
        </div>
      </section>

      <Suspense fallback={null}>
        <CategoryBar />
      </Suspense>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Suspense
          fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-3xl p-4 border border-slate-200/80 animate-pulse"
                >
                  <div className="h-44 rounded-2xl bg-slate-200 mb-4" />
                  <div className="h-4 bg-slate-200 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-slate-200 rounded w-full mb-1" />
                  <div className="h-3 bg-slate-200 rounded w-5/6" />
                </div>
              ))}
            </div>
          }
        >
          <BlogPosts searchParams={searchParams} />
        </Suspense>
      </section>
    </main>
  );
}
