import styled from "styled-components"

const _FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: black;
  padding: 20px;
  display: flex;
  justify-content: center;
  color: #8c8c8c;
`

const _Link = styled.a`
  color: #e1e1e1;
  text-decoration: none;
  transition: text-shadow 0.3s;

  &:hover { // grow the link when hovered
    text-shadow: 0px 0px 10px #e1e1e1;
  }
`

export const Footer = () => {
  return (
    <div>
      <_FooterContainer>
        <p>© 2024 <_Link href="https://corp.azstudioinc.com">AZStudio inc.</_Link></p>
        <p>
          <_Link href="https://github.com/obuchiyuki/lumivid/">LUMIVID Source (GitHub)</_Link>
        </p>
        
      </_FooterContainer>
    </div>
  )
}

