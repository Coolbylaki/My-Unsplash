import DialogModal from "./DialogModal";

import { useState } from "react";
import styles from "./AddPhoto.module.css";

type Image = {
	id: string;
	url: string;
	label: string;
};

type Props = {
	setPhoto: (img: Image) => void;
};

const DialogModalTester = (props: Props) => {
	const [isOpened, setIsOpened] = useState(false);

	return (
		<div>
			<button className={styles.btn} onClick={() => setIsOpened(true)}>
				Add a photo
			</button>

			<DialogModal
				title="Add a new photo"
				isOpened={isOpened}
				onClose={() => setIsOpened(false)}
				setNewPhoto={props.setPhoto}></DialogModal>
		</div>
	);
};

export default DialogModalTester;
