import React, { useContext, useEffect, useState } from 'react';
import { AppBar, Box, IconButton, Menu, MenuItem, Toolbar } from '@mui/material';
import routes from 'routes/routes';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import styles from './Navbar.styles';
import { Search } from 'components';
import { api } from 'utils/http-common';
import AuthContext from 'hooks/AuthProvider';

const Navbar = (): React.ReactElement => {
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>();
  const [search, setSearch] = useState<String | null>('');
  // const [filter, setFilter] = useState('')
  const [rooms, setRooms] = useState({ data: [], isLoading: false });

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const switchTab = (path: string): void => {
    handleClose();
    navigate(path);
  };

  const openUserMenu = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.currentTarget.value;
    setSearch(value);
  };

  const searchRooms = (controller: AbortController): void => {
    api.get('rooms/all/', { signal: controller.signal }).then(console.log).catch(console.log);
  };

  const logout = (): void => {
    handleClose();
    setAuth({ access: '', refresh: '' });
  };

  const getSearch = (): void => {
    api
      .post('rooms/search/', { search })
      .then((res) => {
        console.log(rooms);
        setRooms(res.data);
      })
      .catch(() => {});
  };

  useEffect(() => {
    const controller = new AbortController();
    searchRooms(controller);
    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(getSearch, 2000);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [search]);

  return (
    <Box sx={styles.navbar}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            sx={styles.icon}
            size="medium"
            edge="start"
            onClick={() => switchTab(routes.Home)}
            aria-label="Home"
          >
            <HomeIcon />
          </IconButton>
          <IconButton
            sx={styles.icon}
            size="medium"
            edge="start"
            onClick={() => switchTab(routes.Rooms)}
            aria-label="Rooms"
          >
            <PeopleIcon />
          </IconButton>
          {/* implement own styled search component */}
          <Search handleSearch={handleSearch} search={search} />
          <IconButton size="medium" edge="end" onClick={openUserMenu} aria-label="User">
            <AccountCircleIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
            <MenuItem onClick={() => switchTab(routes.Login)} hidden={auth.access.length > 0}>
              Log in
            </MenuItem>
            <MenuItem onClick={() => switchTab(routes.Register)} hidden={auth.access.length > 0}>
              Register
            </MenuItem>
            <MenuItem onClick={() => logout()} hidden={auth.access.length === 0}>
              Log out
            </MenuItem>
            <MenuItem onClick={() => handleClose()}>Settings</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
