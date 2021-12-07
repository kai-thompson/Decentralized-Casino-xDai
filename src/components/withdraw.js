import React from "react";
import { useState } from "react";
import { withdraw } from "../util/interact.js";
import { Button, Col, Form  } from "react-bootstrap";

export default function Withdaw() {
  const [amount, setAmount] = useState();

  const withdrawAmount = () => {
    withdraw(amount);
  };

  return (
    <div>
      <Col sm={2}>
        <Form.Control value={amount} onInput={(e) => setAmount(e.target.value)}placeholder="Withdraw Amount"/>
      </Col>
      <Button size="sm" onClick={withdrawAmount} id="walletButton">
        Withdraw
      </Button>
    </div>
  );
}
