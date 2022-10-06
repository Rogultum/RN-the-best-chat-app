import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
  },
  image: {
    flex: 0.5,
  },
  inner_container: {
    flexDirection: 'row',
    position: 'absolute',
    zIndex: 1,
    marginLeft: 8,
    marginTop: 4,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
