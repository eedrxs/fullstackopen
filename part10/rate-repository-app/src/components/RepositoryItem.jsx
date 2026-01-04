import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import theme from '../constants/theme'
import Text from './Text'

const RepositoryItem = ({ repo }) => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', gap: 20 }}>
        <Image source={{ uri: repo.ownerAvatarUrl }} style={styles.photo} />

        <View style={{ gap: 5 }}>
          <Text fontWeight="bold">{repo.fullName}</Text>
          <Text>{repo.description}</Text>
          <Text style={styles.language}>{repo.language}</Text>
        </View>
      </View>

      {/* stats */}
      <View style={styles.stats}>
        <Stat title="Stars" value={repo.stargazersCount} />
        <Stat title="Forks" value={repo.forksCount} />
        <Stat title="Reviews" value={repo.reviewCount} />
        <Stat title="Rating" value={repo.ratingAverage} />
      </View>
    </View>
  )
}

export default RepositoryItem

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white',
    gap: 20
  },
  photo: {
    width: 45,
    aspectRatio: 1,
    borderRadius: 5,
    alignSelf: 'flex-start'
  },
  language: {
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    color: 'white',
    padding: 4,
    alignSelf: 'flex-start'
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  stat: {
    gap: 5,
    alignItems: 'center'
  }
})


const Stat = ({ title, value }) => {
  return (
    <View style={styles.stat}>
      <Text fontWeight="bold" fontSize='subheading'>{formatCount(value)}</Text>
      <Text fontSize='subheading'>{title}</Text>
    </View>
  )
}

function formatCount(count) {
  if (count >= 1000) {
      return (count / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  }
  return count.toString();
}