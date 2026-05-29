import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { 
  Text, 
  TextInput, 
  Button, 
  Card, 
  SegmentedButtons, 
  useTheme,
  Switch,
  Divider,
  List
} from 'react-native-paper';
import { useAppStore } from '../store';

export default function SettingsScreen() {
  const theme = useTheme();
  const { aiSettings, updateAISettings, clearAllData, artworks } = useAppStore();
  
  const [openaiKey, setOpenaiKey] = useState(aiSettings.apiKeys.openai);
  const [claudeKey, setClaudeKey] = useState(aiSettings.apiKeys.claude);
  const [geminiKey, setGeminiKey] = useState(aiSettings.apiKeys.gemini);
  const [showKeys, setShowKeys] = useState(false);

  const handleSaveApiKeys = () => {
    updateAISettings({
      apiKeys: {
        openai: openaiKey,
        claude: claudeKey,
        gemini: geminiKey,
      },
    });
    Alert.alert('保存成功', 'API Key 已保存');
  };

  const handleModelChange = (model: 'openai' | 'claude' | 'gemini') => {
    updateAISettings({ model });
  };

  const handleLanguageChange = (language: string) => {
    updateAISettings({ language });
  };

  const handleClearData = () => {
    if (artworks.length === 0) {
      Alert.alert('提示', '暂无数据可清除');
      return;
    }
    
    Alert.alert(
      '确认清除',
      `确定要清除所有数据吗？这将删除 ${artworks.length} 个分析记录，此操作不可恢复。`,
      [
        { text: '取消', style: 'cancel' },
        { 
          text: '清除', 
          style: 'destructive', 
          onPress: () => {
            clearAllData();
            Alert.alert('清除成功', '所有数据已清除');
          }
        },
      ]
    );
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.section}>
        <Text variant="titleLarge" style={styles.sectionTitle}>AI模型设置</Text>
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.cardTitle}>选择AI模型</Text>
            <SegmentedButtons
              value={aiSettings.model}
              onValueChange={(value) => handleModelChange(value as 'openai' | 'claude' | 'gemini')}
              buttons={[
                { value: 'openai', label: 'OpenAI' },
                { value: 'claude', label: 'Claude' },
                { value: 'gemini', label: 'Gemini' },
              ]}
              style={styles.segmentedButtons}
            />
            <Text variant="bodySmall" style={styles.hint}>
              {aiSettings.model === 'openai' && '使用 GPT-4o 模型进行分析和反馈'}
              {aiSettings.model === 'claude' && '使用 Claude 模型进行分析和反馈（待实现）'}
              {aiSettings.model === 'gemini' && '使用 Gemini 模型进行分析和反馈（待实现）'}
            </Text>
          </Card.Content>
        </Card>
      </View>

      <View style={styles.section}>
        <Text variant="titleLarge" style={styles.sectionTitle}>API Key 配置</Text>
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.switchRow}>
              <Text variant="titleMedium">显示密钥</Text>
              <Switch value={showKeys} onValueChange={setShowKeys} />
            </View>
            <Divider style={styles.divider} />
            
            <TextInput
              label="OpenAI API Key"
              value={openaiKey}
              onChangeText={setOpenaiKey}
              secureTextEntry={!showKeys}
              mode="outlined"
              style={styles.input}
              placeholder="sk-..."
            />
            
            <TextInput
              label="Claude API Key"
              value={claudeKey}
              onChangeText={setClaudeKey}
              secureTextEntry={!showKeys}
              mode="outlined"
              style={styles.input}
              placeholder="sk-ant-..."
            />
            
            <TextInput
              label="Gemini API Key"
              value={geminiKey}
              onChangeText={setGeminiKey}
              secureTextEntry={!showKeys}
              mode="outlined"
              style={styles.input}
              placeholder="AIza..."
            />
            
            <Button 
              mode="contained" 
              onPress={handleSaveApiKeys}
              style={styles.saveButton}
            >
              保存API Key
            </Button>
          </Card.Content>
        </Card>
      </View>

      <View style={styles.section}>
        <Text variant="titleLarge" style={styles.sectionTitle}>语言设置</Text>
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.cardTitle}>界面语言</Text>
            <SegmentedButtons
              value={aiSettings.language}
              onValueChange={handleLanguageChange}
              buttons={[
                { value: 'zh', label: '中文' },
                { value: 'en', label: 'English' },
                { value: 'ja', label: '日本語' },
              ]}
              style={styles.segmentedButtons}
            />
            <Text variant="bodySmall" style={styles.hint}>
              AI分析结果的语言将跟随此设置
            </Text>
          </Card.Content>
        </Card>
      </View>

      <View style={styles.section}>
        <Text variant="titleLarge" style={styles.sectionTitle}>数据管理</Text>
        <Card style={styles.card}>
          <Card.Content>
            <List.Item
              title="清除所有数据"
              description={`当前存储 ${artworks.length} 个分析记录`}
              left={(props) => <List.Icon {...props} icon="delete-outline" />}
              onPress={handleClearData}
              titleStyle={{ color: theme.colors.error }}
            />
          </Card.Content>
        </Card>
      </View>

      <View style={styles.section}>
        <Text variant="titleLarge" style={styles.sectionTitle}>关于</Text>
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.aboutTitle}>AI绘画教学助手</Text>
            <Text variant="bodyMedium" style={styles.aboutText}>
              版本 1.0.0
            </Text>
            <Text variant="bodySmall" style={styles.aboutText}>
              一款基于AI技术的绘画学习应用，帮助您分析名作、学习技法、获得练习反馈。
            </Text>
            <Divider style={styles.divider} />
            <Text variant="bodySmall" style={styles.aboutText}>
              本应用使用 AI 模型进行图像分析，可能会产生一定的API调用费用，请合理使用。
            </Text>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    padding: 20,
    paddingBottom: 0,
  },
  sectionTitle: {
    marginBottom: 12,
    fontWeight: '600',
  },
  card: {
    marginBottom: 16,
  },
  cardTitle: {
    marginBottom: 12,
  },
  segmentedButtons: {
    marginBottom: 8,
  },
  hint: {
    opacity: 0.6,
    marginTop: 4,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  divider: {
    marginVertical: 16,
  },
  input: {
    marginBottom: 12,
  },
  saveButton: {
    marginTop: 8,
  },
  aboutTitle: {
    marginBottom: 8,
  },
  aboutText: {
    opacity: 0.7,
    marginBottom: 4,
  },
});
