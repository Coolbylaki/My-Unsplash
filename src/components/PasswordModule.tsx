import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react";
import styles from "./DialogModal.module.css";

const API_ENDPOINT = "https://my-unsplash-api-pi.vercel.app";

const isClickInsideRectangle = (e: MouseEvent, element: HTMLElement) => {
	const r = element.getBoundingClientRect();

	return (
		e.clientX > r.left &&
		e.clientX < r.right &&
		e.clientY > r.top &&
		e.clientY < r.bottom
	);
};

type Props = {
	title: string;
	isOpened: boolean;
	onClose: () => void;
	handleDelete: (imageId: string) => void;
	imageId: string;
};

const PasswordModule = ({ title, isOpened, onClose, handleDelete, imageId }: Props) => {
	const ref = useRef<HTMLDialogElement>(null);
	const [labelValue, setLabelValue] = useState("");
	const [password, setPassword] = useState("");
	const [inputsValid, setInputsValid] = useState(true);

	useEffect(() => {
		const fetchPassword = async () => {
			const response = await fetch(`${API_ENDPOINT}/password`);
			const data = await response.json();
			setPassword(data.password);
		};
		fetchPassword();
	}, []);

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
		if (password === labelValue) {
			setInputsValid(true);
			handleDelete(imageId);
			onClose();
		} else {
			setInputsValid(false);
		}
	};

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setLabelValue(value);
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
				<label htmlFor="password">Password</label>
				<input
					type="text"
					id="password"
					placeholder="**********"
					value={labelValue}
					onChange={onChangeHandler}
				/>
			</form>

			<div className={styles.buttons}>
				<button onClick={onClose}>Cancel</button>
				<button onClick={proceedAndClose}>Delete</button>
			</div>
		</dialog>
	);
};

export default PasswordModule;
