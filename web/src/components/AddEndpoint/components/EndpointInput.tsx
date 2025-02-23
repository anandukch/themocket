import { verbDetails, VerbType } from "@/lib/constants/apiRequests.constants";
import DropDown from "../../Dropdown/DropDown";
import { FiExternalLink } from "react-icons/fi";
import { IoSaveOutline } from "react-icons/io5";

type Props = {
  verb: VerbType;
  setVerb: (verb: string) => void;
  // defaultVerb: VerbType;
  // defaultUrl?: string;
  url: string;
  setUrl?: (url: string) => void;
  onSave?: () => void;
  link: string;
};

const EndpointInput = (props: Props) => {
  return (
    <div className="w-full flex flex-row items-center justify-start h-[35px] gap-2">
      <div className="min-w-[140px]">
        <DropDown
          height={35}
          items={verbDetails}
          initialOption="GET"
          width={120}
          selectedOption={props.verb}
          setSelectedOption={props.setVerb}
        />
      </div>
      <input
        type="text"
        className="transparent w-full px-2 h-full rounded-md tracking-wider bg-white/10 text-sm focus:outline-none"
        placeholder="/users/1"
        defaultValue={props.url || ""}
        onChange={(e) => props.setUrl && props.setUrl(e.target.value)}
      />
      <button
        className="h-full w-8 flex items-center justify-center rounded-md bg-white/10 hover:bg-white/20 focus:outline-none cursor-pointer px-3"
        onClick={props.onSave}
      >
        <IoSaveOutline size={18} />
      </button>
      <a href={props.link || "#"} target="_blank" rel="noopener noreferrer">
        <FiExternalLink size={20} />
      </a>
    </div>
  );
};

export default EndpointInput;

{
  /* <div className="flex flex-row items-center tracking-wider text-white/50 min-w-fit text-sm rounded-md px-2 h-full">
{props.defaultPath}
</div> */
}
