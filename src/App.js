import React, { useEffect, useState } from "react";
import logo from './logo.svg';
import './App.css';
import President from "./components/President";
import Trump from './assets/pictures/trump.jpg';
import Biden from './assets/pictures/biden.jpg';
import { ethers } from "ethers";
import Button from 'react-bootstrap/Button';
import abi from "./utils/Voting.json";



const App = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const contractAddress = "0xB78F65F89cf219d4CEa869f82B00CAaF56b45810";
  const contractABI = abi.abi;
  const network = "rinkeby";
  


  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
        return account;
      } else {
        console.log("No authorized account found");
      }

    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
      return accounts[0];
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <div className="mainContainer">
      <div className="rowC">
          <div className="padding: 10rem">
            <President
            name="Joe Biden"
            description="President Biden represented Delaware for 36 years in the U.S. Senate before becoming the 47th Vice President of the United States. As President, Biden will restore America’s leadership and build our communities back better."
            picture={Biden}
            />
          </div>
          <div className="padding: 10rem">
            <President 
            name="Donald Trump"
            description="Ex-President Trump represented the United States Of America for 4 years before ending his term, losing to Joe biden. If reelected, trump will make america great again. He aims to create a non-rigged election with blockchain"
            picture={Trump}
            />
          </div>
        </div>
   
        
        {/* Connect Wallet */}
        <div className="topcorner">
           <Button  onClick={connectWallet} variant="primary">
             {!currentAccount && (
                <span>Connect Wallet to {network}</span>
              )}  
              {currentAccount && (
                
                <span>Connected to {currentAccount}</span>
              )}
            </Button>
          </div>
       
      </div>
    
  );
};

export default App;






