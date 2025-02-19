import React from "react";

interface FilterByAttributesProps {
  filter: string;
  setFilter: (value: string) => void;
}

const FilterByAttributes: React.FC<FilterByAttributesProps> = ({
  filter,
  setFilter,
}) => {
  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
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
        <option value="price-desc">Higher Price</option>
        <option value="price-asc">Lower Price</option>
        <option value="default">Default</option>
      </select>
    </div>
  );
};

export default FilterByAttributes;
