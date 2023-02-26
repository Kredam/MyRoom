const styles = {
  itemText: {
    textOverflow: 'ellipsis'
  },
  list: {
    // backgroundColor: '#1f1f1f'
    boxShadow: '0 0 15px rgba(162, 162, 162, 0.10)',
    borderRadius: '16px'
  },
  item: {
    height: '85px',
    textOverflow: 'ellipsis'
  },
  basicGrid: {
    overflowY: 'scroll',
    height: '85vh',

    /* width */
    '&::-webkit-scrollbar': {
      width: '10px'
    },

    /* Track */
    '&::-webkit-scrollbar-track': {
      background: 'rgba(0, 0, 0, 0)',
      opacity: 0
    },

    /* Handle */
    '&::-webkit-scrollbar-thumb': {
      background: '#888'
    },

    /* Handle on hover */
    '&::-webkit-scrollbar-thumb:hover': {
      background: '#555'
    }
  }
};

export default styles;
