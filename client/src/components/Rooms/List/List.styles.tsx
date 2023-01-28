const styles = {
  itemText: {
    textOverflow: 'ellipsis'
  },
  itemHeight: {
    height: '70px',
    textOverflow: 'ellipsis'
  },
  basicGrid: {
    overflowY: 'scroll',
    height: '97%',

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
