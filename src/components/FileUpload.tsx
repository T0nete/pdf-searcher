'use client';

import React from 'react';
import { useDropzone } from 'react-dropzone';
import { uploadFileToBucket } from '@/lib/supabase/supabase-storage';
import UploadIcon from './icons/UploadIcon';
import LoadingIcon from './icons/LoadingIcon';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';

const FileUpload = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [fileName, setFileName] = React.useState<string | null>(
    'TFM_Grupo4_Entrega_Final (1).pdf'
  );
  const router = useRouter();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'aplication/pdf': ['.pdf'],
    },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      setIsLoading(true);

      // Validate file size
      if (acceptedFiles[0].size > 10 * 1024 * 1024) {
        toast.error('File size is too large, please upload a file under 10MB.');
        setIsLoading(false);
        return;
      }
      // Upload file to Supabase
      const file = acceptedFiles[0];
      const fileName = file.name.replace(/\s/g, '-');
      try {
        await uploadFileToBucket(file, fileName);

        const res = await axios.post('/api/create-chat', {
          fileName: fileName,
        });

        toast.success('File uploaded successfully!');
        router.push(`/chat/${res.data.chatId}`);
      } catch (error) {
        console.error(error);
        toast.error('Error uploading file, please try again.');

        return;
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`group rounded border border-light-gray bg-dark-gray hover:cursor-pointer hover:border-brand-orange shadow-md hover:shadow-brand-orange transition-all duration-300 ${
        isDragActive
          ? 'border-brand-orange shadow-brand-orange transition-all duration-300'
          : ''
      }`}
    >
      <div className="w-96 h-96 flex items-center justify-center">
        <input {...getInputProps()} />
        <div className="text-2xl">
          {isLoading ? (
            <div className="flex flex-row gap-2 items-center text-brand-orange">
              <LoadingIcon className="h-12 w-12" />
              <p>Processing...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <p>Upload your PDF!</p>
              )}
              <UploadIcon
                className={`w-24 h-24 text-light-gray group-hover:text-white transition-all duration-300 ${
                  isDragActive ? 'text-white' : ' '
                }`}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
