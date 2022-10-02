/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { View } from 'react-native';

import { FlashList } from '@shopify/flash-list';
import { collection, getDocs } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';

import ContactsList from '../../component/ContactsList/ContactsList';
import { getContacts } from '../../redux/slice/contactsSlice';
import { db } from '../../utils/firebase';
import styles from './ContactListScreen.style';

function ContactListScreen() {
  const dispatch = useDispatch();
  const contactsData = useSelector((state) => state.contacts.value);

  const fetchContacts = async () => {
    const docRef = collection(db, 'user');
    const docSnap = await getDocs(docRef);
    const contacts = [];
    docSnap.forEach((contact) => {
      contacts.push(contact.data());
    });
    dispatch(getContacts([...contacts]));
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const renderContacts = ({ item }) => <ContactsList contacts={item} />;

  return (
    <View style={styles.container}>
      <FlashList
        data={contactsData}
        renderItem={renderContacts}
        keyExtractor={(item) => item.id}
        estimatedItemSize={56}
      />
    </View>
  );
}

export default ContactListScreen;
