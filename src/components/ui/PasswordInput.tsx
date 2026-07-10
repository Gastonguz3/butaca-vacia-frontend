import { FaEye, FaEyeSlash } from "react-icons/fa";

type PasswordInputProps = {
  value: string;
  onChange: (value: string) => void;
  visible: boolean;
  toggle: () => void;
  placeholder: string;
};

const PasswordInput = ({
  value,
  onChange,
  visible,
  toggle,
  placeholder,
}: PasswordInputProps) => {
  return (
    <div className="relative">
      <input
        type={visible ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl bg-black/40 px-4 py-3 pr-12 outline-none ring-1 ring-yellow-700/20 focus:ring-yellow-500"
      />

      <button
        type="button"
        onClick={toggle}
        className="absolute right-4 top-1/2 -translate-y-1/2"
      >
        {visible ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>
  );
};

export default PasswordInput;

