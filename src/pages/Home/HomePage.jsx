import React, { useContext, useEffect, useState } from "react";
import "./HomePage.css";
import { CoinContext } from "../../context/CoinContext";
import { Link } from "react-router-dom";

const HomePage = () => {

  // MANAGE CONTEXT VALUE FROM coinCointext.jsx
  const { allCoin, currency } = useContext(CoinContext);

  // MANAGE displayCoin STATE
  const [displayCoin, setDisplayCoin] = useState([]);

  // MANAGE INPUT STATE
  const [input, setInput] = useState("")

  //HANDLE USER INPUT
  const inputHandler = (e) => {
    setInput(e.target.value)
    if(e.target.value === "") {
      setDisplayCoin(allCoin)
    }
  }

  //HANDLE SEARCH
  const searchHandler = async (e) => {
    e.preventDefault() //dissables page reload
    const coins = await allCoin.filter((item) => {
      return item.name.toLowerCase().includes(input.toLocaleLowerCase())
    })
    setDisplayCoin(coins)
  }

  // RE-RENDER DATA ON EVERY allCoin EVENT
  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin]);


  return (
    <div className="home">
      <div className="hero">
        <h1>
          Largest <br /> Crypto Marketplace
        </h1>
        <p>
          Welcome to the world's largest cryptocurrency marketplace. Sign up to
          explore more about crypto.
        </p>
        <form onSubmit={searchHandler}>
          <input onChange={inputHandler} list="coinlist" value={input}  type="text" placeholder="Search crypto..." required/>

          <datalist id="coinlist">
            {allCoin.map((item, i)=>(<option key={i} value={item.name} />))}
          </datalist>

          <button type="submit">Search</button>
        </form>
      </div>
      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{ textAlign: "center" }}>24H Change</p>
          <p className="market-cap">Market Cap</p>
        </div>

        {/* RENDER COIN DATA FROM API */}
        {
          displayCoin.slice(0,10).map((item, i)=>(
            <Link to={`/coin/${item.id}`} className="table-layout" key={i}>
              <p>{item.market_cap_rank}</p>
              <div>
                <img src={item.image} alt="" />
                <p>{item.name + " - " + item.symbol}</p>
              </div>
              <p>{currency.symbol} {item.current_price.toLocaleString()}</p>
              <p className={item.price_change_percentage_24h > 0 ?  "green" : "red"}>{Math.floor(item.price_change_percentage_24h*100)/100}</p>
              <p className="market-cap">{currency.symbol} {item.market_cap.toLocaleString()}</p>
            </Link>
          ))
        }
      </div>
    </div>
  );
};

export default HomePage;
