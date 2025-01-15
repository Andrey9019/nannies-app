/* eslint-disable react/prop-types */

const FilterByAttributes = ({ filter, setFilter }) => {
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div className="flex flex-col mb-8">
      <label htmlFor="filter" className="mb-2 font-medium text-gray-500">
        Filters
      </label>
      <select
        id="filter"
        value={filter}
        onChange={handleFilterChange}
        className="block text-base md:text-lg w-36 md:w-52 px-3 py-2 md:px-5 md:py-4  text-white bg-[--prime] border rounded-2xl shadow-sm"
      >
        <option value="rating-asc">Popular</option>
        <option value="prise-desc">Higher Price</option>
        <option value="prise-asc">Lower Price</option>
        <option value="default">Default</option>
      </select>
    </div>
  );
};

export default FilterByAttributes;
