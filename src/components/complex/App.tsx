import styled from "styled-components"
import { Header } from "../view/Header"
import { AppMain } from "./AppMain"
import { InfoCard } from "./InfoCard"
import { PoweredByCaloriAI } from "../view/PoweredByCaloriAI"
import { Footer } from "../view/Footer"

const _PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 16px;
  gap: 16px;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`

const _Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 800px;
`

const _Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;

  @media (min-width: 768px) {
    width: 400px;
  }
`

const _Container = styled.div`
  padding: 20px;
  background: #1B1B1B;
  border-radius: 8px;
  flex: 2;
`

const _AppContainer = styled.div`
  padding-top: 48px;
`;

export const App = () => {
  return (
    <_AppContainer>
      <Header/>
      <_PageContainer>
        <_Main>
          <_Container>
            <InfoCard/>
          </_Container>

          <_Container>
            <AppMain/>
          </_Container>
        </_Main>

        <_Sidebar>
          <_Container>
            <PoweredByCaloriAI/>
          </_Container>
        </_Sidebar>
      </_PageContainer>
      <Footer/>
    </_AppContainer>
  )
}