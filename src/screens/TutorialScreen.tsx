import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, Button, Card, ActivityIndicator, useTheme, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useAppStore } from '../store';
import { AIServiceFactory } from '../services/AIService';
import { Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { compressImage, imageToBase64, generateId } from '../utils/image';

export default function TutorialScreen() {
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const { currentArtwork, aiSettings, updateArtwork, setCurrentArtwork } = useAppStore();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const tutorial = currentArtwork?.tutorial;

  if (!tutorial) {
    return (
      <View style={[styles.emptyContainer, { backgroundColor: theme.colors.background }]}>
        <Text variant="titleLarge">暂无教程</Text>
        <Text variant="bodyMedium" style={{ marginTop: 8 }}>请先在分析页生成教程</Text>
        <Button mode="contained" onPress={() => navigation.navigate('Analysis')} style={{ marginTop: 16 }}>
          去分析
        </Button>
      </View>
    );
  }

  const step = tutorial.steps[currentStep];

  const nextStep = () => {
    if (currentStep < tutorial.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const uploadPractice = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && currentArtwork) {
      const compressed = await compressImage(result.assets[0].uri);
      
      const newPractice = {
        id: generateId(),
        imageUri: compressed.uri,
        feedback: null,
        completedImprovements: [],
        createdAt: Date.now(),
      };

      const updatedPractices = [...currentArtwork.practices, newPractice];
      updateArtwork(currentArtwork.id, { practices: updatedPractices });
      setCurrentArtwork({ ...currentArtwork, practices: updatedPractices });

      navigation.navigate('Practice', { practiceId: newPractice.id });
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {currentArtwork && (
        <Card style={styles.imageCard}>
          <Card.Cover source={{ uri: currentArtwork.imageUri }} style={styles.referenceImage} />
        </Card>
      )}

      <View style={styles.materialsSection}>
        <Text variant="titleLarge" style={styles.sectionTitle}>准备材料</Text>
        <View style={styles.materialsList}>
          {tutorial.materials.map((material, index) => (
            <Text key={index} variant="bodyMedium" style={styles.materialItem}>
              • {material}
            </Text>
          ))}
        </View>
      </View>

      <View style={styles.stepSection}>
        <View style={styles.stepHeader}>
          <Text variant="titleMedium" style={styles.stepCounter}>
            步骤 {currentStep + 1} / {tutorial.steps.length}
          </Text>
        </View>

        <Card style={styles.stepCard}>
          <Card.Content>
            <Text variant="headlineSmall" style={styles.stepTitle}>{step.title}</Text>
            <Text variant="bodyMedium" style={styles.stepDescription}>{step.description}</Text>
            
            <Text variant="titleMedium" style={styles.keyPointsTitle}>要点提示</Text>
            {step.keyPoints.map((point, index) => (
              <Text key={index} variant="bodyMedium" style={styles.keyPoint}>
                • {point}
              </Text>
            ))}

            {step.regionHint && (
              <>
                <Text variant="titleMedium" style={styles.regionHintTitle}>参考区域</Text>
                <Text variant="bodyMedium">{step.regionHint}</Text>
              </>
            )}
          </Card.Content>
        </Card>

        <View style={styles.stepNavigation}>
          <Button
            mode="outlined"
            onPress={prevStep}
            disabled={currentStep === 0}
            style={styles.navButton}
          >
            上一步
          </Button>
          <Button
            mode="contained"
            onPress={nextStep}
            disabled={currentStep === tutorial.steps.length - 1}
            style={styles.navButton}
          >
            下一步
          </Button>
        </View>
      </View>

      <View style={styles.tipsSection}>
        <Text variant="titleLarge" style={styles.sectionTitle}>小贴士</Text>
        {tutorial.tips.map((tip, index) => (
          <Card key={index} style={styles.tipCard}>
            <Card.Content>
              <Text variant="bodyMedium">{tip}</Text>
            </Card.Content>
          </Card>
        ))}
      </View>

      <View style={styles.practiceSection}>
        <Button
          mode="contained"
          icon="upload"
          onPress={uploadPractice}
          style={styles.practiceButton}
          contentStyle={styles.practiceButtonContent}
        >
          上传我的练习作品
        </Button>
      </View>
    </ScrollView>
  );
}

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
  imageCard: {
    margin: 20,
  },
  referenceImage: {
    height: 200,
  },
  materialsSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontWeight: '600',
    marginBottom: 12,
  },
  materialsList: {
    gap: 8,
  },
  materialItem: {
    lineHeight: 24,
  },
  stepSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  stepHeader: {
    marginBottom: 12,
  },
  stepCounter: {
    opacity: 0.7,
  },
  stepCard: {
    marginBottom: 16,
  },
  stepTitle: {
    fontWeight: 'bold',
    marginBottom: 12,
  },
  stepDescription: {
    marginBottom: 16,
    lineHeight: 24,
  },
  keyPointsTitle: {
    fontWeight: '600',
    marginBottom: 8,
  },
  keyPoint: {
    marginBottom: 6,
    lineHeight: 22,
  },
  regionHintTitle: {
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  stepNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  navButton: {
    flex: 1,
  },
  tipsSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tipCard: {
    marginBottom: 8,
  },
  practiceSection: {
    padding: 20,
    paddingTop: 0,
  },
  practiceButton: {
    borderRadius: 12,
  },
  practiceButtonContent: {
    paddingVertical: 8,
  },
});
