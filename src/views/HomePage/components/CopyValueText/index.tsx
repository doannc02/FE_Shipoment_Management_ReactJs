import { FaRegCopy } from "react-icons/fa";
import { toast } from "react-toastify";

interface CopyableTextProps {
  value: string;
  onCopy?: (copiedValue: string) => void;
}

const CopyableText = ({ value, onCopy }: CopyableTextProps) => {
  const shortValue = value.substring(0, 16);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    toast.success(`Copied value: ${value}!`);
    if (onCopy) {
      onCopy(value);
    }
  };

  return (
    <div className="flex items-center max-w-[140px] justify-between gap-2  p-2 border-2 border-green-700 bg-green-100 rounded-md">
      <span className="text-gray-600">{shortValue}...</span>
      <button
        onClick={handleCopy}
        className="p-1 text-blue-400 hover:text-blue-600 cursor-pointer"
      >
        <FaRegCopy />
      </button>
    </div>
  );
};

export default CopyableText;
