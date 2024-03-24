import styles from "./styles.module.css";

const Type = ({ types, filterType, setfilterType }) => {
	const onChange = ({ currentTarget: input }) => {
		if (input.checked) {
			const state = [...filterType, input.value];
			setfilterType(state);
		} else {
			const state = filterType.filter((val) => val !== input.value);
			setfilterType(state);
		}
	};

	return (
		<div className={styles.container}>
			<h1 className={styles.heading}>Filter By Type</h1>
			<div className={styles.genre_container}>
				{types.map((type) => (
					<div className={styles.genre} key={type}>
						<input
							className={styles.genre_input}
							type="checkbox"
							value={type.Type}
							onChange={onChange}
						/>
						<p className={styles.genre_label}>{type}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default Type;
