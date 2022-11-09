import React, { useEffect, useState } from 'react';
import { privateApi } from 'api/http-common';
import useAxiosPrivate from 'hooks/useAxiosPrivate';

const Home = (): React.ReactElement => {
  const [offset, setOffset] = useState(0);
  const [thread, setThread] = useState([]);
  const axiosPrivate = useAxiosPrivate();


  useEffect(() => {
    axiosPrivate
      .post('article/thread', { limit: 5, offset: 0 })
      .then((res) => {
        setThread(res.data);
      })
      .catch(console.log);
  }, []);
  return <div>Home</div>;
};

export default Home;
