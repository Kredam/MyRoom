import { lightBlue } from '@mui/material/colors';

const styles = {
  table: {
    height: '100%',
    marginTop: '52px',
    maxHeight: '80vh'
  },
  header: {
    boxShadow: '0 0 15px rgba(162, 162, 162, 0.10)',
    backgroundColor: 'rgba(162, 162, 162, 0.10)',
    border: '1px solid transparent',
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
  },
  row: {
    height: '25px'
  }
};

export default styles;
