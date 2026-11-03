// app/blog/category/[slug]/page.tsx
import { Suspense } from "react";
import Link from "next/link";
import { getPosts, getCategories } from "@/lib/wordpress";

// Child that reads params + searchParams inside Suspense
async function CategoryContent({
  slugPromise,
  pagePromise,
}: {
  slugPromise: Promise<string>;
  pagePromise: Promise<number>;
}) {
  const slug = await slugPromise;
  const currentPage = await pagePromise;

  const categories = await getCategories();
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-black text-slate-900 mb-2">
          Category Not Found
        </h1>
        <p className="text-sm text-slate-500 mb-6">
          The category you are looking for does not exist.
        </p>
        <Link
          href="/blog"
          className="bg-brandPink-500 text-white font-bold text-xs px-5 py-2.5 rounded-full"
        >
          Back to Blog
        </Link>
      </div>
    );
  }

  const { posts, totalPages } = await getPosts({
    page: currentPage,
    categoryId: category.id,
    perPage: 6,
  });

  return (
    <>
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
          Category: <span className="text-brandPink-500">{category.name}</span>
        </h1>
        <p className="text-slate-500 text-sm mt-2">
          {category.count} post{category.count !== 1 ? "s" : ""} found
        </p>
      </div>

      {posts.length === 0 ? (
        <p className="text-center text-slate-500">No posts in this category.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => {
            const img =
              post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
              "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=600&q=80";
            return (
              <article
                key={post.id}
                className="bg-white rounded-3xl p-4 border border-slate-200/80 hover:shadow-xl transition"
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="h-44 rounded-2xl overflow-hidden mb-4 bg-slate-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img}
                      alt={post.title.rendered}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Link>
                <h2 className="font-extrabold text-slate-900 text-base mb-2 hover:text-brandPink-500 transition">
                  <Link
                    href={`/blog/${post.slug}`}
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                  />
                </h2>
                <div
                  className="text-xs text-slate-500 line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                />
              </article>
            );
          })}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-12">
          {currentPage > 1 && (
            <Link
              href={`/blog/category/${slug}?page=${currentPage - 1}`}
              className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-bold text-slate-700 hover:bg-slate-100"
            >
              Previous
            </Link>
          )}
          <span className="text-sm font-bold text-slate-600 px-3">
            Page {currentPage} of {totalPages}
          </span>
          {currentPage < totalPages && (
            <Link
              href={`/blog/category/${slug}?page=${currentPage + 1}`}
              className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-bold text-slate-700 hover:bg-slate-100"
            >
              Next
            </Link>
          )}
        </div>
      )}
    </>
  );
}

export default function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  // Pass promises down without awaiting
  const slugPromise = params.then((p) => p.slug);
  const pagePromise = searchParams.then((sp) =>
    Math.max(1, Number(sp.page) || 1),
  );

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-xs font-bold text-brandPink-500 hover:underline"
          >
            <i className="fa-solid fa-arrow-left text-[10px]" /> Back to Blog
          </Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Suspense fallback={<CategorySkeleton />}>
          <CategoryContent
            slugPromise={slugPromise}
            pagePromise={pagePromise}
          />
        </Suspense>
      </section>
    </main>
  );
}

function CategorySkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-slate-200 rounded w-1/3 mx-auto mb-3" />
      <div className="h-3 bg-slate-200 rounded w-24 mx-auto mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white rounded-3xl p-4 border border-slate-200/80"
          >
            <div className="h-44 rounded-2xl bg-slate-200 mb-4" />
            <div className="h-4 bg-slate-200 rounded w-3/4 mb-2" />
            <div className="h-3 bg-slate-200 rounded w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
