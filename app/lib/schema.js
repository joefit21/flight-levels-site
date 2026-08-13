// Shared JSON-LD builder for the guide pages.
// Author/publisher reference the same @id as the Person node on the homepage so
// search engines and language models consolidate everything to one entity.
const AUTHOR = {
  '@type': 'Person',
  '@id': 'https://www.flight-levels.com/#joe',
  name: 'Joe Mattison',
  url: 'https://www.flight-levels.com',
}

export function guideSchema({ headline, description, url, datePublished, faq = [] }) {
  const graph = [
    {
      '@type': 'Article',
      headline,
      description,
      author: AUTHOR,
      publisher: { '@id': AUTHOR['@id'] },
      datePublished,
      mainEntityOfPage: url,
    },
  ]

  if (faq.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: faq.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    })
  }

  return { '@context': 'https://schema.org', '@graph': graph }
}
