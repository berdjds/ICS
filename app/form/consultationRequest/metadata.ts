import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Contact iNTEL-CS Dubai | AWS Cloud & AI Solutions UAE',
	description:
		'Contact iNTEL-CS in Dubai for expert cloud migration, AI solutions & managed services. AWS Advanced Partner offering free consultation. Call +971-4-835-8795.',
	keywords:
		'contact iNTEL-CS, cloud consultation Dubai, AI consultation UAE, AWS partner contact, managed services Dubai, free cloud assessment, Intel CS contact',
	openGraph: {
		title: 'Contact iNTEL-CS | Cloud & AI Solutions Dubai',
		description:
			'Get in touch with AWS Advanced Partner in Dubai. Free consultation for cloud migration, AI solutions & managed services. 24/7 support available.',
		url: 'https://intel-cs.com/contact-us',
		siteName: 'iNTEL-CS',
		images: [
			{
				url: '/images/intel-cs-contact.jpg',
				width: 1200,
				height: 630,
				alt: 'Contact iNTEL-CS - Cloud Solutions Dubai',
			},
		],
		locale: 'en_US',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Contact iNTEL-CS Dubai | Cloud & AI Solutions',
		description:
			'Connect with AWS Advanced Partner for cloud migration & AI solutions. Free consultation available.',
		images: ['/images/intel-cs-contact.jpg'],
		creator: '@intelcs_uae',
		site: '@intelcs_uae',
	},
	alternates: {
		canonical: '/contact-us',
	},
};

export const contactPageSchema = {
	'@context': 'https://schema.org',
	'@type': 'ContactPage',
	name: 'Contact iNTEL-CS',
	description: 'Contact page for iNTEL-CS cloud and AI solutions in Dubai, UAE',
	url: 'https://intel-cs.com/contact-us',
	mainEntity: {
		'@type': 'Organization',
		name: 'iNTEL-CS',
		telephone: '+971-4-835-8795',
		email: 'info@intel-cs.com',
		address: {
			'@type': 'PostalAddress',
			streetAddress: '1501-1502, The Tower Plaza Hotel, Sheikh Zayed Road',
			addressLocality: 'Dubai',
			addressCountry: 'AE',
		},
		openingHoursSpecification: {
			'@type': 'OpeningHoursSpecification',
			dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
			opens: '09:00',
			closes: '18:00',
		},
	},
};