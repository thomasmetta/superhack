export function Main() {
    return <LinkButton 
    url={"https://rising-impact-3e40rbadm1-960cc017d57fe9ce.testnets.rollbridge.app/"} 
    text="Bridge to Review chain"/>;
  }


const LinkButton = ({ url, text }) => {
const handleClick = () => {
    window.open(url, '_blank', 'noopener,noreferrer');
};

return (
    <button
    className="border border-black rounded-md p-1" onClick={handleClick}>
    {text}
    </button>
);
};
