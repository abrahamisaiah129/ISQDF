import React from 'react';
import { Send } from 'lucide-react';
import Button from '../../components/ui/Button.jsx';
import { contactData } from '../../data/contactData.js';

const Contact = () => {
  const { header, infoList, socials, form } = contactData;

  return (
    <main className="bg-white" id="contact">
      {/* ID will be used for scroll to component */}
      <section className="bg-red-700 px-6 py-16 text-white sm:px-8 md:py-24 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-red-100">
            {header.eyebrow}
          </p>
          <h1 className="mt-4 max-w-2xl text-4xl font-bold sm:text-5xl">
            {header.heading}
          </h1>
          <p className="mt-6 max-w-xl leading-8 text-red-100">
            {header.description}
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-12">
        <div className="flex flex-col">
          {/* Core contact info */}
          <div className="space-y-6">
            {infoList.map(({ icon: Icon, title, text, href }) => (
              <div key={title} className="flex gap-4 border-t border-gray-200 pt-5 first:border-t-0 first:pt-0">
                <Icon className="text-red-600 flex-shrink-0" size={22} />
                <div>
                  <h2 className="font-bold text-gray-900">{title}</h2>
                  {href ? (
                    <a href={href} className="mt-1 text-sm text-gray-600 hover:text-red-600 transition-colors">
                      {text}
                    </a>
                  ) : (
                    <p className="mt-1 text-sm text-gray-600">{text}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Social links */}
          <div className="mt-8 border-t border-gray-200 pt-6">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">
              Follow us
            </h2>
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-600 transition-colors hover:bg-red-600 hover:text-white"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <form className="rounded-2xl bg-red-50 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900">{form.title}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <input
              className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm"
              placeholder={form.placeholders.name}
            />
            <input
              className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm"
              type="email"
              placeholder={form.placeholders.email}
            />
            <input
              className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm sm:col-span-2"
              placeholder={form.placeholders.subject}
            />
            <textarea
              className="min-h-36 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm sm:col-span-2"
              placeholder={form.placeholders.message}
            />
          </div>
          <Button className="mt-6" type="submit" rightIcon={<Send size={16} />}>
            {form.submitText}
          </Button>
        </form>
      </section>
    </main>
  );
};

export default Contact;