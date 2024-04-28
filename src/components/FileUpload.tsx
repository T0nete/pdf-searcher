'use client';

import { uploadFileToBucket } from '@/lib/supabase';
import React from 'react';
import { useDropzone } from 'react-dropzone';

const FileUpload = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'aplication/pdf': ['.pdf'],
    },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      console.log(acceptedFiles);
      setIsLoading(true);

      // Validate file size

      // Upload file to Supabase
      const file = acceptedFiles[0];
      try {
        await uploadFileToBucket(file);
      } catch (error) {
        console.error(error);
        return;
      }

      setIsLoading(false);
    },
  });

  return (
    <div className="p-4 bg-red border border-sky-600 rounded-xl">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag n drop some files here, or click to select files</p>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
