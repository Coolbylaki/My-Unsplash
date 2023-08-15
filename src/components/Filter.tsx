import Search from "./Search";
import styles from "./Filter.module.css";

export default function Filter() {
	return (
		<section className={styles.main}>
			<aside className={styles.container}>
				<div>
					<h3>My Unsplash</h3>
					<p>devchallenges.io</p>
				</div>
			</aside>
			<Search />
		</section>
	);
}
