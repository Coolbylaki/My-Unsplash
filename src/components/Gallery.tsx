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
	label: string;
};

export default function Gallery({ newPhoto, label }: Props) {
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
		if (newPhoto.id) {
			setImages((prevState) => [newPhoto, ...prevState]);
		}
	}, [newPhoto]);

	const toggleImageVisibility = (imageId: string) => {
		setImageVisibility((prevVisibility) => ({
			...prevVisibility,
			[imageId]: !prevVisibility[imageId],
		}));
	};

	const handleDeleteBtn = async (imageId: string) => {
		try {
			const response = await fetch(`${API_ENDPOINT}/${imageId}`, {
				method: "DELETE",
			});

			if (response.ok) {
				// If delete request is successful, update state to remove the image
				const updatedImages = images.filter((image) => image.id !== imageId);
				setImages(updatedImages);

				// Also update the visibility state to hide the deleted image's button and paragraph
				setImageVisibility((prevVisibility) => ({
					...prevVisibility,
					[imageId]: false,
				}));
			} else {
				console.log("Delete request failed");
			}
		} catch (error) {
			console.error("Error deleting image:", error);
		}
	};

	return (
		<main className={styles.gallery}>
			<div className={styles.card}>
				{images
					.filter(
						(image) => image.label.toLowerCase().includes(label.toLowerCase()) // Filter based on label
					)
					.map((image) => {
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
