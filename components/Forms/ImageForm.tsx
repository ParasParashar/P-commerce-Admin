"use client";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { useState } from "react";
import axios from "axios";
import { Pencil, X } from "lucide-react";
import { useRouter } from "next/navigation"; // Changed to next/router
import { Product } from "@prisma/client";
import ImageUploadProvider from "../providers/ImageUploadProvider";
import { ReactSortable } from "react-sortablejs";
interface ImageFormProps {
  productId: string;
  initialData: Product;
}

const ImageForm: React.FC<ImageFormProps> = ({ initialData, productId }) => {
  const router = useRouter();
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [sortedImages, setSortedImages] = useState<string[]>(initialData.image);
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const onSubmit = async () => {
    try {
      await axios.post(`/api/create/${productId}`, {
        image: uploadedImages,
      });
      toast.success("Image uploaded");
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong !!");
    }
  };
  const onReorder = async () => {
    try {
      await axios.patch(`/api/create/${productId}`, {
        image: sortedImages,
      });
      toast.success("Image updated");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong !!");
    }
  };

  const updateImagesOrder = (newSortedImages: string[]) => {
    setSortedImages(newSortedImages);
  };

  const handleImageChange = (selectedImages: string[]) => {
    setUploadedImages(selectedImages);
  };
  const handleDeleteImage = (imageUrl:string) => {
    setSortedImages((prev: string[]) => { 
      const index = prev.indexOf(imageUrl);
      if (index !== -1) {
        const allImages = [...prev];
        allImages.splice(index, 1);
        return allImages;
      }
      return prev;
    });
  };
  return (
    <div className="mt-6 border themes bg-slate-100 rounded-md p-4">
      <div className="font-medium items-center flex justify-between">
        Product images
        <Button variant={"ghost"} onClick={toggleEdit}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Add Image
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <div>
          {!sortedImages.length ? (
            <p className="text-sm text-center italic">Add an Image</p>
          ) : (
            <div>
              <p className="text-xs text-center font-light my-2">
                You can drag images according to your need, because the first image is
                the primary image of the product.
              </p>
            </div>
          )}

          <ReactSortable
            list={sortedImages}
            setList={updateImagesOrder}
            className="flex gap-4 flex-wrap items-center justify-center"
          >
            {sortedImages.map((image, index) => (
              <div key={index} className="relative w-32 h-32">
                <img
                  src={image}
                  alt={`Product Image ${index}`}
                  className="object-cover w-full h-full rounded-md"
                  style={{ cursor: "grab" }}
                />
                <X
                  onClick={() => handleDeleteImage(image)}
                  size={28}
                  strokeWidth={3.75}
                  absoluteStrokeWidth
                  className="hover:bg-slate-300 bg-slate-200 rounded-md p-0.1 absolute top-0 right-0 cursor-pointer"
                />
              </div>
            ))}
          </ReactSortable>
        </div>
      )}
      <>
        {isEditing ? (
          <form onSubmit={onSubmit} className="space-y-4 mt-4 ">
            <ImageUploadProvider
              value={uploadedImages}
              onChange={handleImageChange}
            />
            <div className="flex items-end gap-x-2 mt-10">
              <Button type="submit">Save</Button>
            </div>
          </form>
        ) : (
          <div onClick={onReorder} className="flex items-end gap-x-2 mt-10">
            <Button type="submit">
              Update
            </Button>
          </div>
        )}
      </>
    </div>
  );
};

export default ImageForm;