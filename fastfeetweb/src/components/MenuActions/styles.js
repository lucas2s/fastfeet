import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
`;

export const BtnAction = styled.button`
  background: none;
  border: 0;
  position: relative;
`;

export const ActionsMenu = styled.div`
  position: absolute;
  width: ${props => props.width}px;
  left: calc(50% - ${props => props.width / 2}px);
  top: calc(100% + 5px);
  background: #fff;
  border-radius: 5px;
  border: 1px solid #eeeeee;
  padding: 15px 10px;
  display: ${props => (props.visible ? 'block' : 'none')};
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    left: calc(50% - 16px);
    top: -16px;
    width: 0;
    height: 0;
    border-left: 16px solid transparent;
    border-right: 16px solid transparent;
    border-bottom: 16px solid #eee;
  }
`;

export const ListActions = styled.div`
  width: 100%;
`;

export const ActionMenu = styled.button`
  background: none;
  border: 0;
  width: 100%;

  padding-bottom: 10px;
  margin-top: 10px;
  border-bottom: 1px solid #eeeeee;

  display: flex;
  align-items: center;

  p {
    margin-left: 5px;
    color: #999999;
    opacity: 1;
    font-weight: 500;
  }

  :first-child {
    margin-top: 0;
  }

  :last-child {
    border-bottom: 0;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;
