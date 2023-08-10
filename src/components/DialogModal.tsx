import { MouseEvent, useEffect, useRef } from "react";
import styles from "./DialogModal.module.css";

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
};

const DialogModal = ({ title, isOpened, onClose }: Props) => {
	const ref = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		if (isOpened) {
			ref.current?.showModal();
			document.body.classList.add("modal-open"); // prevent bg scroll
		} else {
			ref.current?.close();
			document.body.classList.remove("modal-open");
		}
	}, [isOpened]);

	const proceedAndClose = () => {
		onClose();
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

			<form>
				<label htmlFor="label">Label</label>
				<input type="text" id="label" placeholder="Enter a label" />
				<label htmlFor="photo-url">Photo URL</label>
				<input
					type="text"
					id="photo-url"
					placeholder="https://images.unsplash.com/photo-1584395630827-860eee694d7b?ixlib=r..."
				/>
			</form>

			<div className={styles.buttons}>
				<button onClick={onClose}>Cancel</button>
				<button onClick={proceedAndClose}>Submit</button>
			</div>
		</dialog>
	);
};

export default DialogModal;
