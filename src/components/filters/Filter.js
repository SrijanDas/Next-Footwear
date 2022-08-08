import { HiFilter, HiSortAscending } from "react-icons/hi";
import SorterModal from "./SorterModal";
import { useState } from "react";
import FilterModal from "./FilterModal";
import { isMobile } from "react-device-detect";

const MobileFilter = () => {
  const [sortModalOpen, setSortModalOpen] = useState(false);
  const toggleSortModal = () => setSortModalOpen(!sortModalOpen);

  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const toggleFilterModal = () => setFilterModalOpen(!filterModalOpen);

  return (
    <div className="flex items-center w-full md:justify-end btn-group mb-2">
      <button
        onClick={toggleSortModal}
        className="btn btn-ghost gap-2 w-1/2 md:w-auto rounded-none border-r-2 border-r-slate-200 shadow-md"
      >
        <HiSortAscending className="h-5 w-5" />
        Sort
      </button>
      <button
        onClick={toggleFilterModal}
        className="btn btn-ghost gap-2 w-1/2 md:w-auto rounded-none border-l-2 border-l-slate-200 shadow-md"
      >
        <HiFilter className="h-5 w-5" />
        Filter
      </button>
      <SorterModal isOpen={sortModalOpen} onClose={toggleSortModal} />
      <FilterModal isOpen={filterModalOpen} onClose={toggleFilterModal} />
    </div>
  );
};

export default MobileFilter;
