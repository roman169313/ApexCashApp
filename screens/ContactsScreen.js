import * as Contacts from 'expo-contacts';
import { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const ContactsScreen = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
        });

        if (data.length > 0) {
          setContacts(data);
        }
      }
    })();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.contactContainer}>
      <Text style={styles.contactName}>{item.name}</Text>
      {item.phoneNumbers && (
        <FlatList
          data={item.phoneNumbers}
          keyExtractor={(phoneNumber) => phoneNumber.id}
          renderItem={({ item: phoneNumber }) => (
            <Text style={styles.phoneNumber}>{phoneNumber.number}</Text>
          )}
        />
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        keyExtractor={(contact) => contact.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:35,
    backgroundColor: '#fff',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  contactContainer: {
    marginBottom: 20,
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  phoneNumber: {
    fontSize: 16,
    color: '#555',
  },
});

export default ContactsScreen;
