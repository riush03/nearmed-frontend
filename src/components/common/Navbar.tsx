"use client"

import { useCallback, useState } from "react";
import { Button } from "../ui/button";
import { wallet } from "@dapp/web3-services";
import useWeb3Auth from "@dapp/hooks/useWeb3Auth";
import { NETWORK } from "@dapp/web3-services/near-wallet";
import Link from "next/link";


const Navbar = () => {
  const { isWalletConnected, ready } = useWeb3Auth();

  const connectWalletHandler = useCallback(() => {
    wallet.startUp(true);
  }, []);

  return (
    <nav className="flex items-center justify-between w-full px-6 py-4 bg-white shadow-md">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold text-blue-600">
          Med<span className="text-green-500">Hub</span>
        </h1>
      </div>
      <div className="flex items-center space-x-6">
        <Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
          About
        </Link>
        <Link href="/terms" className="text-gray-600 hover:text-blue-600 transition-colors">
          Terms
        </Link>
        <Link href="/privacy" className="text-gray-600 hover:text-blue-600 transition-colors">
          Privacy Policy
        </Link>
        <div className="flex items-center space-x-4">
            
            {isWalletConnected ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">
                 
                </span>
                <Button onClick={connectWalletHandler} >
                  Disconnect
                </Button>
              </div>
            ) : (
              <Button onClick={connectWalletHandler}>Connect Wallet</Button>
            )}
          </div>
        
      </div>
    </nav>
  );
};

export default Navbar;
