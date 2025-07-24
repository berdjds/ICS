import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Cloud Solutions UAE | AWS Migration & Managed Services - iNTEL-CS',
	description:
		'AWS Advanced Partner delivering cloud migration services, managed cloud infrastructure & serverless solutions in Dubai, UAE. AWS MAP implementation with 24/7 support.',
	keywords:
		'cloud solutions UAE, AWS migration services, managed cloud services UAE, cloud services Dubai, digital transformation Dubai, serverless solutions, AWS MAP UAE, VMware containerization, cloud infrastructure management Dubai',
	openGraph: {
		title: 'Cloud Solutions UAE | AWS Migration Services - iNTEL-CS',
		description:
			'AWS Advanced Partner in UAE. Expert cloud migration, managed services, serverless architecture & 24/7 support. AWS MAP implementation partner.',
		url: 'https://intel-cs.com/cloud-services',
		siteName: 'iNTEL-CS',
		images: [
			{
				url: '/images/intel-cs-cloud-services.jpg',
				width: 1200,
				height: 630,
				alt: 'iNTEL-CS Cloud Services - AWS Migration Dubai',
			},
		],
		locale: 'en_US',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Cloud Solutions UAE | AWS Migration - iNTEL-CS',
		description:
			'AWS Advanced Partner delivering cloud migration & managed services in Dubai. 24/7 support & serverless solutions.',
		images: ['/images/intel-cs-cloud-services.jpg'],
		creator: '@intelcs_uae',
		site: '@intelcs_uae',
	},
	alternates: {
		canonical: '/cloud-services',
	},
};

export const cloudServiceSchema = {
	'@context': 'https://schema.org',
	'@type': 'Service',
	name: 'Cloud Migration & Managed Services',
	description:
		'Comprehensive cloud services including AWS migration, managed infrastructure, serverless solutions, and 24/7 support.',
	provider: {
		'@type': 'Organization',
		name: 'iNTEL-CS',
	},
	areaServed: 'United Arab Emirates',
	serviceType: 'Cloud Computing Services',
	offers: [
		{
			'@type': 'Offer',
			name: 'AWS Migration Services',
			description: 'AWS MAP implementation with proven migration methodology',
		},
		{
			'@type': 'Offer',
			name: 'Managed Cloud Services',
			description: '24/7 monitoring, optimization, and infrastructure management',
		},
		{
			'@type': 'Offer',
			name: 'Serverless Solutions',
			description: 'Serverless architecture design and implementation',
		},
	],
};