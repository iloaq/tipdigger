import React, { useState, ChangeEvent, useContext, useRef, useEffect } from 'react';
import styles from './Messages.module.scss';
import { ThemeContext } from '../../ThemeContext';
import { ReactComponent as EmojiIcon } from './icons/emoji.svg';
import { ReactComponent as PinIcon } from './icons/pin.svg';
import { ReactComponent as PhotoIcon } from './icons/photo.svg';
import MicIcon from './icons/mic.svg';
import SendIcon from './icons/send.svg';

interface Message {
  id: number;
  text: string;
  sender: string;
  time: string;
}

const Messages = (): JSX.Element => {
  const [messageInput, setMessageInput] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'Hey There!', sender: 'other', time: 'Today, 8.30pm' },
    { id: 2, text: 'How are you?', sender: 'other', time: 'Today, 8.30pm' },
    { id: 3, text: 'How was your day?', sender: 'other', time: 'Today, 8.30pm' },
    { id: 4, text: 'Hello!', sender: 'me', time: 'Today, 8.33pm' },
    { id: 5, text: 'I am fine and how are you?', sender: 'me', time: 'Today, 8.34pm' },
    { id: 6, text: 'Today was great!!!', sender: 'me', time: 'Today, 8.34pm' },
    { id: 7, text: 'I am doing well, Can we meet tomorrow?!', sender: 'other', time: 'Today, 8.36pm' },
    { id: 8, text: 'Yes Sure!', sender: 'me', time: 'Today, 8.58pm' },
    { id: 9, text: 'At what time?', sender: 'me', time: 'Today, 8.58pm' },
  ]);

  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const messagesContainer = messagesContainerRef.current;
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }, [messages]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setMessageInput(e.target.value);
  };

  const handleSendMessage = (): void => {
    if (messageInput.trim() !== '') {
      const newMessage: Message = {
        id: messages.length + 1,
        text: messageInput,
        sender: 'me',
        time: getCurrentTime(),
      };
      setMessages([...messages, newMessage]);
      setMessageInput('');
    }
  };

  const getCurrentTime = (): string => {
    const now: Date = new Date();
    const hours: string = now.getHours().toString().padStart(2, '0');
    const minutes: string = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const isInputEmpty: boolean = messageInput.trim() === '';

  const renderMessage = (message: Message, index: number): JSX.Element => {
    const isLastMessage = index === messages.length - 1;
    const isNextMessageWithSameTime =
      index < messages.length - 1 && messages[index + 1].time === message.time;
    const hasReducedMargin = !isLastMessage && isNextMessageWithSameTime;

    const isLongMessage = message.text.length > 4;

    return (
      <div
        className={`${styles.message} ${themeClass} ${
          message.sender === 'me' ? styles.sender : styles.receiver
        } ${hasReducedMargin ? styles.reducedMargin : ''}`}
        key={message.id}
      >
        <div className={`${styles.messageText} ${themeClass}`}>
          {isLongMessage ? (
            <p className={`${styles.wrappedText} ${themeClass}`}>{message.text}</p>
          ) : (
            <p>{message.text}</p>
          )}
          {isLastMessage || !isNextMessageWithSameTime ? (
            <span className={`${styles.time} ${themeClass}`}>{message.time}</span>
          ) : null}
          <div className={`${styles.indicator} ${themeClass}`} />
        </div>
      </div>
    );
  };

  const theme = useContext(ThemeContext);
  const themeClass = theme === 'dark' ? styles.dark : '';

  return (
    <div className={`${styles.container} ${styles.background} ${themeClass}`}>
      <div className={`${styles.messages} ${themeClass}`} ref={messagesContainerRef}>
        {messages.map(renderMessage)}
      </div>
      <div className="footerContainerWrapper">
        <div className={`${styles.footercontainer}  ${themeClass}`}>
          <div className={`${styles.inputContainer} ${themeClass}`}>
            <div className={`${styles.leftIcons} ${themeClass}`}>
              <EmojiIcon className={`${styles.icon} ${themeClass}`} />
            </div>
            <input
              type="text"
              placeholder="Type your message here..."
              value={messageInput}
              onChange={handleInputChange}
              style={{ color: theme === 'dark' ? 'white' : 'inherit' }}
              className={`${styles.input} ${styles.wrappedText} ${themeClass}`}
            />
            <div className={styles.rightIcons}>
              <PinIcon className={`${styles.icon} ${themeClass} ${styles.PinIcon}`} />
              <PhotoIcon className={`${styles.icon} ${themeClass}`} />
            </div>
          </div>
          <div className={`${styles.containerSB} ${themeClass}`}>
            {isInputEmpty ? (
              <img
                src={MicIcon}
                alt="mic"
                className={`${styles.sendButton} ${themeClass} sharedIconClass`}
                onClick={handleSendMessage}
              />
            ) : (
              <img
                src={SendIcon}
                alt="send"
                className={`${styles.sendButton} ${themeClass}`}
                onClick={handleSendMessage}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
