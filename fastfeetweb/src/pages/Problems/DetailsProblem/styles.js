import styled from 'styled-components';

export const Modal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.8);
`;

export const ModalContent = styled.div`
  width: 450px;
  height: 450px;
  padding: 30px;
  background: #fff;
  border-radius: 4px;

  strong {
    font-size: 16px;
    color: #444444;
    font-weight: bold;
  }

  p {
    margin-top: 20px;
    font-size: 16px;
    line-height: 26px;
    color: #666666;
  }
`;
