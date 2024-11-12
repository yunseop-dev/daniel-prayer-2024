// src/components/react/YouTubeEmbed.tsx
import React, { useState, useEffect, useRef } from 'react'
import YouTube from 'react-youtube'

interface YouTubeEmbedProps {
	videoId: string
	className?: string
}

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ videoId, className = '' }) => {
	const [isFixed, setIsFixed] = useState(false)
	const containerRef = useRef<HTMLDivElement>(null)
	const observerRef = useRef<IntersectionObserver | null>(null)

	useEffect(() => {
		console.log('eff')
		const currentContainer = containerRef.current

		if (!currentContainer) return

		const observerOptions = {
			threshold: 0,
			rootMargin: '0px 0px -100px 0px'
		}

		const handleIntersection: IntersectionObserverCallback = (entries) => {
			entries.forEach((entry) => {
				setIsFixed(!entry.isIntersecting)
			})
		}

		observerRef.current = new IntersectionObserver(handleIntersection, observerOptions)
		observerRef.current.observe(currentContainer)

		return () => {
			if (observerRef.current) {
				observerRef.current.disconnect()
			}
		}
	}, [])

	return (
		<div ref={containerRef} className={`youtube-container relative mb-8 ${className}`}>
			<div
				className={`youtube-embed transition-all duration-300 ${
					isFixed
						? 'fixed bottom-4 right-4 z-50 w-[300px] md:w-1/4 h-[169px] md:h-[200px] shadow-lg rounded-lg overflow-hidden'
						: 'relative w-full'
				}`}
			>
				<YouTube videoId={videoId} />
			</div>
		</div>
	)
}

export default YouTubeEmbed
