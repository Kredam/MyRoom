import { lightBlue } from '@mui/material/colors';

const styles = {
  paper: {
    height: '60vh',
    marginTop: '54px',
    marginRight: '12px',
    marginLeft: '12px',
    boxShadow: '0 0 15px rgba(162, 162, 162, 0.10)',
    borderRadius: '16px'
  },
  avatar: {
    height: '56px',
    width: '56px',
    backgroundColor: lightBlue[500]
  },
  button: {
    color: 'black',
    borderColor: 'black',
    '&:hover': {
      backgroundColor: 'white',
      borderColor: 'black'
    }
  }
};

export default styles;
