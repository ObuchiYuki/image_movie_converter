import styled from "styled-components"

const _FooterContainer = styled.div`
  background: black;
  padding: 20px;
  display: flex;
  justify-content: center;
  color: #8c8c8c;
`

export const Footer = () => {
    return (
        <div>
            <_FooterContainer>
            © 2024 AZStudio inc.
            </_FooterContainer>
        </div>
    )
}

