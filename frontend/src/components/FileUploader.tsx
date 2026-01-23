import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { CloudUpload, X } from 'lucide-react';
import { validateImage, resizeImage } from '../lib/imageUtils';

interface FileUploaderProps {
  value: File[];
  onChange: (files: File[]) => void;
  onError?: (message: string) => void;
  error?: string;
  multiple?: boolean;
}

export function FileUploader({ value, onChange, onError, error, multiple = true }: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Create a stable key for file array to detect changes
  const fileKey = useMemo(
    () => value.map(f => `${f.name}-${f.size}-${f.lastModified}`).join(','),
    [value]
  );

  // Update preview URLs when value changes
  useEffect(() => {
    // Clean up old URLs first
    previewUrls.forEach((url) => URL.revokeObjectURL(url));
    
    if (value.length > 0) {
      // Create new preview URLs
      const urls = value.map((file) => URL.createObjectURL(file));
      setPreviewUrls(urls);
    } else {
      setPreviewUrls([]);
    }

    // Cleanup function
    return () => {
      setPreviewUrls((prev) => {
        prev.forEach((url) => URL.revokeObjectURL(url));
        return [];
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileKey]);

  const handleFileSelect = useCallback(
    async (files: FileList | null) => {
      if (!files || files.length === 0) return;

      setIsProcessing(true);
      const fileArray = Array.from(files);

      try {
        // Validate all files first
        for (const file of fileArray) {
          const validation = validateImage(file);
          if (!validation.valid) {
            throw new Error(validation.error || 'Invalid image file');
          }
        }

        // Resize all images
        const resizedFiles = await Promise.all(
          fileArray.map((file) => resizeImage(file))
        );

        // Combine with existing files if multiple is true
        const newFiles = multiple ? [...value, ...resizedFiles] : resizedFiles;
        
        // Limit to 5 files max (based on schema)
        const limitedFiles = newFiles.slice(0, 5);
        
        onChange(limitedFiles);
      } catch (err) {
        console.error('File processing error:', err);
        const errorMessage = err instanceof Error ? err.message : 'Failed to process images. Please try again.';
        if (onError) {
          onError(errorMessage);
        }
      } finally {
        setIsProcessing(false);
      }
    },
    [value, onChange, multiple, onError]
  );

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      handleFileSelect(e.dataTransfer.files);
    },
    [handleFileSelect]
  );

  const handleClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleFileSelect(e.target.files);
      // Reset input so same file can be selected again
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    },
    [handleFileSelect]
  );

  const handleRemove = useCallback(
    (index: number) => {
      const newFiles = value.filter((_, i) => i !== index);
      // Clean up preview URL
      if (previewUrls[index]) {
        URL.revokeObjectURL(previewUrls[index]);
      }
      const newPreviewUrls = previewUrls.filter((_, i) => i !== index);
      setPreviewUrls(newPreviewUrls);
      onChange(newFiles);
    },
    [value, previewUrls, onChange]
  );

  const hasFiles = value.length > 0;

  return (
    <div className="space-y-2">
      {!hasFiles ? (
        <div
          onClick={handleClick}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            border-dashed border-2 rounded-sinsay-lg p-8 min-h-[200px]
            flex flex-col items-center justify-center
            cursor-pointer transition-all duration-200
            ${isDragging ? 'border-[#3B82F6] bg-[#F8FAFC] border-solid' : 'border-[#CBD5E1] bg-[#F1F5F9] hover:bg-[#F8FAFC] hover:border-[#94A3B8]'}
            ${isProcessing ? 'opacity-50 cursor-wait' : ''}
          `}
        >
          <CloudUpload size={40} color="#64748B" className="mb-3 md:mb-4" />
          <p className="text-center text-[#64748B] text-sm md:text-base">
            Drag and drop images here, or click to browse
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div
            onClick={handleClick}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`
              border-dashed border-2 rounded-sinsay-md p-4 min-h-[100px]
              flex flex-col items-center justify-center
              cursor-pointer transition-all duration-200
              ${isDragging ? 'border-[#3B82F6] bg-[#F8FAFC] border-solid' : 'border-[#CBD5E1] bg-[#F1F5F9] hover:bg-[#F8FAFC] hover:border-[#94A3B8]'}
              ${isProcessing ? 'opacity-50 cursor-wait' : ''}
            `}
          >
            <CloudUpload size={28} color="#64748B" className="mb-2" />
            <p className="text-center text-xs md:text-sm text-[#64748B]">
              {multiple && value.length < 5
                ? 'Drag and drop more images here, or click to browse'
                : 'Click to replace images'}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:gap-4">
            {value.map((file, index) => (
              <div key={index} className="relative group">
                <img
                  src={previewUrls[index] || ''}
                  alt={`Preview ${index + 1}`}
                  className="w-[100px] h-[100px] md:w-[120px] md:h-[120px] object-cover rounded-sinsay-md border border-[#E2E8F0] shadow-sm"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(index);
                  }}
                  className="absolute -top-1.5 -right-1.5 md:-top-2 md:-right-2 w-5 h-5 md:w-6 md:h-6 bg-[#DC2626] hover:bg-[#EF4444] rounded-full flex items-center justify-center transition-colors shadow-sm"
                  aria-label="Remove image"
                >
                  <X size={12} color="white" className="md:w-3.5 md:h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        multiple={multiple}
        onChange={handleFileInputChange}
        className="hidden"
      />

      {error && (
        <p className="text-[#DC2626] text-xs md:text-sm mt-1.5">{error}</p>
      )}

      {hasFiles && !error && (
        <p className="text-xs md:text-sm text-[#64748B]">
          {value.length} image(s) selected
        </p>
      )}
    </div>
  );
}
