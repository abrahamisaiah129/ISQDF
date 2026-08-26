function ValuesSection({ eyebrow, title, values = [] }) {
  if (!values.length) return null;

  return (
    <section className="bg-white px-6 py-16 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          {eyebrow && (
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-red-600">
              {eyebrow}
            </p>
          )}
          {title && (
            <h2 className="mt-3 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
              {title}
            </h2>
          )}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {values.map(({ icon: Icon, title: valueTitle, text }) => (
            <article
              key={valueTitle}
              className="rounded-2xl border border-red-100 bg-red-50/40 p-6 transition-colors hover:bg-red-50"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-100">
                <Icon className="text-red-600" size={20} />
              </div>
              <h3 className="mt-5 text-xl font-bold text-gray-900">{valueTitle}</h3>
              <p className="mt-3 text-sm leading-7 text-gray-600">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ValuesSection;