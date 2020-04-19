import styled from 'styled-components';

export const Container = styled.div`
  margin-bottom: 30px;
`;

export const LabelAvatar = styled.label`
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }

  input {
    display: none;
  }
`;

export const ImgAvatar = styled.img`
  height: 150px;
  width: 150px;
  border-radius: 50%;
  border: 3px solid rgba(255, 255, 255, 0.3);
  background: #eee;
`;
