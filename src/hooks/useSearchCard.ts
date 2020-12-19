import { useCallback, useMemo, useState } from "react";
import { IPkmnDetail } from "../types";

const filterData = (search: String, data: any): any => {
  const searchLower = search.toLowerCase();
  return data?.cards.filter((item: any) => item.name.toLowerCase().includes(searchLower));
};

const useSearchCard = (data: any) => {
  const [searchString, setSearchString] = useState<string>("");

  const results: any = useMemo(() => filterData(searchString, data), [searchString]);

  const change = useCallback((value: string) => {
    setSearchString(value);
  }, []);

  const noResults = searchString.length > 0 && results.length === 0;

  return {
    results,
    searchString,
    change,
    noResults
  };
};

export default useSearchCard;
