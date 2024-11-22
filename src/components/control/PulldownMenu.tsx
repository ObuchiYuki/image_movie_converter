import styled from "styled-components";
import { MenuIndicator } from "../svg/MenuIndicator"
import { useState } from "react";

const _Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;
  align-items: center;
`

const _Title = styled.p`
  font-size: 15px;
  font-weight: 400;
  width: 80px;
`;

const _IndicatorConatiner = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  background: #3D3D3D;
  padding: 8px 16px;
  align-items: center;
  justify-content: space-between;
  border-radius: 999px;
  width: 170px;
  cursor: pointer;
  position: relative; 
`

const _Dropdown = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => isOpen ? "flex" : "none"};
  flex-direction: column;
  background: #313131;
  border-radius: 8px;
  position: absolute;
  right: 0;
  width: 170px;
  top: 120%;
  z-index: 1;
  overflow: hidden;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
`

const _DropdownItem = styled.p`
  font-size: 15px;
  font-weight: 400;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background: #484848;
  }
`

export const PulldownMenu = <TValue extends unknown>({
  title,
  selectedValue,
  options,
  onSelect
}: {
  title: string,
  selectedValue: TValue,
  options: { label: string, value: TValue }[],
  onSelect: (value: TValue) => void
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const currentLabel = options.find(option => option.value === selectedValue)?.label ?? "選択なし"
  const onSelectIndex = (index: number) => {
    onSelect(options[index].value)
    setIsOpen(false)
  }

  return (
    <_Container>
      <_Title>{title}</_Title>
      <_IndicatorConatiner onClick={() => setIsOpen(!isOpen)}>
        {currentLabel}
        <MenuIndicator/>
        <_Dropdown isOpen={isOpen}>
          {options.map((option, index) => (
            <_DropdownItem key={index} onClick={() => onSelectIndex(index)}>{option.label}</_DropdownItem>
          ))} 
        </_Dropdown>
      </_IndicatorConatiner>
    </_Container>
  );
}