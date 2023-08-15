import Search from "./Search";
import styles from "./Filter.module.css";

type Props = {
	setLabel: (label: string) => void;
};

export default function Filter({ setLabel }: Props) {
	return (
		<section className={styles.main}>
			<aside className={styles.container}>
				<div>
					<h3>My Unsplash</h3>
					<p>devchallenges.io</p>
				</div>
			</aside>
			<Search setLabel={setLabel} />
		</section>
	);
}
