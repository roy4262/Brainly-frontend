import React from 'react';
import { BACKEND_URL } from '../Config';

interface FileViewerProps {
  filename: string;
  title: string;
}

export const FileViewer: React.FC<FileViewerProps> = ({ filename, title }) => {
  const fileUrl = `${BACKEND_URL}/file/${filename}`;
  
  return (
    <div className="w-full h-full">
      <iframe
        src={fileUrl}
        title={title}
        className="w-full h-full border-none"
        style={{ minHeight: '400px' }}
      />
    </div>
  );
};

export default FileViewer;