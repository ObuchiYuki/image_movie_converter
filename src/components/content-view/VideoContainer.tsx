import styled from "styled-components"

const _VideoContainer = styled.div`
  background-color: black;
  height: 300px;
  width: 300px;
  border-radius: 8px;
  overflow: hidden;
`;

const _Video = styled.video`
  width: 100%;
  height: 100%;
`;

export const VideoContainer = ({ url, emptyText }: { url?: string, emptyText?: string }) => {
  return (
    <_VideoContainer>
      {
        url && <_Video
          controls
          src={url}
        />
      } 
    </_VideoContainer>
  )
}