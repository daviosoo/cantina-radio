import {Linking, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';

import Icon from 'react-native-vector-icons/FontAwesome';

const Link = ({url, iconName}: {url: string; iconName: string}) => {
  const onPressLink = (uri: string) => {
    Linking.openURL(uri);
  };

  return (
    <TouchableOpacity
      style={styles.linkButton}
      onPress={() => onPressLink(url)}>
      <Icon name={iconName} size={40} color="white" />
    </TouchableOpacity>
  );
};

const Links = () => {
  const links = [
    {
      iconName: 'external-link',
      url: 'https://www.lacantinadesergiozapata.com/',
    },
    {
      iconName: 'facebook-square',
      url: 'https://www.facebook.com/LaCantinaDeSergioZapata',
    },

    {
      iconName: 'instagram',
      url: 'https://www.instagram.com/sergiozapatamanager/',
    },
    {
      iconName: 'spotify',
      url: 'https://open.spotify.com/show/0UVoyeRNXKYzFHdHJ1Bfbf?si=ff325f0de6a54d66',
    },
    {
      iconName: 'youtube',
      url: 'https://www.youtube.com/@LACANTINADESERGIOZAPATA',
    },
  ];

  return (
    <View style={styles.linksContainer}>
      {links.map(link => {
        return (
          <Link key={link.iconName} url={link.url} iconName={link.iconName} />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  linksContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  linkButton: {
    marginTop: 20,
  },
});

export default Links;
