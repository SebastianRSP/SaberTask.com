'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Container from '@/components/ui/Container';

export default function Testimonials() {
  const t = useTranslations('testimonials');

  const testimonials = t.raw('items') as Array<{
    quote: string;
    author: string;
    role: string;
    company: string;
  }>;

  return (
    <section id="testimonials" className="section-padding bg-white">
      <Container>
        {/* Header */}
        <div className="text-center mb-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200 mb-6">
            <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
            </svg>
            <span className="text-sm font-medium text-gray-700">{t('badge')}</span>
          </div>

          {/* Title */}
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-dark mb-4">
            {t('title')}
          </h2>

          {/* Subtitle with decorative lines */}
          <div className="flex items-center justify-center gap-4 max-w-2xl mx-auto">
            <div className="hidden md:block h-px bg-gray-300 flex-1" />
            <p className="text-lg text-gray-600">{t('subtitle')}</p>
            <div className="hidden md:block h-px bg-gray-300 flex-1" />
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left - Featured Testimonial */}
          <div>
            {/* Founder Photo */}
            <div className="relative mb-6">
              <div className="aspect-[4/3] bg-gray-200overflow-hidden ">
                <Image
                  src="/founders.jpg"
                  alt="SaberTask Founders"
                  fill
                  className="object-cover rounded-2xl"
                />
              </div>
            </div>

            {/* Featured Quote */}
            <blockquote className="text-lg md:text-xl text-dark mb-6">
              &ldquo;{t('featured.quote')}&rdquo;
            </blockquote>

            {/* Featured Author */}
            <div>
              <p className="font-heading font-bold text-dark text-lg">{t('featured.author')}</p>
              <p className="text-gray-500">
                {t('featured.role')} <span className="mx-2">|</span> {t('featured.company')}
              </p>
            </div>
          </div>

          {/* Right - Grid of Testimonials */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {testimonials.slice(0, 4).map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl p-5 border border-gray-100"
              >
                {/* Header with avatar and company */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-200 to-primary-400 flex items-center justify-center text-white font-medium">
                      {testimonial.author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-dark text-sm">{testimonial.author}</p>
                      <p className="text-xs text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                  {/* Company logo placeholder */}
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-500">
                      {testimonial.company.substring(0, 2).toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Quote */}
                <p className="text-sm text-gray-600">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
