import { Button, Stack, Typography, useMediaQuery } from "@mui/material";
import { useCallback, useState } from "react";
import NewPlaceDialog from "./dialogs/NewPlaceDialog";
import { wallet } from "@dapp/web3-services";
import Image from "next/image";
import placesLogo from "@dapp/images/places-logo.png";
import CustomMenu from "./CustomMenu";
import useWeb3Auth from "@dapp/hooks/useWeb3Auth";
import { Doctor } from "@dapp/web3-services/near-interface";
import { contract } from "@dapp/web3-services";
import { useRouter } from "next/navigation";
import { NETWORK } from "@dapp/web3-services/near-wallet";


const Navbar = () => {
  const isUnder818 = useMediaQuery("(max-width:818px)");
  const maxWidth615 = useMediaQuery("(max-width:615px)");
  const isUnder400 = useMediaQuery("(max-width:400px)");
  const [openNewPlaceDialog, setOpenNewPlaceDialog] = useState(false);
  const [doctor, setDoctors] = useState<Doctor[] | null>(null);
  const { isWalletConnected, ready,accountId  } = useWeb3Auth();
  const router = useRouter();

  const connectWalletHandler = useCallback(async () => {
    wallet.startUp(true);

    if (isWalletConnected && accountId) {
      router.push("/dashboard");  // Redirect to dashboard if connected and account ID exists
    } else {
      router.push("/register");    // Redirect to register if not connected or no account ID
    }
  }, [router]);

  return (
    <Stack
      direction={maxWidth615 ? "column" : "row"}
      justifyContent="space-between"
      alignItems="center"
      bgcolor="#080A0B"
      sx={{ padding: isUnder400 ? "18px 12px" : "18px 32px" }}
    >
      <h1 className="text-3xl font-bold tracking-tight text-white">
      Near<span className="text-blue-300">med</span>
       </h1>

      <Typography
        fontSize={16}
        color="white"
        mb={maxWidth615 ? 1 : 0}
        mt={maxWidth615 ? 1 : 0}
      >
        network: <strong>{NETWORK}</strong>
      </Typography>

      <Stack
        direction={maxWidth615 ? "row-reverse" : "row"}
        width={maxWidth615 ? "100%" : "initial"}
        justifyContent={maxWidth615 ? "space-between" : "start"}
      >
        {isWalletConnected && (
          <Button
            onClick={() => setOpenNewPlaceDialog(true)}
            variant="contained"
            size={isUnder818 ? "small" : "medium"}
            sx={{
              background: "#3a5c5c",
              color: "#ffffff",
              textTransform: "none",
              fontSize: 16,
              mr: isWalletConnected ? 2 : 0,
            }}
          >
            {accountId}
          </Button>
        )}

        {!isWalletConnected && ready && (
          <Button
            variant="contained"
            size={isUnder818 ? "small" : "medium"}
            sx={{
              background: "#2852E3",
              color: "#ffffff",
              textTransform: "none",
              fontSize: 16,
            }}
            onClick={connectWalletHandler}
          >
            Connect Wallet
          </Button>
        )}

        <CustomMenu sx={{ ml: maxWidth615 ? 0 : 1 }} />
      </Stack>

    </Stack>
  );
};

export default Navbar;
