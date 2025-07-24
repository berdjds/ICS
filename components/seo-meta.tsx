import Head from 'next/head';

interface SEOMetaProps {
	title: string;
	description: string;
	keywords?: string;
	canonical?: string;
	ogImage?: string;
	ogType?: string;
	structuredData?: any;
}

export const SEOMeta: React.FC<SEOMetaProps> = ({
	title,
	description,
	keywords,
	canonical,
	ogImage = '/images/intel-cs-og-image.jpg',
	ogType = 'website',
	structuredData,
}) => {
	const fullTitle = `${title} | iNTEL-CS`;
	const baseUrl = 'https://intel-cs.com';
	const canonicalUrl = canonical ? `${baseUrl}${canonical}` : baseUrl;

	return (
		<Head>
			{/* Basic Meta Tags */}
			<title>{fullTitle}</title>
			<meta name="description" content={description} />
			{keywords && <meta name="keywords" content={keywords} />}
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<meta name="robots" content="index, follow, max-image-preview:large" />

			{/* Canonical URL */}
			<link rel="canonical" href={canonicalUrl} />

			{/* Open Graph Tags */}
			<meta property="og:title" content={fullTitle} />
			<meta property="og:description" content={description} />
			<meta property="og:type" content={ogType} />
			<meta property="og:url" content={canonicalUrl} />
			<meta property="og:image" content={`${baseUrl}${ogImage}`} />
			<meta property="og:image:width" content="1200" />
			<meta property="og:image:height" content="630" />
			<meta property="og:site_name" content="iNTEL-CS" />
			<meta property="og:locale" content="en_US" />

			{/* Twitter Card Tags */}
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:title" content={fullTitle} />
			<meta name="twitter:description" content={description} />
			<meta name="twitter:image" content={`${baseUrl}${ogImage}`} />
			<meta name="twitter:site" content="@intelcs_uae" />
			<meta name="twitter:creator" content="@intelcs_uae" />

			{/* Structured Data */}
			{structuredData && (
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
				/>
			)}

			{/* Additional SEO Tags */}
			<meta name="author" content="iNTEL-CS" />
			<meta name="publisher" content="iNTEL-CS" />
			<meta name="theme-color" content="#006398" />
			<link rel="icon" href="/images/intel-cs-logo.png" />
			<link rel="apple-touch-icon" href="/images/intel-cs-logo.png" />
		</Head>
	);
};