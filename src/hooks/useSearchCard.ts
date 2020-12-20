import { useCallback, useMemo, useState } from "react";
import { IPkmnCard, SearchType } from "../types";

const filterData = (search: string, data: SearchType | undefined): IPkmnCard[] | undefined => {
  const searchLower = search.toLowerCase();
  return data?.cards?.filter((item: any) => item.name.toLowerCase().includes(searchLower));
};

const useSearchCard = (data: SearchType | undefined) => {
  const [searchString, setSearchString] = useState<string>("");

  const results: IPkmnCard[] | undefined = useMemo(() => filterData(searchString, data), [searchString, data]);

  const change = useCallback((value: string) => {
    setSearchString(value);
  }, []);

  const noResults = searchString.length > 0 && results?.length === 0;

  return {
    results,
    searchString,
    change,
    noResults
  };
};

export default useSearchCard;
