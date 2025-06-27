import { BeatLoader } from "react-spinners";

const PreLoader = ({ visible = true }) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-70 z-50">
      <BeatLoader color="brand-500" size={15} />
    </div>
  );
};

export default PreLoader;
