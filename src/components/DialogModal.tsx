import { MouseEvent, useEffect, useRef, useState } from "react";
import styles from "./DialogModal.module.css";

const API = "https://my-unsplash-api-pi.vercel.app/photos";

const isClickInsideRectangle = (e: MouseEvent, element: HTMLElement) => {
	const r = element.getBoundingClientRect();

	return (
		e.clientX > r.left &&
		e.clientX < r.right &&
		e.clientY > r.top &&
		e.clientY < r.bottom
	);
};

type Image = {
	id: string;
	url: string;
	label: string;
};

type Props = {
	title: string;
	isOpened: boolean;
	onClose: () => void;
	setNewPhoto: (img: Image) => void;
};

const DialogModal = ({ title, isOpened, onClose, setNewPhoto }: Props) => {
	const ref = useRef<HTMLDialogElement>(null);
	const [labelValue, setLabelValue] = useState("");
	const [photoUrlValue, setPhotoUrlValue] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [inputsValid, setInputsValid] = useState(true);

	useEffect(() => {
		if (isOpened) {
			ref.current?.showModal();
			document.body.classList.add("modal-open"); // prevent bg scroll
		} else {
			ref.current?.close();
			document.body.classList.remove("modal-open");
		}
	}, [isOpened]);

	const proceedAndClose = async () => {
		const urlPattern = /(https?:\/\/.*\.(?:png|jpg|jpeg|svg))/i;
		if (urlPattern.test(photoUrlValue) && labelValue.trim() !== "") {
			setIsLoading(true);
			setInputsValid(true);
			try {
				const response = await fetch(API, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						url: photoUrlValue,
						label: labelValue,
					}),
				});

				if (response.ok) {
					const photo = await response.json();
					setNewPhoto(photo.photo);
				} else {
					console.error("Error while fetching data:", response.status);
				}
			} catch (error) {
				console.error("An error occurred:", error);
			}

			setIsLoading(false);
			onClose();
			setLabelValue("");
			setPhotoUrlValue("");
		} else {
			setInputsValid(false);
		}
	};

	return (
		<dialog
			className={styles.container}
			ref={ref}
			onCancel={onClose}
			onClick={(e) =>
				ref.current && !isClickInsideRectangle(e, ref.current) && onClose()
			}>
			<h3>{title}</h3>

			<form className={inputsValid ? styles.valid : styles.invalid}>
				<label htmlFor="label">Label</label>
				<input
					type="text"
					id="label"
					placeholder="Enter a short label"
					value={labelValue}
					onChange={(e) => setLabelValue(e.target.value)}
				/>
				<label htmlFor="photo-url">Photo URL</label>
				<input
					type="text"
					id="photo-url"
					value={photoUrlValue}
					placeholder="Your image must end in png, jpg or jpeg"
					onChange={(e) => setPhotoUrlValue(e.target.value)}
				/>
			</form>

			<div className={styles.buttons}>
				<button onClick={onClose}>Cancel</button>
				<button onClick={proceedAndClose}>{isLoading ? "Updating..." : "Submit"}</button>
			</div>
		</dialog>
	);
};

export default DialogModal;
