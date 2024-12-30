const Toggle = ({ isActive, onClick }) => {
  return (
    <div>
      <label
        onClick={onClick}
        className="relative inline-flex cursor-pointer items-center"
      >
        <input type="checkbox" checked={isActive} className="peer sr-only" />
        <div className="peer h-5 w-9 rounded-full bg-gray-200 transition-all duration-500 ease-in-out after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] hover:bg-gray-300 peer-checked:bg-indigo-600 peer-checked:after:translate-x-full peer-checked:after:border-white hover:peer-checked:bg-indigo-700 peer-focus:outline-0 peer-focus:ring-transparent"></div>
      </label>
    </div>
  );
};
export default Toggle;
