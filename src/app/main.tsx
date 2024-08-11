import { client } from "./client";
import { ConnectButton } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";
import { useActiveAccount } from "thirdweb/react";
import SuperchainDeposit from "./SuperchainDeposit";
import SubmitReview from "./SubmitReview";
import ReivewList from "./ReviewList";
import AddChainButton from "./AddChainButton";
import EthBalance from "./EthBalance";

const wallets = [createWallet("io.metamask")];

const LinkButton = ({ url, text, className }) => {
  const handleClick = () => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <button className={className} onClick={handleClick}>
      {text}
    </button>
  );
};

export function Main() {
  const account = useActiveAccount();
  return (
    <>
      <ReivewList />
      <div className="flex flex-row space-x-4 max-w-md mx-auto">
        <LinkButton
          url={
            "https://rising-impact-3e40rbadm1-960cc017d57fe9ce.testnets.rollbridge.app/"
          }
          text="Bridge from ETH Sepolia to ReviewChain"
          className="min-w-[200px] px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600"
        />
        <AddChainButton className="min-w-[200px] px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600" />
        <ConnectButton
          client={client}
          wallets={wallets}
          theme={"dark"}
          connectModal={{ size: "compact" }}
        />
      </div>
      {account?.address && <EthBalance address={account?.address} />}
      {account?.address && <SuperchainDeposit address={account?.address} />}
      <SubmitReview account={account} />
    </>
  );
}
