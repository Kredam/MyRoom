import React, { useContext, useState } from 'react';
import { AppBar, Box, IconButton, Menu, Toolbar, MenuItem, Tooltip } from '@mui/material';
import routes from 'routes/routes';
import HomeIcon from '@mui/icons-material/Home';
import ListIcon from '@mui/icons-material/List';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import styles from './Navbar.styles';
import AuthContext from 'hooks/AuthProvider';
import { Search } from 'modules';
import SearchField from 'components/Search/SearchField/SearchField';
import { privateApi } from 'api/http-common';
import { useSnackbar } from 'notistack';

const Navbar = (): React.ReactElement => {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [openModal, setOpenModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>();

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

  const logout = (): void => {
    handleClose();
    privateApi
      .get('token/logout')
      .then(() => {
        enqueueSnackbar('Successful logout', { variant: 'success' });
        navigate(routes.Login);
      })
      .catch(() => {
        enqueueSnackbar('Unsuccessful logout', { variant: 'error' });
      });
    setAuth({ access: '', refresh: '' });
  };

  return (
    <Box sx={styles.navbar}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            sx={styles.icon}
            size="medium"
            edge="start"
            onClick={() => switchTab(routes.LandingPage)}
            aria-label="Landing Page"
          >
            <HomeIcon />
          </IconButton>
          <Tooltip title="Spaces" placement="bottom">
            <IconButton
              sx={styles.icon}
              size="medium"
              edge="start"
              onClick={() => switchTab(routes.Spaces)}
              aria-label="RoomsView"
            >
              <ListIcon />
            </IconButton>
          </Tooltip>
          {/* implement own styled search component */}
          <Box flexGrow="1" />
          {openModal ? (
            <Search autoFocus={true} setOpenModal={setOpenModal} openModal={openModal} />
          ) : (
            <SearchField
              disabled={true}
              onClick={() => {
                setOpenModal(true);
              }}
            />
          )}
          <Box flexGrow="1" />
          <IconButton size="medium" edge="end" onClick={openUserMenu} aria-label="User">
            <AccountCircleIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
            {auth.access.length === 0 ? (
              <>
                <MenuItem onClick={() => switchTab(routes.Login)}>Log in</MenuItem>
                <MenuItem onClick={() => switchTab(routes.Register)}>Register</MenuItem>
              </>
            ) : (
              <MenuItem onClick={() => logout()}>Log out</MenuItem>
            )}
            <MenuItem onClick={() => switchTab(routes.Settings)}>Settings</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
