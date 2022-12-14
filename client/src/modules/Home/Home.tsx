import React, { useEffect, useState } from 'react';
import { fetchThread } from 'api/services/services';

const Home = (): React.ReactElement => {
  // const [offset, setOffset] = useState(0);
  const [thread, setThread] = useState([]);

  useEffect(() => {
    fetchThread(0, 5)
      .then((res) => {
        setThread(res.data);
      })
      .catch(console.log);
  }, []);
  return <div>{thread}</div>;
};

export default Home;
