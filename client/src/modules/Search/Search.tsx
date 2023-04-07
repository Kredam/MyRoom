import React, { useState, useEffect } from 'react';
import { SearchModal } from 'components';
import { AxiosResponse } from 'axios';
import { api } from 'api/http-common';

interface Props {
  openModal: React.ComponentState;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  autoFocus: boolean;
}

const Search = ({ setOpenModal, openModal, autoFocus }: Props): React.ReactElement => {
  const [search, setSearch] = useState('');
  const [rooms, setRooms] = useState({ data: [], isLoading: true });

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(event.currentTarget.value);
  };

  const getSearch = (): void => {
    api
      .post('rooms/search/', { search })
      .then((res: AxiosResponse) => {
        setRooms({ data: res.data, isLoading: false });
      })
      .catch(() => {});
  };

  useEffect(() => {
    console.log(search);
    setRooms((previous) => ({
      ...previous,
      isLoading: true
    }));
    const controller = new AbortController();
    const timer = setTimeout(getSearch, 500);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [search]);

  return (
    <SearchModal
      autoFocus={autoFocus}
      search={search}
      handleSearch={handleSearch}
      setOpenModal={setOpenModal}
      openModal={openModal}
      results={rooms.data}
    />
  );
};

export default Search;
