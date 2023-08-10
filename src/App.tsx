import AddPhoto from "./components/AddPhoto";
import Filter from "./components/Filter";
import Gallery from "./components/Gallery";

import styles from "./App.module.css";

function App() {
	return (
		<>
			<nav className={styles.nav}>
				<Filter />
				<AddPhoto />
			</nav>
			<main>
				<Gallery />
			</main>
		</>
	);
}

export default App;
