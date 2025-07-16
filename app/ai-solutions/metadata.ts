import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'AI Solutions Dubai | AI for HR, Legal Tech & Gaming - iNTEL-CS',
	description:
		'Leading AI solutions provider in Dubai, UAE. Specializing in AI for HR, Legal Tech, and Gaming with AWS GameLift implementation. Transform your business with intelligent automation.',
	keywords:
		'AI solutions Dubai, AI solutions UAE, AI for HR solutions UAE, artificial intelligence Dubai, machine learning UAE, GameLift implementation Dubai, legal tech AI, gaming AI, intelligent automation',
	openGraph: {
		title: 'AI Solutions Dubai | Transform Your Business with AI - iNTEL-CS',
		description:
			'Expert AI solutions for HR, Legal, and Gaming industries in Dubai. AWS GameLift implementation, intelligent automation, and machine learning solutions.',
		url: 'https://intel-cs.com/ai-solutions',
		siteName: 'iNTEL-CS',
		images: [
			{
				url: '/images/intel-cs-ai-solutions.jpg',
				width: 1200,
				height: 630,
				alt: 'iNTEL-CS AI Solutions - Transforming Business in Dubai',
			},
		],
		locale: 'en_US',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'AI Solutions Dubai | Transform Your Business - iNTEL-CS',
		description:
			'Expert AI solutions for HR, Legal, and Gaming industries. AWS GameLift & intelligent automation.',
		images: ['/images/intel-cs-ai-solutions.jpg'],
		creator: '@intelcs_uae',
		site: '@intelcs_uae',
	},
	alternates: {
		canonical: '/ai-solutions',
	},
};

export const aiServiceSchema = {
	'@context': 'https://schema.org',
	'@type': 'Service',
	name: 'AI Solutions for Business',
	description:
		'Comprehensive AI solutions including AI for HR, Legal Tech, Gaming AI with AWS GameLift implementation.',
	provider: {
		'@type': 'Organization',
		name: 'iNTEL-CS',
	},
	areaServed: 'United Arab Emirates',
	serviceType: 'Artificial Intelligence Services',
	offers: [
		{
			'@type': 'Offer',
			name: 'AI for HR Solutions',
			description: 'Transform HR operations with AI-powered recruitment and analytics',
		},
		{
			'@type': 'Offer',
			name: 'Legal Tech AI',
			description: 'Contract analysis, legal research automation, and compliance monitoring',
		},
		{
			'@type': 'Offer',
			name: 'Gaming AI & GameLift',
			description: 'AWS GameLift implementation and intelligent gaming solutions',
		},
	],
};