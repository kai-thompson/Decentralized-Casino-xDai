import RouletteWheel from "./components/roulettewheel";
import Wallet from "./components/wallet";
import Deposit from "./components/deposit";
import Withdraw from "./components/withdraw";
import "./App.css";
import logo from "./assets/logo.png";

function App() {
  return (
    <div className="App">
      <style>{"body { background-color:#1b1b7e; }"}</style>
      <div className="header">
        <div className="wallet">
          <Wallet />
        </div>
        <img
          src={logo}
          style={{
            position: "relative",
            marginLeft: "250px",
            marginBottom: "25px",
          }}
        />
      </div>
      <div className="roulettewheel">
        <RouletteWheel />
      </div>
      <div className="deposit-withdrawal">
        <Deposit />
        <Withdraw />
      </div>
    </div>
  );
}

export default App;
