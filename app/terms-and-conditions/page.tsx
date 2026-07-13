import type { Metadata } from 'next'

import { LegalDocument } from '@/components/LegalDocument'

export const metadata: Metadata = {
  title: 'Terms & Conditions | Mootoz Bakery',
  description:
    'Terms & Conditions for Mootoz Bakery — rules for using our website, ordering, cancellations, and services.',
}

export default function TermsAndConditionsPage() {
  return (
    <LegalDocument
      title="Terms & Conditions"
      subtitle="Mootoz Bakery"
      intro={[
        'Welcome to Mootoz Bakery. By accessing or using our website and services, you agree to comply with and be bound by the following Terms & Conditions. Please read them carefully before using our services.',
        'If you do not agree with any part of these terms, you should not use our website or place an order with us.',
      ]}
      sections={[
        {
          title: 'General Information',
          paragraphs: [
            'Mootoz Bakery provides bakery products including 100% eggless cakes, confections, fast food items, and beverages such as shakes. All products are prepared with quality ingredients and under hygienic conditions.',
            'These Terms & Conditions apply to all visitors, customers, and users of this website.',
          ],
        },
        {
          title: 'Products & Services',
          bullets: [
            'All products displayed on the website are subject to availability.',
            'Images shown are for illustration purposes only; actual products may vary slightly in design or appearance.',
            'Customized cakes and special orders are prepared based on customer requirements and specifications.',
          ],
        },
        {
          title: 'Orders & Payments',
          bullets: [
            'Orders can be placed through our store, website, or contact channels provided.',
            'Full or partial advance payment may be required for customized or bulk orders.',
            'Prices are subject to change without prior notice.',
            'Once an order is confirmed, it cannot be modified without prior approval from Mootoz Bakery.',
          ],
        },
        {
          title: 'Cancellation & Refund Policy',
          bullets: [
            'Orders once confirmed cannot be cancelled for customized cakes and special orders.',
            'Refunds are not applicable for products already prepared or delivered.',
            'In case of order cancellation due to unavoidable circumstances from our side, a full refund will be processed.',
            'Any issues with product quality must be reported within 24 hours of purchase.',
          ],
        },
        {
          title: 'Hygiene & Quality Commitment',
          paragraphs: [
            'Mootoz Bakery follows strict hygiene and quality standards. All products are 100% eggless and prepared using premium ingredients. Customers are advised to inform us in advance about any allergies or dietary concerns.',
          ],
        },
        {
          title: 'Intellectual Property',
          paragraphs: [
            'All content on this website, including text, images, logos, and design, is the property of Mootoz Bakery and is protected by applicable copyright laws.',
            'No content may be copied, reproduced, or used without written permission.',
          ],
        },
        {
          title: 'User Responsibilities',
          paragraphs: ['By using our website, you agree:'],
          bullets: [
            'Not to misuse or attempt to harm the website or its services.',
            'Not to provide false or misleading information.',
            'To use the website only for lawful purposes.',
          ],
        },
        {
          title: 'Limitation of Liability',
          paragraphs: ['Mootoz Bakery shall not be held responsible for:'],
          bullets: [
            'Any indirect or incidental damages arising from the use of our products or website.',
            'Delays caused by unforeseen circumstances such as technical issues, supply shortages, or natural events.',
          ],
        },
        {
          title: 'External Links',
          paragraphs: [
            'Our website may contain links to third-party websites for customer convenience. We are not responsible for the content or policies of external websites.',
          ],
        },
        {
          title: 'Changes to Terms & Conditions',
          paragraphs: [
            'Mootoz Bakery reserves the right to modify or update these Terms & Conditions at any time without prior notice. Customers are encouraged to review this page periodically.',
          ],
        },
        {
          title: 'Governing Law',
          paragraphs: [
            'These Terms & Conditions shall be governed and interpreted in accordance with the laws of India. Any disputes shall be subject to the jurisdiction of local courts.',
          ],
        },
        {
          title: 'Contact Information',
          paragraphs: [
            'For any questions regarding these Terms & Conditions, please contact us:',
            'Mootoz Bakery',
            'Email: infomootozbakery@gmail.com',
            'Phone: +91 63675 80490',
          ],
        },
      ]}
      closing={{
        title: 'Acceptance of Terms',
        paragraphs: [
          'By using this website or placing an order with Mootoz Bakery, you acknowledge that you have read, understood, and agreed to these Terms & Conditions.',
        ],
      }}
    />
  )
}
