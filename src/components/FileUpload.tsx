'use client';

import React from 'react';
import axios, { isAxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import { uploadFileToBucket } from '@/lib/supabase/supabase-storage';
import UploadIcon from '@/components/icons/UploadIcon';
import LoadingIcon from '@/components/icons/LoadingIcon';
import { cn } from '@/lib/utils';

interface FileUploadProps {
  handleIsLoading?: (isLoading: boolean) => void;
  className?: string;
}
const FileUpload = (props: FileUploadProps) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'aplication/pdf': ['.pdf'],
    },
    maxFiles: 1,
    disabled: isLoading,
    onDrop: async (acceptedFiles) => {
      props.handleIsLoading?.(true);
      setIsLoading(true);

      // Validate file size
      if (acceptedFiles[0].size > 10 * 1024 * 1024) {
        toast.error('File size is too large, please upload a file under 10MB.');
        props.handleIsLoading?.(false);
        setIsLoading(false);
        return;
      }
      // Upload file to Supabase
      const file = acceptedFiles[0];
      const fileName = file.name.replace(/\s/g, '-');
      const timestamp = new Date().getTime();
      const fileKey = `${timestamp}-${fileName}`;
      try {
        // Validate if the user has already uploaded a file
        const searchParams = encodeURIComponent(fileKey);
        const { data } = await axios.get(`/api/chat?fileName=${searchParams}`);

        if (!data.success) {
          toast.error(data.message);
          return;
        }

        // In case of having a chat with the same file name for the user return the chatId

        if (data.chats?.length > 0) {
          if (data.message) {
            toast.warn(data.message);
          }
          router.push(`/chat/${data.chats[0].id}`);
          return;
        }

        await uploadFileToBucket(file, fileKey);

        const res = await axios.post('/api/create-chat', {
          fileName: fileName,
          fileKey: fileKey,
        });

        toast.success('File uploaded successfully!');
        router.push(`/chat/${res.data.chatId}`);
      } catch (error) {
        let errorMessage = 'An error occurred while uploading the file';
        if (isAxiosError(error)) {
          errorMessage = error.response?.data.message;
        } else if (error instanceof Error) {
          errorMessage = error.message;
        }

        toast.error(errorMessage);
        return;
      } finally {
        setIsLoading(false);
        props.handleIsLoading?.(false);
      }
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`group rounded border border-light-gray bg-dark-gray hover:cursor-pointer hover:border-brand-orange shadow-md hover:shadow-brand-orange transition-all duration-300 ${isDragActive
        ? 'border-brand-orange shadow-brand-orange transition-all duration-300'
        : ''
        }`}
    >
      <div className={cn("w-96 h-96 flex items-center justify-center", props.className)}>
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
                className={`w-24 h-24 text-light-gray group-hover:text-white transition-all duration-300 ${isDragActive ? 'text-white' : ' '
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
