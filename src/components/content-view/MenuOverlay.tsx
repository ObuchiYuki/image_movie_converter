import styled from "styled-components";

const _MenuOverlay = styled.div`
  position: absolute;
  background: #545454;
  border-radius: 8px;
  padding: 16px;
  z-index: 2;
  top: 58px;
  box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.2);
`

export const MenuOverlay = ({
  children
}: {
  children: React.ReactNode
}) => {
  return <_MenuOverlay>{children}</_MenuOverlay>
}