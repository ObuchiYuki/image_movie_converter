import { FFmpeg } from '@ffmpeg/ffmpeg';

export type ConvertConfig = {
  duration: number;
  maxSize: number | null;
}

export class ImageMovieConverter {
  ffmpeg: FFmpeg;
  progressEventHandlers: ((progress: number) => void)[] = [];
  image: Uint8Array;
  config: ConvertConfig;

  constructor(image: Uint8Array, config: ConvertConfig) {
    this.ffmpeg = new FFmpeg();
    this.image = image;
    this.config = config;
  }

  async start(): Promise<Uint8Array> {
    await this.ffmpeg.load();

    this.ffmpeg.writeFile('input.png', this.image);

    // scale down
    let inputFileName = 'input.png';
    if (this.config.maxSize != null) {
      console.log('scaling image');
      const args = [
        "-i", "input.png",
        "-vf", `scale=${this.config.maxSize}:${this.config.maxSize}:force_original_aspect_ratio=decrease:force_divisible_by=2`,
        "scaled_image.png"
      ]
      console.log(args);
      await this.ffmpeg.exec(args);
      inputFileName = 'scaled_image.png';
    }

    this.ffmpeg.on('log', (message) => {
      const frameCount = this.extractFrameCount(message.message);
      console.log(`message: ${message.message}`);
      console.log(`frameCount: ${frameCount}`);
      if (frameCount != null) {
        this.sendProgress(frameCount / this.config.duration);
      }
    });

    console.log('converting image to video');
    console.log(`duration: ${this.config.duration}`);
    console.log(`maxSize: ${this.config.maxSize}`);
    console.log(`inputFileName: ${inputFileName}`);

    const args = [
      "-loop", "1",
      "-i", inputFileName,
      "-c:v", "libx264",
      "-preset", "veryfast",
      "-tune", "stillimage",
      "-crf", "28",
      "-r", "1",
      "-t", this.config.duration.toString(),
      "-pix_fmt", "yuv420p",
      "output.mp4"
    ];
    
    await this.ffmpeg.exec(args);

    const data = await this.ffmpeg.readFile('output.mp4') as Uint8Array;

    return data;
  }

  onProgress(progress: (progress: number) => void) {
    this.progressEventHandlers.push(progress);
  }

  private extractFrameCount(log: string): number | null {
    const match = log.match(/frame=\s*(\d+)/); 
    return match ? parseInt(match[1], 10) : null;
}

  private sendProgress(progress: number) {
    this.progressEventHandlers.forEach(handler => handler(progress));
  }
}