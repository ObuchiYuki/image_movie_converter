import styled from "styled-components"

const HeaderContainer = styled.div`
  width: 100%;
  background: black;
  padding: 8px;
  position: fixed;
  top: 0;
  z-index: 100;
  height: 48px;
`
const HeaderLogo = styled.img`
  width: 180px;
`

export const Header = () => {
  return (
    <HeaderContainer>
      <a href="/">
        <HeaderLogo src="img/logo.png" alt="LUMIVID Logo" />
      </a>
    </HeaderContainer>
  )
}