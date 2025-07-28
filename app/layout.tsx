import type React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'AWS Advanced Partner: Cloud & AI Solutions UAE | iNTEL-CS',
	description:
		'AWS Advanced Partner in UAE delivering cloud migration, AI solutions & managed services. Accelerate digital transformation with GameLift, serverless architecture & 24/7 support.',
	keywords:
		'cloud solutions UAE, AI solutions Dubai, AWS migration, managed cloud services, digital transformation, serverless solutions, GameLift, VMware containerization',
	authors: [{ name: 'iNTEL-CS' }],
	creator: 'iNTEL-CS',
	publisher: 'iNTEL-CS',
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	metadataBase: new URL('https://intel-cs.com'),
	alternates: {
		canonical: '/',
	},
	openGraph: {
		title: 'Advanced Cloud & AI Solutions UAE | iNTEL-CS',
		description:
			'AWS Advanced Partner delivering cutting-edge cloud & AI solutions. Accelerated digital transformation with serverless architecture and 24/7 support.',
		url: 'https://intel-cs.com/',
		siteName: 'iNTEL-CS',
		images: [
			{
				url: '/images/intel-cs-og-image.jpg',
				width: 1200,
				height: 630,
				alt: 'iNTEL-CS - Advanced Cloud & AI Solutions UAE',
			},
		],
		locale: 'en_US',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Advanced Cloud & AI Solutions UAE | iNTEL-CS',
		description:
			'AWS Advanced Partner delivering cutting-edge cloud & AI solutions in UAE. Fast implementation & serverless architecture.',
		images: ['/images/intel-cs-twitter-card.jpg'],
		creator: '@intelcs_uae',
		site: '@intelcs_uae',
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	verification: {
		google: 'your-google-verification-code',
		yandex: 'your-yandex-verification-code',
	},
};

const organizationSchema = {
	'@context': 'https://schema.org',
	'@type': 'Organization',
	name: 'iNTEL-CS',
	alternateName: 'Intelligence Cloud Sphere',
	url: 'https://intel-cs.com',
	logo: 'https://intel-cs.com/images/intel-cs-logo.png',
	description:
		'Advanced cloud and AI solutions provider in UAE. AWS Advanced Partner specializing in migration, digital transformation, and managed services.',
	address: {
		'@type': 'PostalAddress',
		addressCountry: 'AE',
		addressLocality: 'Dubai',
		addressRegion: 'Dubai',
	},
	contactPoint: {
		'@type': 'ContactPoint',
		telephone: '+971-4-835-8795',
		contactType: 'customer service',
		areaServed: 'AE',
		availableLanguage: ['English', 'Arabic'],
	},
	sameAs: ['https://linkedin.com/company/intel-cs', 'https://twitter.com/intelcs_uae'],
	foundingDate: '2017',
	award: 'AWS Advanced Tier Services Partner',
};

const serviceSchema = {
	'@context': 'https://schema.org',
	'@type': 'Service',
	name: 'Cloud Migration Services',
	description:
		'AWS Migration Acceleration Program (MAP) implementation with proven methodologies for rapid cloud transformation.',
	provider: {
		'@type': 'Organization',
		name: 'iNTEL-CS',
	},
	areaServed: 'United Arab Emirates',
	serviceType: 'Cloud Computing Services',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" href="/images/intel-cs-logo.png" />
				<link rel="apple-touch-icon" href="/images/intel-cs-logo.png" />
				<meta name="theme-color" content="#006398" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="canonical" href="https://intel-cs.com/" />
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
				/>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
				/>
			</head>
			<body className={inter.className}>{children}</body>
		</html>
	);
}
