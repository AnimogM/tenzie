import React from "react";

const Dice = ({ value, held, id, holdDie }) => {
	return (
		<button
			onClick={() => holdDie(id)}
			className={`dice ${held ? "held" : ""}`}
		>
			{value}
		</button>
	);
};

export default Dice;
