import styled from "styled-components";
import appIcon from "../../assets/app-icon.svg";
import appStore from "../../assets/app-store.svg";
import { SectionTitle } from "../atom/Title";

const name = "カロリAI - AIがカロリーを推定"
const description = "あなたのためのAI管理士と一緒に食事管理"
const url = "https://caloriai.com"
const appStoreUrl = "https://apps.apple.com/app/id6504136520"

export const PoweredByCaloriAI = () => {
  return (
    <_AppStoreItemContainer>
      <SectionTitle>Powered By</SectionTitle>
      <a href={url} target="_blank" rel="noreferrer">
        <AppIcon src={appIcon} alt="App Icon" />
      </a>
      <a href={url} target="_blank" rel="noreferrer">
        <SectionTitle>
          {name}
        </SectionTitle>
      </a>
      <AppDescription>{description}</AppDescription>
      <a href={appStoreUrl} target="_blank" rel="noreferrer">
        <AppStoreImage src={appStore} alt="App Store" />
      </a>
    </_AppStoreItemContainer>
  );
}

const AppStoreImage = styled.img`
`;

const AppIcon = styled.img`
  width: 64px;
  height: 64px;
`;

const AppDescription = styled.p`
  font-size: 0.9;
  opacity: 0.6;
`;

const _AppStoreItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  
  max-width: 400px;
  text-align: left;
`;

