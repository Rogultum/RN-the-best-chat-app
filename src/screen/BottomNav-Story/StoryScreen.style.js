import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: { flex: 1 },
  story_container: {
    flexDirection: 'row',
  },
  story_button: {
    marginLeft: 12,
    marginTop: 9,
  },
  story_text: {
    position: 'absolute',
    top: 56,
    marginTop: -8,
    marginBottom: 12,
    marginLeft: 4,
  },
  quote_container: {
    flex: 1,
    marginLeft: 27,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderTopRightRadius: 17,
    borderBottomRightRadius: 17,
    marginBottom: 50,
  },
  quote_text: {
    fontWeight: '300',
    fontSize: 15,
    fontStyle: 'italic',
    padding: 2.5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  close_button: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  selection_button: {
    flexDirection: 'row',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
