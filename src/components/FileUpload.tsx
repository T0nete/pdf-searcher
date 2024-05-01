'use client';

import React from 'react';
import { useDropzone } from 'react-dropzone';
import { uploadFileToBucket } from '@/lib/supabase/supabase';

const FileUpload = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [fileName, setFileName] = React.useState<string | null>(
    'TFM_Grupo4_Entrega_Final (1).pdf'
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'aplication/pdf': ['.pdf'],
    },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      setIsLoading(true);

      // Validate file size
      // Upload file to Supabase
      const file = acceptedFiles[0];
      try {
        await uploadFileToBucket(file);
        const res = await fetch('/api/create-chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ fileName: file.name }),
        });
        // console.log(res);
        setFileName(file.name);
      } catch (error) {
        console.error(error);
        return;
      }

      setIsLoading(false);
    },
  });

  const handleSubmitButton = () => {
    if (!fileName) {
      return;
    }
    console.log('fileName', fileName);

    console.log(fileName);
    const res = fetch('/api/chat-test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fileName }),
    });
  };

  return (
    <>
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
      <div className="space-y-36" />
      <button onClick={handleSubmitButton}>TEST</button>
    </>
  );
};

export default FileUpload;
