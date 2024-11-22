import React from 'react';
import styled from 'styled-components';

const _Conatiner = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  width: 100%;
`;

const _RightText = styled.span`
  font-size: 14px;
  width: 30px;
  text-align: right;
`

const _BarContainer = styled.div`
  height: 20px;
  width: 100%;
  background: #404040;
  border-radius: 10px;
  overflow: hidden;
`;

const _Bar = styled.div<{ progress: number }>`
  width: ${({ progress }) => progress}%;
  background: linear-gradient(90deg, #0C04FE 0%, #C34CEE 100%);
  height: 100%;
  transition: width 0.3s;
`;

const ProgressBar = ({ progress, rightText }: { progress: number; rightText?: string }) => {
  return (
    <_Conatiner>
      <_BarContainer>
        <_Bar progress={progress*100} />
      </_BarContainer>
      {
        rightText && <_RightText>{rightText}</_RightText>
      }
    </_Conatiner>
  );
};

export default ProgressBar;
