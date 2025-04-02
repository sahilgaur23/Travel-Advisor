import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  paper: {
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100px',
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'scale(1.05)',
    }
  },
  mapContainer: {
    height: '85vh',
    width: '100%',
  },
  markerContainer: {
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    zIndex: 1,
    '&:hover': {
      zIndex: 2,
    },
    transition: 'z-index 0.3s ease',
  },
  pointer: {
    width: '100%',
    height: 'auto',
    objectFit: 'cover',
  },
  typography: {
    marginBottom: '5px',
  }
}));
