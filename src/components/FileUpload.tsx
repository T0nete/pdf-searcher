'use client';

import React from 'react';
import { useDropzone } from 'react-dropzone';
import { uploadFileToBucket } from '@/lib/supabase/supabase';
import UploadIcon from './icons/UploadIcon';

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

  console.log('isDragActive', isDragActive);

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
    <div
      {...getRootProps()}
      className="group rounded border border-light-gray bg-dark-gray hover:cursor-pointer hover:border-brand-orange transition-all duration-300"
    >
      <div className="p-32">
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <div className="flex flex-col items-center">
            <p className="text-2xl">Upload your PDF!</p>
            <UploadIcon className="w-24 h-24 text-light-gray group-hover:text-white transition-all duration-300" />
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
