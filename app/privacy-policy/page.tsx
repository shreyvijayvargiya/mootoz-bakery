import type { Metadata } from 'next'

import { LegalDocument } from '@/components/LegalDocument'

export const metadata: Metadata = {
  title: 'Privacy Policy | Mootoz Bakery',
  description:
    'Privacy Policy for Mootoz Bakery — how we collect, use, and protect your personal information.',
}

export default function PrivacyPolicyPage() {
  return (
    <LegalDocument
      title="Privacy Policy"
      subtitle="Mootoz Bakery"
      meta={[
        {
          label: 'Website',
          value: (
            <a
              href="https://www.mootozbakery.com"
              className="text-[var(--mootoz-accent)] hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.mootozbakery.com
            </a>
          ),
        },
        { label: 'Effective Date', value: '04-02-2026' },
      ]}
      intro={[
        'At Mootoz Bakery, accessible from www.mootozbakery.com, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website, contact us, or place an order.',
      ]}
      sections={[
        {
          title: 'Information We Collect',
          paragraphs: ['We may collect the following information:'],
          bullets: [
            'Name, phone number, and email address',
            'Delivery address and order details',
            'Payment-related information (processed securely via third-party payment gateways)',
            'Messages sent through WhatsApp, contact forms, or phone calls',
            'Website usage data such as IP address, browser type, and pages visited',
          ],
        },
        {
          title: 'How We Use Your Information',
          paragraphs: ['We use your information for the following purposes:'],
          bullets: [
            'To process and fulfill your orders',
            'To provide customer support and respond to inquiries',
            'To improve our products, services, and website experience',
            'To send updates about offers, promotions, and new products (only with your consent)',
            'For internal business analysis and record keeping',
          ],
        },
        {
          title: 'Sharing of Information',
          paragraphs: [
            'Mootoz Bakery does not sell, rent, or trade your personal information to third parties.',
            'We may share your information only in these cases:',
          ],
          bullets: [
            'With delivery partners for order fulfillment',
            'With service providers who assist in operating our website or business',
            'When required by law or government authorities',
            'To protect our legal rights and business interests',
          ],
        },
        {
          title: 'Data Security',
          paragraphs: [
            'We use reasonable security measures to protect your personal data from unauthorized access, misuse, or disclosure. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.',
          ],
        },
        {
          title: 'Cookies & Tracking Technologies',
          paragraphs: [
            'www.mootozbakery.com may use cookies to enhance user experience and analyze website traffic. You can choose to disable cookies through your browser settings if you prefer.',
          ],
        },
        {
          title: 'Your Privacy Rights',
          paragraphs: ['You have the right to:'],
          bullets: [
            'Access your personal information',
            'Request correction of inaccurate data',
            'Request deletion of your data (subject to legal obligations)',
            'Opt out of promotional communications at any time',
          ],
        },
        {
          title: 'Children’s Privacy',
          paragraphs: [
            'Mootoz Bakery does not knowingly collect any Personal Identifiable Information from children under the age of 13. If such information is discovered, it will be removed immediately.',
          ],
        },
        {
          title: 'Third-Party Links',
          paragraphs: [
            'Our website may contain links to other websites. Mootoz Bakery is not responsible for the privacy practices or content of those third-party sites.',
          ],
        },
        {
          title: 'Changes to This Privacy Policy',
          paragraphs: [
            'Mootoz Bakery reserves the right to update this Privacy Policy at any time. Any changes will be posted on this page with an updated effective date.',
          ],
        },
        {
          title: 'Contact Information',
          paragraphs: [
            'If you have any questions about this Privacy Policy or your data, please contact us:',
            'Mootoz Bakery',
            'Shop No. G-65, Near Adhar Seva Kendra, Platina Rajat City Multi, Maharana Pratap Circle, Kunhari, Kota, Rajasthan – 324008',
            'Phone: +91 63675 80490',
            'Website: www.mootozbakery.com',
          ],
        },
      ]}
    />
  )
}
