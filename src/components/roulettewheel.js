import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import roulettewheel from "../assets/roulettewheel.png";
import arrow from "../assets/arrow.png";
import { gamble, determineMax } from "../util/interact";
import { ethers } from "ethers";
import { ButtonGroup, Button, Col, Form} from "react-bootstrap";

const rouletteABI = require("../contracts/Roulette.json");
const rouletteAddress = "0x64040e35d6EcB5fC4dd25882dd411f7094a63E81";
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const rouletteContract = new ethers.Contract(
  rouletteAddress,
  rouletteABI,
  signer
);

export default function RouletteWheel() {
  const [betColour, setBetColour] = useState('');
  const [betValue, setBetValue] = useState('');
  const [angle, setAngle] = useState('');
  const [maxBet, setMaxBet] = useState('');

  useEffect (async () => {
    setMaxBet(ethers.utils.formatEther(await determineMax()).toString());
  }, []);

  let results = {
    winner: "N/A",
    amount: 0,
    colour: "N/A",
    number: 0,
  };

  const startGame = () => {
    gamble(betColour, betValue);
  };

  const winAngles = [
    55, 75, 95, 115, 135, 155, 175, 195, 215, 245, 265, 285, 305, 325, 345, 365,
    385, 65, 85, 105, 125, 145, 165, 185, 205, 235, 255, 275, 295, 315, 335,
    355, 375, 395, 45, 225,
  ];

  rouletteContract.on("Winner", (_winner, _amount, _colour, _number) => {
    console.log(_number.toString());
    console.log(_colour)
    setAngle(winAngles[_number.toString()]);
    results = {
      winner: _winner,
      amount: _amount,
      colour: _colour,
      number: _number,
    };
  });

  const arrowStlye = {
    position: "relative",
    right: "259px",
    top: "240px",
  };
  const styles = useSpring({
    config: {
      mass: 2,
      friction: 15,
      velocity: 10,
    },
    from: { rotateZ: 5 },
    to: { rotateZ: angle },
  });
  const betStyles = {
    position: "relative",
    top: "140px",
    left: "525px",
  }
  return (
    <div>
      <div style={betStyles}>
        <Col sm={2}>
          <h5 style={{ display: "inline-block", fontFamily: "sans-serif", color: "white "}}>Max bet: {maxBet} </h5>
          <Form.Control size="sm" value={betValue} onInput={(e) => setBetValue(e.target.value)} placeholder="Bet Amount"/>
        </Col>
        <ButtonGroup>
          <Button style={{backgroundColor: "black"}} variant="secondary" onClick={() => setBetColour(0)}>Black</Button>
          <Button style={{backgroundColor: "red"}} variant="secondary" onClick={() => setBetColour(1)}>Red</Button>
          <Button style={{backgroundColor: "#32CD32"}} variant="secondary" onClick={() => setBetColour(2)}>Green</Button>
        </ButtonGroup>
        <Button variant="primary" onClick={startGame}>Spin</Button>
      </div>
      <animated.img src={roulettewheel} style={styles} />
      <img src={arrow} alt="arrow" style={arrowStlye} />
    </div>
  );
}
// function generateRandom() {
//   function random(int) {
//     return Math.floor(Math.random() * int);
//   }
//   const win = random(35);
//   const blackWins = [
//     55, 75, 95, 115, 135, 155, 175, 195, 215, 245, 265, 285, 305, 325, 345, 365,
//     385,
//   ];
//   const redWins = [
//     65, 85, 105, 125, 145, 165, 185, 205, 235, 255, 275, 295, 315, 335, 355,
//     375, 395,
//   ];
//   const greenWins = [45, 225];

//   if (win >= 34) {
//     return {
//       value: greenWins[random(1)],
//       colour: "Green",
//     };
//   }
//   if (win < 16) {
//     return {
//       value: blackWins[random(16)],
//       colour: "Black",
//     };
//   } else {
//     return {
//       value: redWins[random(16)],
//       colour: "Red",
//     };
//   }
// }
