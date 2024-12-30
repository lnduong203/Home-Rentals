const SearchNotFound = ({ searchValue, col }) => {
  return (
    <tbody>
      <tr>
        <td
          colSpan={col}
          className="border-t border-gray-700 py-5 text-center hover:bg-gray-800"
        >
          "{searchValue}" not found !
        </td>
      </tr>
    </tbody>
  );
};
export default SearchNotFound;
