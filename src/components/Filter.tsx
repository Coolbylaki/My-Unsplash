import Search from "./Search";
import styles from "./Filter.module.css";

export default function Filter() {
	return (
		<section className={styles.main}>
			<aside className={styles.container}>
				<i className={"fa-solid fa-user fa-xl" + " " + styles.ico}></i>
				<div>
					<h3>My Unsplash</h3>
					<p>devchallenges.io</p>
				</div>
			</aside>
			<Search />
		</section>
	);
}
