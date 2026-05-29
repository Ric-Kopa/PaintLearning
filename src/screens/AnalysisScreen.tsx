import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, Button, Card, ActivityIndicator, SegmentedButtons, useTheme } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { useAppStore } from '../store';
import { AIServiceFactory } from '../services/AIService';
import { compressImage, imageToBase64, generateId } from '../utils/image';
import { Image } from 'react-native';

type Tab = 'composition' | 'color' | 'technique' | 'style' | 'lightShadow';

export default function AnalysisScreen({ route }: any) {
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const { artworks, currentArtwork, aiSettings, addArtwork, updateArtwork, setCurrentArtwork } = useAppStore();
  
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('composition');

  const artwork = route.params?.artworkId 
    ? artworks.find(a => a.id === route.params.artworkId)
    : currentArtwork;

  const tabs = [
    { value: 'composition', label: '构图' },
    { value: 'color', label: '配色' },
    { value: 'technique', label: '技法' },
    { value: 'style', label: '风格' },
    { value: 'lightShadow', label: '光影' },
  ];

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const analyzeArtwork = async () => {
    if (!selectedImage) return;

    const apiKey = aiSettings.apiKeys[aiSettings.model];
    if (!apiKey) {
      Alert.alert('提示', '请先在设置中配置API Key');
      navigation.navigate('Settings');
      return;
    }

    setLoading(true);
    try {
      const compressed = await compressImage(selectedImage);
      const base64 = await imageToBase64(compressed.uri);
      
      const aiService = AIServiceFactory.create(aiSettings.model, apiKey);
      const analysis = await aiService.analyzeArtwork(base64, aiSettings.language);

      const newArtwork = {
        id: generateId(),
        imageUri: compressed.uri,
        analysis,
        tutorial: null,
        practices: [],
        createdAt: Date.now(),
        isFavorite: false,
        tags: [],
      };

      addArtwork(newArtwork);
      setCurrentArtwork(newArtwork);
    } catch (error) {
      Alert.alert('错误', '分析失败，请检查API Key或网络连接');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const generateTutorial = async () => {
    if (!artwork?.analysis) return;

    const apiKey = aiSettings.apiKeys[aiSettings.model];
    if (!apiKey) {
      Alert.alert('提示', '请先在设置中配置API Key');
      navigation.navigate('Settings');
      return;
    }

    setLoading(true);
    try {
      const aiService = AIServiceFactory.create(aiSettings.model, apiKey);
      const tutorial = await aiService.generateTutorial(artwork.analysis, aiSettings.language);
      
      updateArtwork(artwork.id, { tutorial });
      setCurrentArtwork({ ...artwork, tutorial });
      
      navigation.navigate('Tutorial');
    } catch (error) {
      Alert.alert('错误', '生成教程失败');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const renderAnalysisContent = () => {
    if (!artwork?.analysis) return null;

    const analysis = artwork.analysis;
    let content;

    switch (activeTab) {
      case 'composition':
        content = analysis.composition;
        break;
      case 'color':
        content = analysis.color;
        break;
      case 'technique':
        content = analysis.technique;
        break;
      case 'style':
        content = analysis.style;
        break;
      case 'lightShadow':
        content = analysis.lightShadow;
        break;
    }

    return (
      <Card style={styles.analysisCard}>
        <Card.Content>
          {Object.entries(content).map(([key, value]) => (
            <View key={key} style={styles.analysisItem}>
              <Text variant="titleMedium" style={styles.analysisLabel}>
                {getLabel(key)}
              </Text>
              <Text variant="bodyMedium">
                {Array.isArray(value) ? value.join(', ') : value}
              </Text>
            </View>
          ))}
        </Card.Content>
      </Card>
    );
  };

  const getLabel = (key: string) => {
    const labels: Record<string, string> = {
      layoutType: '布局类型',
      focalPoint: '视觉重心',
      spatialHierarchy: '空间层次',
      negativeSpace: '正负空间',
      details: '详细分析',
      primaryColors: '主色调',
      schemeType: '配色方案',
      temperature: '色彩冷暖',
      saturation: '饱和度',
      emotion: '色彩情感',
      medium: '绘画媒介',
      brushStroke: '笔触特征',
      texture: '肌理效果',
      specialTechniques: '特殊技法',
      genre: '艺术流派',
      artistReference: '参考艺术家',
      characteristics: '风格特征',
      lightDirection: '光源方向',
      contrast: '明暗对比',
      volume: '体积感',
    };
    return labels[key] || key;
  };

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text variant="bodyLarge" style={styles.loadingText}>AI正在分析中...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {!artwork?.analysis ? (
        <View style={styles.uploadSection}>
          {selectedImage ? (
            <Card style={styles.imageCard}>
              <Card.Cover source={{ uri: selectedImage }} style={styles.previewImage} />
              <Card.Actions>
                <Button onPress={() => setSelectedImage(null)}>重选</Button>
                <Button mode="contained" onPress={analyzeArtwork}>开始分析</Button>
              </Card.Actions>
            </Card>
          ) : (
            <Card style={styles.uploadCard}>
              <Card.Content style={styles.uploadContent}>
                <Text variant="titleLarge" style={styles.uploadTitle}>上传画作</Text>
                <Text variant="bodyMedium" style={styles.uploadSubtitle}>选择或拍摄一幅画作进行分析</Text>
                <View style={styles.uploadButtons}>
                  <Button mode="contained" icon="image" onPress={pickImage} style={styles.uploadButton}>从相册选择</Button>
                  <Button mode="outlined" icon="camera" onPress={takePhoto} style={styles.uploadButton}>拍照</Button>
                </View>
              </Card.Content>
            </Card>
          )}
        </View>
      ) : (
        <View style={styles.resultsSection}>
          <Card style={styles.imageCard}>
            <Card.Cover source={{ uri: artwork.imageUri }} style={styles.previewImage} />
            <Card.Content>
              <Text variant="titleLarge">{artwork.analysis.style.genre}</Text>
              <Text variant="bodyMedium" style={{ marginTop: 8 }}>{artwork.analysis.overallSummary}</Text>
            </Card.Content>
          </Card>

          <View style={styles.tabsContainer}>
            <SegmentedButtons
              value={activeTab}
              onValueChange={(value) => setActiveTab(value as Tab)}
              buttons={tabs}
              style={styles.segmentedButtons}
            />
          </View>

          {renderAnalysisContent()}

          <View style={styles.actionsContainer}>
            {artwork.tutorial ? (
              <Button mode="contained" icon="book-open" onPress={() => navigation.navigate('Tutorial')}>
                查看教程
              </Button>
            ) : (
              <Button mode="contained" icon="auto-awesome" onPress={generateTutorial}>
                生成教程
              </Button>
            )}
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
  },
  uploadSection: {
    padding: 20,
  },
  uploadCard: {
    marginBottom: 16,
  },
  uploadContent: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  uploadTitle: {
    marginBottom: 8,
  },
  uploadSubtitle: {
    marginBottom: 24,
    opacity: 0.7,
  },
  uploadButtons: {
    gap: 12,
    width: '100%',
  },
  uploadButton: {
    width: '100%',
  },
  imageCard: {
    marginBottom: 16,
  },
  previewImage: {
    height: 250,
  },
  resultsSection: {
    padding: 20,
  },
  tabsContainer: {
    marginBottom: 16,
  },
  segmentedButtons: {
    flexWrap: 'wrap',
  },
  analysisCard: {
    marginBottom: 16,
  },
  analysisItem: {
    marginBottom: 16,
  },
  analysisLabel: {
    fontWeight: '600',
    marginBottom: 4,
  },
  actionsContainer: {
    marginTop: 8,
  },
});
