import React, { useState } from 'react';
import { Upload, X, CheckCircle } from 'lucide-react';

export default function ScreenshotUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      setSelectedFile(file);
      setUploadSuccess(false);
    }
  };

  const handleUploadScreenshot = async () => {
    if (!selectedFile) {
      alert('Please select a screenshot first');
      return;
    }

    setIsUploading(true);
    
    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('screenshot', selectedFile);
      formData.append('timestamp', new Date().toISOString());
      formData.append('customerEmail', 'customer@example.com'); // In real app, get from user session
      
      // Simulate API call to send email with screenshot
      // In a real application, this would call your backend API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo purposes, we'll show success
      // In real implementation, this would send to cardvaulter@gmail.com
      console.log('Screenshot would be sent to cardvaulter@gmail.com with details:', {
        fileName: selectedFile.name,
        fileSize: selectedFile.size,
        timestamp: new Date().toISOString()
      });
      
      setUploadSuccess(true);
      setTimeout(() => {
        setUploadSuccess(false);
        setSelectedFile(null);
      }, 3000);
      
    } catch (error) {
      alert('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setUploadSuccess(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
      <div className="text-center mb-6">
        <Upload className="w-12 h-12 text-orange-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Upload Payment Screenshot
        </h2>
        <p className="text-gray-600">
          Send your payment confirmation screenshot to cardvaulter@gmail.com
        </p>
      </div>

      {!selectedFile ? (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-orange-400 transition-colors">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            id="screenshot-upload"
          />
          <label
            htmlFor="screenshot-upload"
            className="cursor-pointer flex flex-col items-center"
          >
            <div className="text-6xl mb-4">📷</div>
            <div className="text-lg font-medium text-gray-700 mb-2">
              Click to select screenshot
            </div>
            <div className="text-sm text-gray-500">
              PNG, JPG, JPEG up to 5MB
            </div>
          </label>
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="text-green-600 mr-3">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <div className="text-lg font-medium text-gray-800">
                  {selectedFile.name}
                </div>
                <div className="text-sm text-gray-500">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </div>
              </div>
            </div>
            <button
              onClick={handleRemoveFile}
              className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
              disabled={isUploading}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <button
            onClick={handleUploadScreenshot}
            disabled={isUploading}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center text-lg"
          >
            {isUploading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                <span>Sending to cardvaulter@gmail.com...</span>
              </>
            ) : (
              <>
                <Upload className="w-5 h-5 mr-2" />
                <span>Send Screenshot</span>
              </>
            )}
          </button>
        </div>
      )}
      
      {uploadSuccess && (
        <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
            <div className="text-green-800 font-bold text-lg">
              Screenshot sent successfully!
            </div>
          </div>
          <div className="text-sm text-green-700">
            Your payment screenshot has been sent to cardvaulter@gmail.com
          </div>
        </div>
      )}
    </div>
  );
}