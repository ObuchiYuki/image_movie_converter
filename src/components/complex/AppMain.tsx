import styled from "styled-components"
import ProgressBar from "../content-view/ProgressBar"
import { VideoContainer } from "../content-view/VideoContainer"
import { ImageDropzone } from "../control/ImageDropzone"
import { ProminentButton } from "../control/ProminentButton"
import { SettingButton } from "../control/SettingButton"
import { useState } from "react"
import { MenuOverlay } from "../content-view/MenuOverlay"
import { PulldownMenu } from "../control/PulldownMenu"
import { ImageMovieConverter } from "../../service/ImageMovieConverter"

const _AppMain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
`

const _SettingButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  position: relative;
`

const _ExecutionContainer = styled.div<{ $isDisabled: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 24px;
  align-items: center;
  opacity: ${({ $isDisabled }) => $isDisabled ? 0.5 : 1};
`;

const _MenuOverlayContainer = styled.div`
  display: flex;
  gap: 16px;
  flex-direction: column;
`;

const movieDurationOptions = [
  { value: 1, label: "1秒" },
  { value: 10, label: "10秒" },
  { value: 30, label: "30秒" },
  { value: 60, label: "60秒" },
  { value: 90, label: "90秒" },
  { value: 120, label: "120秒" },
]

const videoSizeOptions = [
  { value: "twitter", label: "Twitterに最適化" },
  { value: "720p", label: "720px" },
  { value: "1200p", label: "1200px" },
  { value: "2000p", label: "2000px" },
  { value: "original", label: "元のサイズ" },
]

const videoSizeToMaxSize = (videoSize: string): number|null => {
  switch (videoSize) {
    case "twitter": return 1200
    case "720p": return 720
    case "1200p": return 1200
    case "2000p": return 2000
    default: return null 
  }
}

const getMovieDuration = (): number => {
  const duration = localStorage.getItem("movieDuration")
  if (duration == null) {
    return 10
  }
  try {
    return parseInt(duration)
  } catch {
    return 10
  }
}

const getVideoSize = (): string => {
  const videoSize = localStorage.getItem("videoSize")
  if (videoSize == null) {
    return "twitter"
  }
  return videoSize
}

export const AppMain = () => {
  const [settingOpen, setSettingOpen] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imageFileSrc, setImageFileSrc] = useState<string | null>(null)
  const [movieDuration, setMovieDuration] = useState(getMovieDuration())
  const [videoSize, setVideoSize] = useState(getVideoSize())
  const [progress, setProgress] = useState(0)
  const [movieSrc, setMovieSrc] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const onClickSettingButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setSettingOpen(!settingOpen)
  }

  const onDropFile = (file: File) => {
    setImageFile(file)
    setImageFileSrc(URL.createObjectURL(file))
  }

  const convert = async () => {
    if (imageFile == null) {
      return
    }
    const maxSize = videoSizeToMaxSize(videoSize)
    const converter = new ImageMovieConverter(
      new Uint8Array(await imageFile.arrayBuffer()),
      {
        duration: movieDuration,
        maxSize: maxSize,
      }
    )

    converter.onProgress((progress) => {
      setProgress(progress)
    })

    setIsProcessing(true)

    const movieData = await converter.start()
    const movieBlob = new Blob([movieData], { type: "video/mp4" })
    
    setMovieSrc(URL.createObjectURL(movieBlob))
    setIsProcessing(false)
  }

  const onConvert = () => {
    convert()
    .catch((error) => {
      alert(`変換に失敗しました ${error}`)
    })
  }

  const onMovieDurationSelect = (value: number) => {
    localStorage.setItem("movieDuration", value.toString())
    setMovieDuration(value)
  }

  const onVideoSizeSelect = (value: string) => {
    localStorage.setItem("videoSize", value)
    setVideoSize(value)
  }

  const downloadMovie = () => {
    if (movieSrc == null) {
      return
    }
    const a = document.createElement("a")
    a.href = movieSrc

    a.download = "output.mp4"
    a.click()
  }

  return (
    <_AppMain>
      <_SettingButtonContainer>
        <SettingButton onClick={onClickSettingButton}/>
        {
          settingOpen && (
            <MenuOverlay>
              <_MenuOverlayContainer>
                <PulldownMenu
                  title="動画時間"
                  selectedValue={movieDuration}
                  options={movieDurationOptions}
                  onSelect={onMovieDurationSelect}                
                />
                <PulldownMenu
                  title="動画サイズ"
                  selectedValue={videoSize}
                  options={videoSizeOptions}
                  onSelect={onVideoSizeSelect}                
                />
              </_MenuOverlayContainer>
            </MenuOverlay>
          )
        }
        
      </_SettingButtonContainer>
      <ImageDropzone
        onDropFile={onDropFile}
        imageSrc={imageFileSrc}
        emptyText="イラストをドロップ"
      />
      <ProminentButton disabled={imageFile == null || isProcessing} onClick={onConvert}>
        画像を動画に変換
      </ProminentButton>
      <_ExecutionContainer $isDisabled={!(isProcessing || movieSrc != null)}>
        <ProgressBar progress={progress} rightText={`${Math.round(progress*100)}%`}/>
        <VideoContainer url={movieSrc ?? undefined}/>
        <ProminentButton disabled={movieSrc == null} onClick={downloadMovie}>
          動画をダウンロード
        </ProminentButton>
      </_ExecutionContainer>
    </_AppMain>
  )
}