import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert, Dimensions } from 'react-native';
import { Text, Button, Card, ActivityIndicator, useTheme, Checkbox, SegmentedButtons } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAppStore } from '../store';
import { AIServiceFactory } from '../services/AIService';
import { Image } from 'react-native';
import { imageToBase64 } from '../utils/image';

type ViewMode = 'side' | 'slider';

export default function PracticeScreen() {
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { currentArtwork, aiSettings, updateArtwork, setCurrentArtwork } = useAppStore();
  
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('side');

  const practiceId = route.params?.practiceId;
  const practice = currentArtwork?.practices.find(p => p.id === practiceId);

  if (!practice || !currentArtwork) {
    return (
      <View style={[styles.emptyContainer, { backgroundColor: theme.colors.background }]}>
        <Text variant="titleLarge">未找到练习</Text>
        <Button mode="contained" onPress={() => navigation.navigate('Tutorial')} style={{ marginTop: 16 }}>
          返回教程
        </Button>
      </View>
    );
  }

  const getFeedback = async () => {
    const apiKey = aiSettings.apiKeys[aiSettings.model];
    if (!apiKey) {
      Alert.alert('提示', '请先在设置中配置API Key');
      navigation.navigate('Settings');
      return;
    }

    setLoading(true);
    try {
      const originalBase64 = await imageToBase64(currentArtwork.imageUri);
      const practiceBase64 = await imageToBase64(practice.imageUri);
      
      const aiService = AIServiceFactory.create(aiSettings.model, apiKey);
      const feedback = await aiService.comparePractice(originalBase64, practiceBase64, aiSettings.language);
      
      const updatedPractices = currentArtwork.practices.map(p =>
        p.id === practiceId ? { ...p, feedback } : p
      );
      
      updateArtwork(currentArtwork.id, { practices: updatedPractices });
      setCurrentArtwork({ ...currentArtwork, practices: updatedPractices });
    } catch (error) {
      Alert.alert('错误', '获取反馈失败');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleImprovement = (index: number) => {
    if (!practice.feedback) return;

    const updatedSuggestions = practice.feedback.suggestions.map((s, i) =>
      i === index ? { ...s, isResolved: !s.isResolved } : s
    );

    const updatedFeedback = { ...practice.feedback, suggestions: updatedSuggestions };
    const updatedPractices = currentArtwork.practices.map(p =>
      p.id === practiceId ? { ...p, feedback: updatedFeedback } : p
    );

    updateArtwork(currentArtwork.id, { practices: updatedPractices });
    setCurrentArtwork({ ...currentArtwork, practices: updatedPractices });
  };

  const renderComparison = () => {
    return (
      <View style={styles.comparisonContainer}>
        <View style={styles.comparisonItem}>
          <Text variant="titleMedium" style={styles.comparisonLabel}>原作</Text>
          <Image source={{ uri: currentArtwork.imageUri }} style={styles.comparisonImage} />
        </View>
        <View style={styles.comparisonItem}>
          <Text variant="titleMedium" style={styles.comparisonLabel}>我的练习</Text>
          <Image source={{ uri: practice.imageUri }} style={styles.comparisonImage} />
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.viewModeContainer}>
        <SegmentedButtons
          value={viewMode}
          onValueChange={(value) => setViewMode(value as ViewMode)}
          buttons={[
            { value: 'side', label: '并排' },
            { value: 'slider', label: '滑动' },
          ]}
          style={styles.viewModeButtons}
        />
      </View>

      {renderComparison()}

      {!practice.feedback ? (
        <View style={styles.feedbackSection}>
          {loading ? (
            <Card style={styles.loadingCard}>
              <Card.Content style={styles.loadingContent}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
                <Text variant="bodyMedium" style={{ marginTop: 12 }}>AI正在对比分析...</Text>
              </Card.Content>
            </Card>
          ) : (
            <Button mode="contained" icon="auto-awesome" onPress={getFeedback} style={styles.getFeedbackButton}>
              获取AI反馈
            </Button>
          )}
        </View>
      ) : (
        <View style={styles.feedbackSection}>
          <Card style={styles.ratingCard}>
            <Card.Content>
              <Text variant="headlineMedium" style={styles.ratingText}>
                评分：{practice.feedback.overallRating} / 5
              </Text>
            </Card.Content>
          </Card>

          <Card style={styles.feedbackCard}>
            <Card.Content>
              <Text variant="titleLarge" style={styles.feedbackTitle}>优点</Text>
              {practice.feedback.strengths.map((strength, index) => (
                <Text key={index} variant="bodyMedium" style={styles.feedbackItem}>
                  ✓ {strength}
                </Text>
              ))}
            </Card.Content>
          </Card>

          <Card style={styles.feedbackCard}>
            <Card.Content>
              <Text variant="titleLarge" style={styles.feedbackTitle}>需要改进</Text>
              {practice.feedback.weaknesses.map((weakness, index) => (
                <Text key={index} variant="bodyMedium" style={styles.feedbackItem}>
                  • {weakness}
                </Text>
              ))}
            </Card.Content>
          </Card>

          <Card style={styles.feedbackCard}>
            <Card.Content>
              <Text variant="titleLarge" style={styles.feedbackTitle}>改进建议</Text>
              {practice.feedback.suggestions.map((suggestion, index) => (
                <View key={index} style={styles.suggestionItem}>
                  <Checkbox
                    status={suggestion.isResolved ? 'checked' : 'unchecked'}
                    onPress={() => toggleImprovement(index)}
                  />
                  <View style={styles.suggestionContent}>
                    <View style={styles.suggestionHeader}>
                      <Text variant="titleMedium" style={styles.suggestionArea}>
                        {suggestion.area}
                      </Text>
                      <Text 
                        variant="bodySmall" 
                        style={[
                          styles.priorityBadge,
                          suggestion.priority === 'high' ? styles.highPriority :
                          suggestion.priority === 'medium' ? styles.mediumPriority :
                          styles.lowPriority
                        ]}
                      >
                        {suggestion.priority === 'high' ? '高' : suggestion.priority === 'medium' ? '中' : '低'}
                      </Text>
                    </View>
                    <Text variant="bodyMedium">{suggestion.description}</Text>
                  </View>
                </View>
              ))}
            </Card.Content>
          </Card>
        </View>
      )}
    </ScrollView>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  viewModeContainer: {
    padding: 20,
    paddingBottom: 0,
  },
  viewModeButtons: {
    width: '100%',
  },
  comparisonContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  comparisonItem: {
    flex: 1,
  },
  comparisonLabel: {
    marginBottom: 8,
    textAlign: 'center',
  },
  comparisonImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  feedbackSection: {
    padding: 20,
    paddingTop: 0,
  },
  loadingCard: {
    marginBottom: 16,
  },
  loadingContent: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  getFeedbackButton: {
    borderRadius: 12,
  },
  ratingCard: {
    marginBottom: 12,
  },
  ratingText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  feedbackCard: {
    marginBottom: 12,
  },
  feedbackTitle: {
    fontWeight: '600',
    marginBottom: 12,
  },
  feedbackItem: {
    marginBottom: 8,
    lineHeight: 22,
  },
  suggestionItem: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  suggestionContent: {
    flex: 1,
    marginLeft: 8,
  },
  suggestionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  suggestionArea: {
    fontWeight: '600',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    overflow: 'hidden',
  },
  highPriority: {
    backgroundColor: '#fee2e2',
    color: '#dc2626',
  },
  mediumPriority: {
    backgroundColor: '#fef3c7',
    color: '#d97706',
  },
  lowPriority: {
    backgroundColor: '#d1fae5',
    color: '#059669',
  },
});
