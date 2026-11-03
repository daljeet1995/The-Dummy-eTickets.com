// app/components/PageLayout.tsx
export default function PageLayout({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
            {title}
          </h1>
          {subtitle && (
            <p className="text-slate-500 mt-3 text-sm max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
      </section>
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200/60 prose prose-slate max-w-none prose-headings:font-black prose-a:text-brandPink-500">
          {children}
        </div>
      </section>
    </main>
  );
}
