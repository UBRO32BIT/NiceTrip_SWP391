import styles from "./styles.module.css";
import { useEffect } from 'react';

const Type = ({ types, filterType, setfilterType }) => {
	useEffect(() => {
		setfilterType(types);
	}, []);
	const onChange = ({ currentTarget: input }) => {
		
		if (input.checked) {
			const state = [...filterType, input.value];
			setfilterType(state);
		} else {
			const state = filterType.filter((val) => val !== input.value);
			setfilterType(state.length > 0 ? state : []); // Update here to set empty array if no checkbox is selected
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.genre_container}>
				{types.map((type) => (
					<div className={styles.genre} key={type}>
						<input
							className={styles.genre_input}
							type="checkbox"
							value={type}
							onChange={onChange} // Update to pass type instead of type.Type
							checked={filterType.includes(type)}
						/>
						<p className={styles.genre_label}>{type}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default Type;
