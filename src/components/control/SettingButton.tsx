import styled from "styled-components"
import { SettingIcon } from "../svg/SettingIcon"

const _SettingButton = styled.button`
  background: #4D4D4D;
  height: calc(24px + 12px*2);
  width: calc(24px + 12px*2);
  padding: 12px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 24px;
    width: 24px;
  }
`

export const SettingButton = ({ onClick }: { onClick: (event: React.MouseEvent<HTMLButtonElement>) => void }) => {
  return (
    <_SettingButton onClick={onClick}>
      <SettingIcon/>
    </_SettingButton>
  ) 
}