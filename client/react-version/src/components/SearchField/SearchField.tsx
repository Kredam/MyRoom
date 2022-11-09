import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { styled, InputBase, alpha } from '@mui/material';

const SearchDiv = styled('div')(({ theme }) => ({
  position: 'relative',
  cursor: 'pointer',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  minWidth: '650px',
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginLeft: '0px !important',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto'
  }
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    cursor: 'pointer',
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('md')]: {
      width: '20ch'
    }
  }
}));

interface Props {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  name?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  value?: React.ComponentState;
}

const SearchField = ({
  onChange,
  onClick,
  name,
  autoFocus,
  disabled,
  value
}: Props): React.ReactElement => {
  return (
    <SearchDiv onClick={onClick}>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        onChange={onChange}
        disabled={disabled}
        autoFocus={autoFocus}
        name={name}
        value={value}
        fullWidth
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
      />
    </SearchDiv>
  );
};

export default SearchField;