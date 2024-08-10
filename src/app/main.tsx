import { client } from "./client";
import { ConnectButton } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";
import { useActiveAccount } from "thirdweb/react";
import SuperchainDeposit from "./SuperchainDeposit";
import Review from "./Review";
import ReivewList from "./ReviewList";

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
        text="Bridge to Review chain"
      />
      <ConnectButton
        client={client}
        wallets={wallets}
        theme={"dark"}
        connectModal={{ size: "compact" }}
      />
      {account?.address && <SuperchainDeposit address={account?.address} />}
      <ReivewList />
      <Review account={account} />
    </>
  );
}
