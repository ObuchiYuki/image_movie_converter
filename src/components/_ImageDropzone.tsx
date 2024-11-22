import React from 'react';
import styled from 'styled-components';

interface Props {
  onDropFile: (file: File) => void;
  emptyText: string;
  imageSrc: string | null;
}

const Dropzone = styled.div`
  border: 2px dashed #aaa;
  padding: 0;
  margin: 20px;
  cursor: pointer;
  width: 300px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImagePreview = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

const _ImageDropzone: React.FC<Props> = ({ onDropFile, emptyText, imageSrc }) => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    onDropFile(file);
  };

  return (
    <Dropzone onDragOver={handleDragOver} onDrop={handleDrop}>
      {imageSrc ? (
        <ImagePreview src={imageSrc} alt="Dropped image" />
      ) : (
        emptyText
      )}
    </Dropzone>
  );
};

export default _ImageDropzone;
