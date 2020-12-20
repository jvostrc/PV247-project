import { useCallback, useMemo, useState } from "react";
import { IPkmnSet, SearchType } from "../types";

const filterData = (search: String, data: SearchType | undefined): IPkmnSet[] | undefined => {
  const searchLower = search.toLowerCase();
  return data?.sets?.filter((item: IPkmnSet) => item.name.toLowerCase().includes(searchLower));
};

const useSearchSet = (data: SearchType | undefined) => {
  const [searchString, setSearchString] = useState<string>("");

  const results: IPkmnSet[] | undefined = useMemo(() => filterData(searchString, data), [searchString, data]);

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

export default useSearchSet;
