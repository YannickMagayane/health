import React, { useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONT_SIZES, SPACING, GlobalStyles } from '../styles/theme';
import { getAiResponse } from '../services/aiService';

const AiChatScreen = () => {
  const [messages, setMessages] = useState([
    { id: '0', text: "Bonjour ! Posez-moi une question d'ordre général sur la santé. Je ne fournis pas de diagnostics.", sender: 'ai' }
  ]);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef(null);

  const handleSendMessage = useCallback(() => {
    if (inputText.trim().length === 0) {
      return;
    }

    const newUserMessage = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: 'user',
    };

    setMessages(prevMessages => [...prevMessages, newUserMessage]);
    setInputText('');

    // Simulate AI "thinking" then respond
    setTimeout(() => {
      const aiResponseText = getAiResponse(newUserMessage.text);
      const newAiMessage = {
        id: (Date.now() + 1).toString(), // Ensure unique ID
        text: aiResponseText,
        sender: 'ai',
      };
      setMessages(prevMessages => [...prevMessages, newAiMessage]);
    }, 1000); // 1 second delay
  }, [inputText]);

  // Scroll to bottom when new messages are added
  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const renderMessageItem = ({ item }) => {
    const isUserMessage = item.sender === 'user';
    return (
      <View
        style={[
          styles.messageBubble,
          isUserMessage ? styles.userMessageBubble : styles.aiMessageBubble,
        ]}
      >
        <Text style={isUserMessage ? styles.userMessageText : styles.aiMessageText}>
          {item.text}
        </Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.screenContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} // Adjust as needed for header
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessageItem}
        keyExtractor={(item) => item.id}
        style={styles.messageList}
        contentContainerStyle={{ paddingVertical: SPACING.medium }}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Posez votre question..."
          placeholderTextColor={COLORS.mediumGray}
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Ionicons name="send" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
  },
  messageList: {
    flex: 1,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: SPACING.medium,
    borderRadius: 15,
    marginBottom: SPACING.medium,
    marginHorizontal: SPACING.medium,
  },
  userMessageBubble: {
    backgroundColor: COLORS.primary,
    alignSelf: 'flex-end',
    borderBottomRightRadius: 5, // Chat bubble tail effect
  },
  aiMessageBubble: {
    backgroundColor: COLORS.white,
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 5, // Chat bubble tail effect
    borderColor: COLORS.mediumGray,
    borderWidth: 1,
  },
  userMessageText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.medium,
  },
  aiMessageText: {
    color: COLORS.darkGray,
    fontSize: FONT_SIZES.medium,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.medium,
    paddingVertical: SPACING.small,
    borderTopWidth: 1,
    borderTopColor: COLORS.mediumGray,
    backgroundColor: COLORS.white,
  },
  textInput: {
    flex: 1,
    minHeight: 40,
    maxHeight: 120, // Allow some expansion for multiline
    backgroundColor: COLORS.lightGray,
    borderColor: COLORS.mediumGray,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: SPACING.medium,
    paddingVertical: SPACING.small,
    fontSize: FONT_SIZES.medium,
    marginRight: SPACING.small,
  },
  sendButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    padding: SPACING.small,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
  },
});

export default AiChatScreen;
