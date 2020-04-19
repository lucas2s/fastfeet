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
  height: max-content;
  padding: 30px;
  background: #fff;
  border-radius: 4px;
`;

export const DivAdress = styled.div`
  padding-bottom: 10px;
  border-bottom: 1px solid #eeeeee;
`;
export const DivDates = styled.div`
  padding-bottom: 10px;
  border-bottom: 1px solid #eeeeee;
`;

export const DivSignature = styled.div`
  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  p {
    font-size: 16px;
    font-weight: bold;
  }
  .PENDENTE {
    color: #c1bc35;
  }

  .CANCELADA {
    color: #de3b3b;
  }

  .RETIRADA {
    color: #4d85ee;
  }
`;

export const HeaderDiv = styled.h3`
  font-size: 16px;
  color: #444444;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const TextModal = styled.p`
  font-size: 16px;
  line-height: 26px;
  color: #666666;

  span {
    font-weight: bold;
  }
`;

export const ImgSignature = styled.img`
  width: 380px;
  height: 120px;
  border-radius: 5px;
`;
