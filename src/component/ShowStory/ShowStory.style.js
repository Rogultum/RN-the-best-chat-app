import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 0.7,
    borderWidth: 1,
  },
  image: {
    marginTop: 12,
    flex: 1,
    height: '100%',
    width: undefined,
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
