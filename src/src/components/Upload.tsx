import { useState, useRef } from 'react';
import { storage } from '../firebase';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { User } from 'firebase/auth';

interface UploadProps {
  user: User;
}

const Upload = ({ user }: UploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setUploadProgress(0);

    try {
      const file = files[0];
      const fileName = `${Date.now()}-${file.name}`;
      const storageRef = ref(storage, `users/${user.uid}/photos/${fileName}`);

      // Create upload task
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Listen for state changes and progress
      uploadTask.on('state_changed', 
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.error('Error uploading file:', error);
          setUploading(false);
        },
        async () => {
          // Get the download URL
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log('File uploaded successfully:', downloadURL);
          
          // Reset the file input
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
          setUploading(false);
          setUploadProgress(0);
        }
      );
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (!files || files.length === 0) return;

    if (fileInputRef.current) {
      fileInputRef.current.files = files;
      handleFileSelect({ target: { files } } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  return (
    <div 
      className="bg-white rounded-xl p-8 shadow-lg border border-gray-100"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="text-center">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">Upload your photos</h3>
        <p className="mt-1 text-sm text-gray-500">
          Drag and drop your photos here, or click to select files
        </p>
        <div className="mt-6">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="image/*"
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#0071e3] hover:bg-[#0077ed] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0071e3] cursor-pointer"
          >
            Select Photos
          </label>
        </div>
      </div>

      {uploading && (
        <div className="mt-4">
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-[#0071e3] bg-blue-100">
                  Uploading...
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-[#0071e3]">
                  {Math.round(uploadProgress)}%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-100">
              <div
                style={{ width: `${uploadProgress}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#0071e3] transition-all duration-300"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Upload;
