import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, Card, IconButton, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useAppStore } from '../store';
import { Image } from 'react-native';

export default function HomeScreen() {
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const artworks = useAppStore((state) => state.artworks);
  const setCurrentArtwork = useAppStore((state) => state.setCurrentArtwork);

  const recentArtworks = artworks.slice(0, 4);

  const handleUpload = () => {
    navigation.navigate('Analysis');
  };

  const handleArtworkPress = (artwork: any) => {
    setCurrentArtwork(artwork);
    if (artwork.analysis) {
      navigation.navigate('Analysis', { artworkId: artwork.id });
    } else {
      navigation.navigate('Analysis');
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>
          AI绘画教学助手
        </Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          学习绘画，从分析名作开始
        </Text>
      </View>

      <View style={styles.quickActions}>
        <Button
          mode="contained"
          icon="upload"
          onPress={handleUpload}
          style={styles.uploadButton}
          contentStyle={styles.buttonContent}
        >
          上传画作
        </Button>
      </View>

      <View style={styles.section}>
        <Text variant="titleLarge" style={styles.sectionTitle}>
          最近分析
        </Text>
        {recentArtworks.length === 0 ? (
          <Card style={styles.emptyCard}>
            <Card.Content style={styles.emptyContent}>
              <Text variant="bodyMedium">还没有分析记录</Text>
              <Text variant="bodySmall">上传一幅画作开始你的学习之旅吧！</Text>
            </Card.Content>
          </Card>
        ) : (
          <View style={styles.artworkGrid}>
            {recentArtworks.map((artwork) => (
              <Card
                key={artwork.id}
                style={styles.artworkCard}
                onPress={() => handleArtworkPress(artwork)}
              >
                <Card.Cover source={{ uri: artwork.imageUri }} style={styles.artworkImage} />
                <Card.Content style={styles.cardContent}>
                  <Text variant="bodyMedium" numberOfLines={1}>
                    {artwork.analysis?.style?.genre || '未分析'}
                  </Text>
                  <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
                    {new Date(artwork.createdAt).toLocaleDateString()}
                  </Text>
                </Card.Content>
              </Card>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    opacity: 0.7,
  },
  quickActions: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  uploadButton: {
    borderRadius: 12,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  section: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    marginBottom: 16,
    fontWeight: '600',
  },
  emptyCard: {
    marginBottom: 16,
  },
  emptyContent: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  artworkGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  artworkCard: {
    width: '47%',
  },
  artworkImage: {
    height: 120,
  },
  cardContent: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
});
