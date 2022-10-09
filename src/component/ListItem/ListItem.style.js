import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 1.5,
  },
  inner_container: {
    padding: 3,
    flex: 1,
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  description_text: {
    fontWeight: '300',
    fontSize: 12,
    alignSelf: 'flex-start',
  },
});
