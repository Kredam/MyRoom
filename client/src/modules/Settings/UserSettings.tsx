import { UserDetails } from 'components';
import React, { ChangeEvent, useState } from 'react';

const UserSettings = (): React.ReactElement => {
  const [pendingChanges, setPendingChanges] = useState({
    Username: 'Kredam',
    Old_password: 'haligali',
    New_password: 'haligali2'
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setPendingChanges((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>
      <UserDetails pendingChanges={pendingChanges} handleChange={handleChange} />
    </>
  );
};

export default UserSettings;
