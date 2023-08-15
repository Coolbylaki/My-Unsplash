import AddPhoto from "./components/AddPhoto";
import Filter from "./components/Filter";
import Gallery from "./components/Gallery";

import styles from "./App.module.css";
import { useState } from "react";

type Image = {
	id: string;
	url: string;
	label: string;
};

function App() {
	const [newPhoto, setNewPhoto] = useState<Image>({
		id: "",
		url: "",
		label: "",
	});

	return (
		<>
			<nav className={styles.nav}>
				<Filter />
				<AddPhoto setPhoto={setNewPhoto} />
			</nav>
			<Gallery newPhoto={newPhoto} />
		</>
	);
}

export default App;
