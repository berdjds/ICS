'use client';

import Lottie from 'lottie-react';
import { useEffect, useState } from 'react';

export default function AiCloudLottie() {
	const [animationData, setAnimationData] = useState(null);

	useEffect(() => {
		// Load the animation data
		console.log('Loading Lottie animation...');
		fetch('/cloud-lottie.json')
			.then(response => {
				console.log('Lottie response status:', response.status);
				return response.json();
			})
			.then(data => {
				console.log('Lottie data loaded, size:', JSON.stringify(data).length);
				setAnimationData(data);
			})
			.catch(error => console.error('Error loading Lottie animation:', error));
	}, []);

	if (!animationData) {
		return (
			<div style={{ width: 300, height: 300, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
				<div style={{ color: '#006398' }}>Loading animation...</div>
			</div>
		);
	}

	console.log('Rendering Lottie animation');
	return (
		<div style={{ 
			width: 300, 
			height: 300, 
			margin: '0 auto',
			background: 'rgba(255, 0, 0, 0.3)', // Red background to see if component is there
			border: '2px solid red',
			position: 'relative'
		}}>
			<Lottie 
				animationData={animationData}
				loop={true}
				autoplay={true}
				style={{ width: '100%', height: '100%' }}
				rendererSettings={{
					preserveAspectRatio: 'xMidYMid meet'
				}}
			/>
			<div style={{ 
				position: 'absolute', 
				top: '10px', 
				left: '10px', 
				color: 'white', 
				background: 'black', 
				padding: '5px',
				fontSize: '12px'
			}}>
				Lottie Container
			</div>
		</div>
	);
}
