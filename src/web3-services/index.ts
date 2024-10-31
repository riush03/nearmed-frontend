import { NearmedContractInterface } from "./near-interface";
import { wallet } from "./near-wallet";

const contract = new NearmedContractInterface(wallet);

export { contract, wallet };
