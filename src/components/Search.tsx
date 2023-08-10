import styles from "./Search.module.css";

export default function Search() {
	return (
		<div className={styles.container}>
			<input type="text" className={styles.input} placeholder="Search by name" />
			<i className="fa-solid fa-magnifying-glass fa-lg"></i>
		</div>
	);
}
