import { client } from "./client";
import { ConnectButton } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";
import { useActiveAccount } from "thirdweb/react";
import SuperchainDeposit from "./SuperchainDeposit";
import SubmitReview from "./SubmitReview";
import ReivewList from "./ReviewList";
import AddChainButton from "./AddChainButton";

const wallets = [createWallet("io.metamask")];

const LinkButton = ({ url, text }) => {
  const handleClick = () => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      className="border border-black rounded-md p-1"
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export function Main() {
  const account = useActiveAccount();
  return (
    <>
      <LinkButton
        url={
          "https://rising-impact-3e40rbadm1-960cc017d57fe9ce.testnets.rollbridge.app/"
        }
        text="Bridge from ETH Sepolia to ReviewChain"
      />
      <AddChainButton />
      <ConnectButton
        client={client}
        wallets={wallets}
        theme={"dark"}
        connectModal={{ size: "compact" }}
      />
      {account?.address && <SuperchainDeposit address={account?.address} />}
      <ReivewList />
      <SubmitReview account={account} />
    </>
  );
}
