import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  input_container: {
    margin: 5,
    padding: 3,
    flexDirection: 'row',
  },
  input: {
    fontSize: 20,
    width: '90%',
  },
  icon: {
    paddingTop: 9,
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
    marginBottom: 14,
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
    textAlign: 'center',
  },
});
