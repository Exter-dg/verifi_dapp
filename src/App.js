  import './App.css';
  import { useState } from 'react';
  import { ethers } from 'ethers'
  import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json'
  import Verifi from './artifacts/contracts/verifi.sol/Verifi.json'
  //import Token from './artifacts/contracts/Token.sol/Token.json'

  // address from npx hardhat run scripts/deploy.js --network localhost
  const greeterAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"
  const verifiAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9"
  //const tokenAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"

  function App() {
    const [greeting, setGreetingValue] = useState('')
    //const [userAccount, setUserAccount] = useState()
    //const [amount, setAmount] = useState()

    async function requestAccount() {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
    }

    async function fetchGreeting() {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        console.log({ provider })
        const contract = new ethers.Contract(greeterAddress, Greeter.abi, provider)
        try {
          const data = await contract.greet()
          console.log('data: ', data)
        } catch (err) {
          console.log("Error: ", err)
        }
      }    
    }

    /*async function getBalance() {
      if (typeof window.ethereum !== 'undefined') {
        const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(tokenAddress, Token.abi, provider)
        const balance = await contract.balanceOf(account);
        console.log("Balance: ", balance.toString());
      }
    }*/

    async function setGreeting() {
      if (!greeting) return
      if (typeof window.ethereum !== 'undefined') {
        await requestAccount()
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        console.log({ provider })
        const signer = provider.getSigner()
        const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer)
        const transaction = await contract.setGreeting(greeting)
        await transaction.wait()
        fetchGreeting()
      }
    }

    /*async function sendCoins() {
      if (typeof window.ethereum !== 'undefined') {
        await requestAccount()
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(tokenAddress, Token.abi, signer);
        const transaction = await contract.transfer(userAccount, amount);
        await transaction.wait();
        console.log(`${amount} Coins successfully sent to ${userAccount}`);
      }
    }*/


    /*
      Function 1 : findOwner() from verifi
      read only function, pass a product id and it will return the product's owner
    */

    /*
      Function 2 : addNewRetailer() from verifi 
      input: address _retailerAddr, string memory _name
      returns nothing 
    */

    /*
      Function 3 : createProduct() from verifi
      input: uint  _id
      returns nothing 
    */

    /*
      Function 4 : transferOwnership() from verifi
      input:uint _productId, address _buyerAddr 
      returns nothing
    */

    /*
      Function 5 : acceptOwnership() from verifi
      input: uint _productId
      returns nothing
    */

   // for more understanding - https://dev.to/steadylearner/how-to-make-a-fullstack-dapp-with-react-hardhat-and-ether-js-with-examples-4fi2
   // by googling use react with smart contract hardhat

    return (
      <div className="App">
        <header className="App-header">
          <button onClick={fetchGreeting}>Fetch Greeting</button>
          <button onClick={setGreeting}>Set Greeting</button>
          <input onChange={e => setGreetingValue(e.target.value)} placeholder="Set greeting" />
        </header>
      </div>
    );
  }

  export default App;
