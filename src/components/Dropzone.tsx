import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'sonner';

interface DropzoneProps {
  onDrop: (files: File[]) => void;
}

export function Dropzone({ onDrop }: DropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  
  const onDropCallback = useCallback((acceptedFiles: File[]) => {
    setIsDragging(false);
    if (acceptedFiles.length > 0) {
      onDrop(acceptedFiles);
    }
  }, [onDrop]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onDropCallback,
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    maxFiles: 1
  });

  return (
    <div 
      {...getRootProps()}
      className={`px-3 py-1 rounded cursor-pointer ${isDragging ? 'bg-teal-100 dark:bg-teal-900' : 'hover:bg-gray-200 dark:hover:bg-gray-700'} transition-colors`}
    >
      <input {...getInputProps()} />
      <i className="fa-solid fa-image mr-1"></i>
      {isDragging ? '释放上传' : '上传图片'}
    </div>
  );
}
