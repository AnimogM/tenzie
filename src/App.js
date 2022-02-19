import { useState, useEffect } from "react";
import uuid from "react-uuid";
import Confetti from "react-confetti";

import Dice from "./Dice";

function App() {
	const newDice = () => {
		return {
			held: false,
			value: Math.ceil(Math.random() * 6),
			id: uuid(),
		};
	};
	const createDice = () => {
		let arr = [];
		for (let i = 0; i < 15; i++) {
			arr.push(newDice());
		}
		return arr;
	};
	const [dice, setDice] = useState(createDice());
	const [tenzie, setTenzie] = useState(false);

	const holdDie = (id) => {
		console.log(id);
		setDice((prevDice) =>
			prevDice.map((die) => {
				if (die.id === id) {
					return { ...die, held: !die.held };
				}
				return die;
			})
		);
	};

	const rollDice = () => {
		if (!tenzie) {
			setDice((prevDice) =>
				prevDice.map((die) => (die.held ? die : newDice()))
			);
		}else{
      setTenzie(false)
      setDice(createDice())
    }
	};

	useEffect(() => {
		const allHeld = dice.every((die) => die.held);
		const checkValue = dice[0].value;
		const allValue = dice.every((die) => die.value === checkValue);
		if (allHeld && allValue) {
			setTenzie(true);
		}
	}, [dice]);

	return (
		<main>
			{tenzie && <Confetti />}
			<div className="text-box">
				<h1>Tenzies</h1>
				<p>
					Roll until all dice are the same. <br /> Click each die to
					freeze it at its current value between rolls.
				</p>
			</div>
			<div className="dice-container">
				{dice.map((die) => {
					return <Dice key={die.id} {...die} holdDie={holdDie} />;
				})}
			</div>
			{tenzie && <p>You Win!!! </p>}
			<button className="roll" onClick={rollDice}>
				{tenzie ? "New Game " : "Roll Dice"}
			</button>
		</main>
	);
}

export default App;
