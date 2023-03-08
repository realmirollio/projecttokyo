import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utils/constants';

export const TransactionContext = React.createContext();

let isConnected = true;
const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

    return transactionContract;
}

export const TransactionProvider = ({ children }) => {
    
    const [currentAccount, setCurrentAccount] = useState("");
    const [formData, setFormData] = useState({addressTo: '', amount: ''});
    const handleChange = (e, name) => {
        setFormData((prevState) => ({...prevState, [name]: e.target.value}));
    }
    
    const checkIfWalletIsConnected = async () => {

        try {
        
        if(!ethereum) return alert("Първо инсталирайте Metamask!")
        
        const accounts = await ethereum.request({method: 'eth_accounts'});
        
        if (accounts.length) {
            setCurrentAccount(accounts[0]);
        } else {
            console.log('Не е намерен акаунт')
        }

        } catch (error) {
            console.log(error)
            throw new Error ('No ethereum object.')
        }
        
    }

    const DisconnectWallet = async () => {
        try {
            if(!ethereum) return alert("Първо инсталирайте Metamask!")

            web3Modal.clearCachedProvider()

            isConnected = true;
        } catch (error) {
            console.log(error)
            throw new Error("No Ethereum object")
        }
    }

    const connectWallet = async () => {
        try {
            if(!ethereum) return alert("Първо инсталирайте Metamask!")
            const accounts = await ethereum.request({method: 'eth_requestAccounts'});

            setCurrentAccount(accounts[0]);
            isConnected = false;
        } catch (error) {
            console.log(error)
            throw new Error("No Ethereum object")
        }
        
    }

    const sendTransaction = async () => {
        try {
            if(!ethereum) return alert("Първо инсталирайте Metamask!")

            const { addressTo, amount } = formData;
            const parsedAmount = ethers.utils.parseEther(amount);

            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: '0x5208', // 21000 GWEI
                    value: parsedAmount._hex, 
                }]
            })
        } catch (error) {
            console.log(error)
            throw new Error("No Ethereum object")
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);
    
    return(
       <TransactionContext.Provider value = {{connectWallet, currentAccount, formData, setFormData, handleChange, sendTransaction, isConnected, DisconnectWallet}}>
        { children }
       </TransactionContext.Provider>
    )
}