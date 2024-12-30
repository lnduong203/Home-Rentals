import { TbMoodEmpty } from "react-icons/tb";

const ListEmpty = ({name}) => {
  return (
    <div className="my-1 ml-5 flex items-center gap-1 md:text-lg">
      <TbMoodEmpty />
      <p className="font-medium">Don't have any {name} yet !</p>
    </div>
  );
};
export default ListEmpty;
