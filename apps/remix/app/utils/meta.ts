import { NEXT_PUBLIC_WEBAPP_URL } from '@documenso/lib/constants/app';
import { i18n, type MessageDescriptor } from '@lingui/core';

// MIG white-label: all user-facing meta rebranded to Millennial Insurance Group.
export const appMetaTags = (title?: MessageDescriptor) => {
  const description =
    'Securely review and sign your agreements with Millennial Insurance Group.';

  return [
    {
      title: title ? `${i18n._(title)} - Millennial Insurance Group` : 'Millennial Insurance Group',
    },
    {
      name: 'description',
      content: description,
    },
    {
      name: 'keywords',
      content: 'Millennial Insurance Group, agreements, document signing, e-signature',
    },
    {
      name: 'author',
      content: 'Millennial Insurance Group',
    },
    {
      name: 'robots',
      content: 'index, follow',
    },
    {
      property: 'og:title',
      content: 'Millennial Insurance Group - Secure Document Signing',
    },
    {
      property: 'og:description',
      content: description,
    },
    {
      property: 'og:image',
      content: `${NEXT_PUBLIC_WEBAPP_URL()}/opengraph-image.jpg`,
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:description',
      content: description,
    },
    {
      name: 'twitter:image',
      content: `${NEXT_PUBLIC_WEBAPP_URL()}/opengraph-image.jpg`,
    },
  ];
};
