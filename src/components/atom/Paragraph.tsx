import styled from "styled-components"

const _Paragraph = styled.p`
  font-size: 15px;
  opacity: 0.5;
`

export const Paragraph = ({ children }: { children: React.ReactNode }) => {
  return (
    <_Paragraph>{children}</_Paragraph>
  )
}