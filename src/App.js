import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Trump from "./assets/pictures/trump.jpg";
import Biden from "./assets/pictures/biden.jpg";
import { ethers } from "ethers";
import Button from "react-bootstrap/Button";
import ProgressBar from "react-bootstrap/ProgressBar";
import abi from "./utils/Voting.json";
import Card from "react-bootstrap/Card";
import styled from "styled-components";
import { PieChart } from 'react-minimal-pie-chart';

const App = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const contractAddress = "0xDf455f74042d20DF916054b55e851346Eca10839";
  const contractABI = abi.abi;
  const network = "rinkeby";
  const [voteChoice, setVoteChoice] = useState([]);
  const [allVotes, setAllVotes] = useState([]);
  const [totalTrump, setTotalTrump] = useState(0);
  const [totalBiden, setTotalBiden] = useState(0);
  const [totalVotes, setTotalVotes] = useState(0);



  const setVotes = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const voteDappContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        let totalVotes = await voteDappContract.getTotalVotes();
        let totalTrump = await voteDappContract.getTotalTrump();
        let totalBiden = await voteDappContract.getTotalBiden();
        setTotalBiden(totalBiden.toNumber());
        setTotalTrump(totalTrump.toNumber());
        setTotalVotes(totalVotes.toNumber());
        console.log("Retrieving vote counts...");
        console.log("Total vote count:", totalVotes.toNumber());
        console.log("Total trump count:", totalTrump.toNumber());
        console.log("Total biden count:", totalBiden.toNumber());


      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  setVotes();

  function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
  }


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

  const voteTrump = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const voteDappContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        let totalVotes = await voteDappContract.getTotalVotes();
        let totalTrump = await voteDappContract.getTotalTrump();
        let totalBiden = await voteDappContract.getTotalBiden();
        console.log("Retrieving vote counts...");
        console.log("Total vote count:", totalVotes.toNumber());
        console.log("Total trump count:", totalTrump.toNumber());
        console.log("Total biden count:", totalBiden.toNumber());


        const voteTxn = await voteDappContract.votetrump(
          "This is vote for trump by " + currentAccount,
          { gasLimit: 420690 }
        );


        console.log("Mining...", voteTxn.hash);
        await voteTxn.wait();
        console.log("Done! Check it here:", "https://rinkeby.etherscan.io/tx/" + voteTxn.hash);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };


  const voteBiden = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const voteDappContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        let totalVotes = await voteDappContract.getTotalVotes();
        let totalTrump = await voteDappContract.getTotalTrump();
        let totalBiden = await voteDappContract.getTotalBiden();
        console.log("Retrieving vote counts...");
        console.log("Total vote count:", totalVotes.toNumber());
        console.log("Total trump count:", totalTrump.toNumber());
        console.log("Total biden count:", totalBiden.toNumber());

        


        const voteTxn = await voteDappContract.votebiden(
          "This is vote for biden by " + currentAccount,
          { gasLimit: 420690 }
        );


        console.log("Mining...", voteTxn.hash);
        await voteTxn.wait();
        console.log("Done! Check it here:", "https://rinkeby.etherscan.io/tx/" + voteTxn.hash);


      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  

  // Connect Wallet function
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
      <div className="space" />
        <div className="padding: 10rem">
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={Biden} />
            <Card.Body>
              <Card.Title>Joe Biden</Card.Title>
              <Card.Text>
                President Biden represented Delaware for 36 years in the U.S.
                Senate before becoming the 47th Vice President of the United
                States. As President, Biden will restore America’s leadership
                and build our communities back better.
              </Card.Text>
              <Button variant="primary" onClick={voteBiden}>
                Vote For Joe Biden
              </Button>
            </Card.Body>
          </Card>
        </div>
        <div className="space" />
        <div className="chart">
          <p><b>Total: {totalVotes} | Trump: {totalTrump} | Biden: {totalBiden}</b></p>
        <PieChart
            data={[
            { title: 'Trump', value: totalTrump, color: '#e31c3d' },
             { title: 'Biden', value: totalBiden, color: '#3174ce' },

            ]}/>;
        </div>
        <div className="space" />
        
        <div className="padding: 10rem">
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={Trump} />
            <Card.Body>
              <Card.Title>Donald Trump</Card.Title>
              <Card.Text>
                Ex-President Trump represented the United States Of America for
                4 years before ending his term, losing to Joe biden. If
                reelected, trump will make america great again. He aims to
                create a non-rigged election with blockchain"
              </Card.Text>
              <Button variant="primary" onClick={voteTrump}>
                Vote For Donald Trump
              </Button>
            </Card.Body>
          </Card>
          

         

        </div>
        <div className="space" />
        <div>

</div>
      </div>

      {/* Connect Wallet */}
      <div className="topcorner">
        <Button onClick={connectWallet} variant="primary">
          {!currentAccount && <span>Connect Wallet to {network}</span>}
          {currentAccount && <span>Connected to {currentAccount}</span>}
        </Button>
      </div>
    </div>
  );
};

export default App;
