import DialogModal from "./DialogModal";

import { useState } from "react";
import styles from "./AddPhoto.module.css";

const DialogModalTester = () => {
	const [isOpened, setIsOpened] = useState(false);

	return (
		<div>
			<button className={styles.btn} onClick={() => setIsOpened(true)}>
				Add a photo
			</button>

			<DialogModal
				title="Add a new photo"
				isOpened={isOpened}
				onClose={() => setIsOpened(false)}></DialogModal>
		</div>
	);
};

export default DialogModalTester;
