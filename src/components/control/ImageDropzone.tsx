import { useState } from "react";
import styled from "styled-components";

const _Dropzone = styled.div<{ $isDragging: boolean }>`
  /* border: 2px dashed #aaa; */
  border: 2px dashed ${({ $isDragging }) => ($isDragging ? "#C34CEE" : "#ccc")};
  border-radius: 10px;
  padding: 0;
  cursor: pointer;
  width: 300px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $isDragging }) => ($isDragging ? "#C34CEE" : "white")};
  transition: color 0.3s, border-color 0.3s;
  transition: border-color 0.3s;
`;

const _ImagePreview = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;


export const ImageDropzone = ({ 
  onDropFile,
  imageSrc, 
  emptyText 
} : {
  onDropFile: (file: File) => void,
  imageSrc: string | null,
  emptyText: string,
}) => {
  const [dragging, setDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    onDropFile(file);
    setDragging(false);
  };

  const onClick = () => { // pick file from file picker
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        onDropFile(file);
      }
    };
    input.click();
  }

  return (
    <_Dropzone onDragOver={handleDragOver} onDrop={handleDrop} onDragLeave={() => setDragging(false)} $isDragging={dragging} onClick={onClick}>
      {imageSrc ? (
        <_ImagePreview src={imageSrc} alt="Dropped image" />
      ) : (
        emptyText
      )}
    </_Dropzone>
  );
}