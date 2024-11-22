import React, { useState } from 'react';
import styled from 'styled-components';
import ImageDropzone from './components/_ImageDropzone';
import ProgressBar from './components/content-view/ProgressBar';
import { FFmpeg } from '@ffmpeg/ffmpeg';

const Container = styled.div`
  padding: 20px;
  text-align: center;
`;

const RunButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
`;

const VideoContainer = styled.div`
  margin-top: 20px;
`;

const App: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageFileURL, setImageFileURL] = useState<string | null>(null);
  const [watermarkFile, setWatermarkFile] = useState<File | null>(null);
  const [watermarkFileURL, setWatermarkFileURL] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [processing, setProcessing] = useState<boolean>(false);

  const ffmpeg = new FFmpeg();

  const handleRun = async () => {
    if (!imageFile) {
      alert('画像をドラッグ&ドロップしてください。');
      return;
    }

    setProcessing(true);
    setProgress(0);

    await ffmpeg.load();

    const imageData = await imageFile.arrayBuffer();
    ffmpeg.writeFile('input.png', new Uint8Array(imageData));

    if (watermarkFile) {
      const watermarkData = await watermarkFile.arrayBuffer();
      ffmpeg.writeFile('watermark.png', new Uint8Array(watermarkData));
    }


    ffmpeg.on('log', (message) => {
      console.log(message.message);
    });

    ffmpeg.on('progress', (event) => {
      console.log(`progress: ${event.progress}`);
      setProgress(event.progress * 100);
    });

    await ffmpeg.exec([
      '-i', 'input.png',
      '-vf', 'scale=1200:1200:force_original_aspect_ratio=decrease:force_divisible_by=2',
      'scaled_image.png'
    ]);
    
    // ignore the watermark for now
    const args = "-loop 1 -i scaled_image.png -c:v libx264 -preset veryfast -tune stillimage -crf 28 -r 1 -t 10 -pix_fmt yuv420p output.mp4".split(' ');

    await ffmpeg.exec(args);

    setImageFile(null);
    setImageFileURL(null);

    setWatermarkFile(null);
    setWatermarkFileURL(null);

    const data = await ffmpeg.readFile('output.mp4');

    const url = URL.createObjectURL(
      new Blob([data], { type: 'video/mp4' })
    );
    setVideoUrl(url);
    setProcessing(false);
  };

  const onDropImage = (file: File) => {
    setImageFile(file);
    setImageFileURL(URL.createObjectURL(file));
  }

  const onDropWatermark = (file: File) => {
    setWatermarkFile(file);
    setWatermarkFileURL(URL.createObjectURL(file));
  }

  const run = () => {
    handleRun()
      .catch((error) => {
        console.error(error);
        setProcessing(false);
      })
  }

  return (
    <Container>
      <h1>画像を動画に変換するアプリ</h1>
      <ImageDropzone onDropFile={onDropImage} emptyText="ここに画像をドロップ" imageSrc={imageFileURL} />
      <ImageDropzone onDropFile={onDropWatermark} emptyText="ここにウォーターマークをドロップ" imageSrc={watermarkFileURL} />
      <RunButton onClick={run} disabled={processing}>
        Run
      </RunButton>
      {processing && <ProgressBar progress={progress} />}
      {videoUrl && (
        <VideoContainer>
          <h2>生成された動画</h2>
          <video src={videoUrl} controls width="600" />
          <div>
            <a href={videoUrl} download="output.mp4">
              ダウンロード
            </a>
          </div>
        </VideoContainer>
      )}
    </Container>
  );
};

export default App;
