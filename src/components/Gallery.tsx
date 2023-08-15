import { useEffect, useState } from "react";

import styles from "./Gallery.module.css";

const API_ENDPOINT = "https://my-unsplash-api-pi.vercel.app/photos";

type Image = {
	id: string;
	url: string;
	label: string;
};

type Props = {
	newPhoto: Image;
};

export default function Gallery(props: Props) {
	const [images, setImages] = useState<Image[]>([]);
	const [imageVisibility, setImageVisibility] = useState<{ [id: string]: boolean }>({});

	useEffect(() => {
		const fetchImages = async () => {
			const response = await fetch(API_ENDPOINT);
			const data = await response.json();
			setImages(data.reverse());
		};
		fetchImages();
	}, []);

	useEffect(() => {
		if (props.newPhoto.id) {
			setImages((prevState) => [props.newPhoto, ...prevState]);
		}
	}, [props.newPhoto]);

	const toggleImageVisibility = (imageId: string) => {
		setImageVisibility((prevVisibility) => ({
			...prevVisibility,
			[imageId]: !prevVisibility[imageId],
		}));
	};

	const handleDeleteBtn = (imageId: string) => {
		console.log("clicked", imageId);
	};

	return (
		<main className={styles.gallery}>
			<div className={styles.card}>
				{images.map((image) => {
					return (
						<div
							className={styles.card__cont}
							key={image.id}
							onClick={() => toggleImageVisibility(image.id)}>
							<img src={image.url} alt={image.label} />
							{imageVisibility[image.id] && (
								<button onClick={() => handleDeleteBtn(image.id)}>delete</button>
							)}
							{imageVisibility[image.id] && <p>{image.label}</p>}
						</div>
					);
				})}
			</div>
		</main>
	);
}
