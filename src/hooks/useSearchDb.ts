import { useCallback, useMemo, useState } from "react";
import { DbCard } from "../types";

const filterData = (search: String, data: DbCard[]): DbCard[] => {
  const searchLower = search?.toLowerCase();
  return data?.filter ? data?.filter((item: DbCard) => item?.name?.toLowerCase().includes(searchLower)) : [];
};

const useSearchDb = (data: DbCard[]) => {
  const [searchStringDb, setSearchStringDb] = useState<string>("");

  const resultsDb: DbCard[] = useMemo(() => filterData(searchStringDb, data), [searchStringDb, data]);

  const changeDb = useCallback((value: string) => {
    setSearchStringDb(value);
  }, []);

  const noResultsDb = searchStringDb.length > 0 && resultsDb?.length === 0;

  return {
    resultsDb,
    searchStringDb,
    changeDb,
    noResultsDb
  };
};

export default useSearchDb;
