import React from "react";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import { deposit, getBalance } from "../util/interact.js";
import { Button, Col, Form } from "react-bootstrap";

export default function Deposit() {
  const [amount, setAmount] = useState();
  const [userBalance, setUserBalance] = useState();

  useEffect (async () => {
    setUserBalance(ethers.utils.formatEther(await getBalance()).toString());
  }, []);

  const depositAmount = () => {
    deposit(amount);
  };

  return (
    <div>
      <Col sm={2}>
        <h5 style={{ display: "inline-block", fontFamily: "sans-serif", color: "white "}}>Pool Balance: {userBalance} </h5>
        <Form.Control
          value={amount}
          onInput={(e) => setAmount(e.target.value)}
          placeholder="Deposit Amount"
        />
      </Col>
      <Button size="sm" onClick={depositAmount} id="walletButton">
        Deposit
      </Button>
    </div>
  );
}
