// app/blog/[slug]/page.tsx
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/wordpress";

// Child component that awaits params — kept inside Suspense
async function PostContent({ slugPromise }: { slugPromise: Promise<string> }) {
  const slug = await slugPromise;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const featuredImg = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1
        className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight mb-4"
        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
      />

      <p className="text-xs text-slate-400 mb-8">
        <i className="fa-regular fa-calendar text-brandPink-500 mr-1" />
        {new Date(post.date).toLocaleDateString("en-US", {
          dateStyle: "long",
        })}
      </p>

      {featuredImg && (
        <div className="rounded-3xl overflow-hidden mb-8 bg-slate-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={featuredImg}
            alt={post.title.rendered}
            className="w-full h-auto object-cover"
          />
        </div>
      )}

      <div
        className="prose prose-slate max-w-none prose-headings:font-black prose-headings:text-slate-900 prose-a:text-brandPink-500 prose-img:rounded-2xl"
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />

      <div className="mt-12 pt-6 border-t border-slate-200">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 bg-brandPink-500 hover:bg-brandPink-600 text-white font-bold text-xs px-5 py-2.5 rounded-full"
        >
          <i className="fa-solid fa-arrow-left text-[10px]" /> Back to all posts
        </Link>
      </div>
    </article>
  );
}

// Page shell — fully static, prerenders instantly
export default function SinglePostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Do NOT await params here. Pass the promise down.
  const slugPromise = params.then((p) => p.slug);

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-xs font-bold text-brandPink-500 hover:underline"
        >
          <i className="fa-solid fa-arrow-left text-[10px]" /> Back to Blog
        </Link>
      </div>

      <Suspense fallback={<PostSkeleton />}>
        <PostContent slugPromise={slugPromise} />
      </Suspense>
    </main>
  );
}

function PostSkeleton() {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12 animate-pulse">
      <div className="h-8 bg-slate-200 rounded w-3/4 mb-3" />
      <div className="h-8 bg-slate-200 rounded w-1/2 mb-6" />
      <div className="h-3 bg-slate-200 rounded w-32 mb-8" />
      <div className="h-64 bg-slate-200 rounded-3xl mb-8" />
      <div className="space-y-3">
        <div className="h-4 bg-slate-200 rounded w-full" />
        <div className="h-4 bg-slate-200 rounded w-full" />
        <div className="h-4 bg-slate-200 rounded w-5/6" />
        <div className="h-4 bg-slate-200 rounded w-full" />
        <div className="h-4 bg-slate-200 rounded w-2/3" />
      </div>
    </article>
  );
}
