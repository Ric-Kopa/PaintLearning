import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, Button, Card, SegmentedButtons, useTheme, IconButton, Chip } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useAppStore } from '../store';

type FilterType = 'all' | 'favorite';

export default function HistoryScreen() {
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const { artworks, toggleFavorite, setCurrentArtwork, deleteArtwork } = useAppStore();
  
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredArtworks = filter === 'favorite' 
    ? artworks.filter(a => a.isFavorite) 
    : artworks;

  const stats = {
    total: artworks.length,
    favorite: artworks.filter(a => a.isFavorite).length,
    withTutorial: artworks.filter(a => a.tutorial).length,
    withPractice: artworks.filter(a => a.practices.length > 0).length,
  };

  const handleArtworkPress = (artwork: any) => {
    setCurrentArtwork(artwork);
    navigation.navigate('Analysis', { artworkId: artwork.id });
  };

  const confirmDelete = (artworkId: string) => {
    Alert.alert(
      '确认删除',
      '确定要删除这个分析记录吗？',
      [
        { text: '取消', style: 'cancel' },
        { 
          text: '删除', 
          style: 'destructive', 
          onPress: () => {
            deleteArtwork(artworkId);
          }
        },
      ]
    );
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.statsSection}>
        <Text variant="titleLarge" style={styles.statsTitle}>学习统计</Text>
        <View style={styles.statsGrid}>
          <Card style={styles.statCard}>
            <Card.Content style={styles.statContent}>
              <Text variant="headlineMedium">{stats.total}</Text>
              <Text variant="bodyMedium">分析作品</Text>
            </Card.Content>
          </Card>
          <Card style={styles.statCard}>
            <Card.Content style={styles.statContent}>
              <Text variant="headlineMedium">{stats.withTutorial}</Text>
              <Text variant="bodyMedium">教程数量</Text>
            </Card.Content>
          </Card>
          <Card style={styles.statCard}>
            <Card.Content style={styles.statContent}>
              <Text variant="headlineMedium">{stats.withPractice}</Text>
              <Text variant="bodyMedium">练习次数</Text>
            </Card.Content>
          </Card>
          <Card style={styles.statCard}>
            <Card.Content style={styles.statContent}>
              <Text variant="headlineMedium">{stats.favorite}</Text>
              <Text variant="bodyMedium">收藏作品</Text>
            </Card.Content>
          </Card>
        </View>
      </View>

      <View style={styles.filterSection}>
        <SegmentedButtons
          value={filter}
          onValueChange={(value) => setFilter(value as FilterType)}
          buttons={[
            { value: 'all', label: '全部' },
            { value: 'favorite', label: '收藏' },
          ]}
          style={styles.filterButtons}
        />
      </View>

      <View style={styles.historySection}>
        {filteredArtworks.length === 0 ? (
          <Card style={styles.emptyCard}>
            <Card.Content style={styles.emptyContent}>
              <Text variant="bodyMedium">暂无记录</Text>
              <Text variant="bodySmall">上传画作开始学习吧！</Text>
            </Card.Content>
          </Card>
        ) : (
          filteredArtworks.map((artwork) => (
            <Card 
              key={artwork.id} 
              style={styles.artworkCard}
              onPress={() => handleArtworkPress(artwork)}
            >
              <Card.Title
                title={artwork.analysis?.style?.genre || '未分析'}
                subtitle={new Date(artwork.createdAt).toLocaleDateString()}
                left={(props) => (
                  <View style={styles.thumbnailContainer}>
                    <Card.Cover 
                      source={{ uri: artwork.imageUri }} 
                      style={styles.thumbnail} 
                    />
                  </View>
                )}
                right={() => (
                  <View style={styles.cardActions}>
                    <IconButton
                      icon={artwork.isFavorite ? 'heart' : 'heart-outline'}
                      iconColor={artwork.isFavorite ? theme.colors.error : undefined}
                      onPress={() => toggleFavorite(artwork.id)}
                    />
                    <IconButton
                      icon="delete-outline"
                      onPress={() => confirmDelete(artwork.id)}
                    />
                  </View>
                )}
              />
              <Card.Content>
                <View style={styles.tagsContainer}>
                  {artwork.analysis?.color?.primaryColors?.slice(0, 3).map((color, index) => (
                    <Chip key={index} compact style={styles.tag}>{color}</Chip>
                  ))}
                  {artwork.tutorial && (
                    <Chip compact style={[styles.tag, styles.tutorialTag]}>教程</Chip>
                  )}
                  {artwork.practices.length > 0 && (
                    <Chip compact style={[styles.tag, styles.practiceTag]}>
                      {artwork.practices.length}次练习
                    </Chip>
                  )}
                </View>
              </Card.Content>
            </Card>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statsSection: {
    padding: 20,
    paddingBottom: 10,
  },
  statsTitle: {
    marginBottom: 16,
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    width: '47%',
  },
  statContent: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  filterSection: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  filterButtons: {
    width: '100%',
  },
  historySection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  emptyCard: {
    marginTop: 20,
  },
  emptyContent: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  artworkCard: {
    marginBottom: 12,
  },
  thumbnailContainer: {
    marginLeft: 8,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  cardActions: {
    flexDirection: 'row',
    marginRight: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  tag: {
    height: 28,
  },
  tutorialTag: {
    backgroundColor: '#e0f2fe',
  },
  practiceTag: {
    backgroundColor: '#dcfce7',
  },
});
