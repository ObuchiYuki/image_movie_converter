import React from "react"
import styled from "styled-components"

const _SectionTitle = styled.h2`
  font-size: 16px;
`

export const SectionTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <_SectionTitle>{children}</_SectionTitle>
  )
}