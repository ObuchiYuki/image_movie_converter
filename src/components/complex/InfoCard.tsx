import styled from "styled-components"
import { LumividIcon } from "../svg/LumividIcon"
import { SectionTitle } from "../atom/Title"
import { Paragraph } from "../atom/Paragraph"

const _InfoCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const _TitleContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`

export const InfoCard = () => {
  return (
    <_InfoCard>
      <_TitleContainer>
        <LumividIcon/>
        <SectionTitle>LUMIVIDについて</SectionTitle>
      </_TitleContainer>
      <Paragraph>
        LUMIVIDはSNSにイラストを投稿するときに画像でなく動画にすることでクローリングを防止し、AI学習をしにくくすることを目的としたサービスです。
        <br/><br/>
        100%AIに学習されないことを保証するものではありません。
        <br/><br/>
        LUMIVIDは画像をアップロードしないためイラストが外部に漏れることはありません。
        <br/><br/>
        動画全体でほぼ1フレームとなっているので容量は画像とほぼ変わらないか小さくなります。
      </Paragraph>
    </_InfoCard>
  )
}