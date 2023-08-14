import { useEffect, useState } from "react";

import styles from "./Gallery.module.css";

const API_ENDPOINT = "https://my-unsplash-api-pi.vercel.app/photos";

type Image = {
	id: string;
	url: string;
	label: string;
};

export default function Gallery() {
	const [images, setImages] = useState<Image[]>([]);

	useEffect(() => {
		const fetchImages = async () => {
			const response = await fetch(API_ENDPOINT);
			const data = await response.json();
			setImages(data);
		};
		fetchImages();
	}, []);

	return (
		<main className={styles.gallery}>
			<div className={styles.card}>
				{images.map((image) => {
					return <img src={image.url} key={image.id} alt={image.label} />;
				})}
			</div>
		</main>
	);
}
