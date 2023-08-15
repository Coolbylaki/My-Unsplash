import { ChangeEvent } from "react";
import styles from "./Search.module.css";

type Props = {
	setLabel: (label: string) => void;
};

export default function Search({ setLabel }: Props) {
	const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
		const label = event.target?.value;
		setLabel(label);
	};

	return (
		<div className={styles.container}>
			<input
				onChange={onChangeHandler}
				type="text"
				className={styles.input}
				placeholder="Search by label"
			/>
			<i className="fa-solid fa-magnifying-glass fa-lg"></i>
		</div>
	);
}
