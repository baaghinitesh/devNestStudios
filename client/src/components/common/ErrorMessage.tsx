import React from 'react';
import styled from 'styled-components';

const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: #fff5f5;
  border: 1px solid #fed7d7;
  border-radius: 8px;
  margin: 1rem 0;
`;

const ErrorIcon = styled.div`
  color: #e53e3e;
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const ErrorTitle = styled.h3`
  color: #e53e3e;
  margin: 0 0 0.5rem 0;
  font-size: 1.125rem;
  font-weight: 600;
`;

const ErrorText = styled.p`
  color: #742a2a;
  margin: 0;
  text-align: center;
  font-size: 0.875rem;
  line-height: 1.5;
`;

const RetryButton = styled.button`
  background: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.875rem;
  cursor: pointer;
  margin-top: 1rem;
  transition: background 0.3s ease;

  &:hover {
    background: #0056b3;
  }
`;

interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ 
  title = "Something went wrong",
  message,
  onRetry
}) => {
  return (
    <ErrorWrapper>
      <ErrorIcon>⚠️</ErrorIcon>
      <ErrorTitle>{title}</ErrorTitle>
      <ErrorText>{message}</ErrorText>
      {onRetry && (
        <RetryButton onClick={onRetry}>
          Try Again
        </RetryButton>
      )}
    </ErrorWrapper>
  );
};

export default ErrorMessage;