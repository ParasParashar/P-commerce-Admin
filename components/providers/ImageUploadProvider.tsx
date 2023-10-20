"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { ImagePlus } from "lucide-react";

declare global {
  var cloudinary: any;
}

const uploadPreset = "vyin2ao7";

interface ImageUploadProps {
  onChange: (value: string[]) => void;
  value: string[];
}

const ImageUploadProvider: React.FC<ImageUploadProps> = ({
  onChange,
  value,
}) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset={uploadPreset}
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open()}
            className="
            themes
              relative
              cursor-pointer
              hover:opacity-70
              transition`
              border-dashed 
              border-2 
              p-20
              border-neutral-300
              flex
              flex-col
              justify-center
              items-center
              gap-4
              text-neutral-600
            "
          >
            <ImagePlus />
            <div className="font-semibold text-lg text-center">
              Click to upload
              <p className="text-xs font-light">
                You can select one image at a time.
              </p>
            </div>
            {value && (
              <div
                className="
              absolute inset-0 w-full h-full"
              >
                <Image
                  style={{ objectFit: "cover" }}
                  fill
                  src={value}
                  alt="IMAGE OF PRODUCT"
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUploadProvider;