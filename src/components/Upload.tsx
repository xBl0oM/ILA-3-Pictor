import { useState, useRef, useEffect } from 'react';
import { storage } from '../firebase';
import { ref, getDownloadURL, uploadBytesResumable, listAll, deleteObject, getMetadata } from 'firebase/storage';
import { User } from 'firebase/auth';
import gsap from 'gsap';

interface UploadProps {
  user: User;
}

interface PhotoDetails {
  url: string;
  name: string;
  size: number;
  uploadedAt: Date;
}

const Upload = ({ user }: UploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [photoDetails, setPhotoDetails] = useState<PhotoDetails[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoDetails | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchUserPhotos(user.uid);
  }, [user.uid]);

  const fetchUserPhotos = async (userId: string) => {
    try {
      const storageRef = ref(storage, `users/${userId}/photos`);
      const photoList = await listAll(storageRef);
      const details = await Promise.all(
        photoList.items.map(async (item) => {
          const url = await getDownloadURL(item);
          const metadata = await getMetadata(item);
          return {
            url,
            name: item.name,
            size: metadata.size,
            uploadedAt: new Date(metadata.timeCreated),
          };
        })
      );
      setPhotoDetails(details);
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    setUploadProgress(0);
    setError(null);
    try {
      for (const file of Array.from(files)) {
        if (!file.type.startsWith('image/')) {
          setError('Only image files are allowed.');
          continue;
        }
        const fileName = `${Date.now()}-${file.name}`;
        const storageRef = ref(storage, `users/${user.uid}/photos/${fileName}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(progress);
          },
          (error) => {
            console.error('Error uploading file:', error);
            setError('Error uploading file. Please try again.');
            setUploading(false);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log('File uploaded successfully:', downloadURL);
            fetchUserPhotos(user.uid);
            setUploading(false);
            setUploadProgress(0);
          }
        );
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setError('An unexpected error occurred. Please try again.');
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleDeletePhoto = async () => {
    if (!selectedPhoto) return;
    try {
      const storageRef = ref(storage, `users/${user.uid}/photos/${selectedPhoto.name}`);
      await deleteObject(storageRef);
      console.log('Photo deleted successfully');
      await fetchUserPhotos(user.uid);
      setSelectedPhoto(null);
    } catch (error) {
      console.error('Error deleting photo:', error);
      setError('Error deleting photo. Please try again.');
    }
  };

  const handlePhotoClick = (photo: PhotoDetails, event: React.MouseEvent<HTMLDivElement>) => {
    const tile = event.currentTarget as HTMLDivElement;
    const startRect = tile.getBoundingClientRect();
    setSelectedPhoto(photo);
    requestAnimationFrame(() => {
      if (overlayRef.current) {
        gsap.set(overlayRef.current, { opacity: 0, pointerEvents: 'none' });
      }
      const tempOverlay = document.createElement('div');
      Object.assign(tempOverlay.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        zIndex: '999',
      });
      document.body.appendChild(tempOverlay);
      const clone = tile.cloneNode(true) as HTMLDivElement;
      gsap.set(clone, {
        position: 'absolute',
        top: startRect.top,
        left: startRect.left,
        width: startRect.width,
        height: startRect.height,
        zIndex: 1000,
      });
      document.body.appendChild(clone);
      const ratio = startRect.width / startRect.height;
      const maxWidth = window.innerWidth * 0.9;
      const maxHeight = window.innerHeight * 0.9;
      let finalWidth = maxWidth;
      let finalHeight = finalWidth / ratio;
      if (finalHeight > maxHeight) {
        finalHeight = maxHeight;
        finalWidth = finalHeight * ratio;
      }
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.removeChild(tempOverlay);
          document.body.removeChild(clone);
        },
      });
      tl.to(
        tempOverlay,
        {
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          duration: 0.5,
          ease: 'power2.out',
        },
        0
      );
      tl.to(
        clone,
        {
          top: '50%',
          left: '50%',
          x: '-50%',
          y: '-50%',
          width: finalWidth,
          height: finalHeight,
          duration: 0.5,
          ease: 'power2.out',
        },
        0
      );
      if (overlayRef.current) {
        tl.to(
          overlayRef.current,
          {
            opacity: 1,
            pointerEvents: 'auto',
            duration: 0.25,
          },
          '-=0.2'
        );
      }
    });
  };

  const handleCloseOverlay = () => {
    setSelectedPhoto(null);
  };

  return (
    <div className="flex flex-col h-screen p-8 bg-gray-100">
      <div className="flex-grow overflow-y-auto mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photoDetails.map((photo, index) => (
            <div
              key={index}
              className="relative cursor-pointer aspect-w-1 aspect-h-1"
              onClick={(e) => handlePhotoClick(photo, e)}
            >
              <img
                src={photo.url}
                alt={`Uploaded photo ${index + 1}`}
                className="object-cover w-full h-full rounded-lg shadow-md hover:shadow-lg transition-shadow"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
      <div className="text-center">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="image/*"
            className="hidden"
            id="file-upload"
            multiple
          />
          <label
            htmlFor="file-upload"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#0071e3] hover:bg-[#0077ed] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0071e3] cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12V3m0 0L8 7m4-4l4 4" />
            </svg>
            Upload Photos
          </label>
        </div>
        {error && (
          <div className="mt-4 text-center text-red-500">
            {error}
          </div>
        )}
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
      {selectedPhoto && (
        <div
          ref={overlayRef}
          className="fixed inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center p-8"
          onClick={handleCloseOverlay}
          style={{ opacity: 0 }}
        >
          <img
            src={selectedPhoto.url}
            alt="Selected photo"
            className="w-auto h-auto max-w-full max-h-[90vh] object-cover mb-4"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded hover:bg-red-600 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              handleDeletePhoto();
            }}
          >
            Delete Photo
          </button>
        </div>
      )}
    </div>
  );
};

export default Upload;
