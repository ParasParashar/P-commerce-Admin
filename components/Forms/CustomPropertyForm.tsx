"use client";

import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Product } from "@prisma/client";
import { MinusCircle, Pencil, PlusCircle } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
type props = {
  productId: string;
  initialData: Product & propertyType;
};
type propertyType = {
  properties: {
    name: string;
    value: string[];
    productId: string;
  }[];
};
const CustomPropertyForm = ({ productId, initialData }: props) => {
  const router = useRouter();
    useEffect(() => {
      if(initialData.properties.length > 0){

        setProperties(
          initialData?.properties.map((data) => ({
            name: data.name,
            value: data.value.join(' '),
          }))
          );
        }
      }, [initialData.properties]);
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };
  const [properties, setProperties] = useState<
    Array<{ name: string; value: string }>
  >([{ name: "", value: "" }]);

  const updatePropertyName = (index: number, newName: string) => {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].name = newName;
      return properties;
    });
  };

  const updatePropertyValue = (index: number, newValue: string) => {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].value = newValue;
      return properties;
    });
  };

  const onSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const data = {
        properties: properties.map((p) => ({
          name: p.name,
          value: p.value.split(","),
        })),
      };
      await axios.patch(`/api/create/${productId}/properties/customs`, data);
      toast.success("Custom Properties Updated");
      router.refresh();
      toggleEdit();
    } catch (error) {
      toast.error("Something went Wrong");
    }
  };

  const createProperty = () => {
    setProperties((prev: { name: string; value: string }[]) => [
      ...prev,
      { name: "", value: "" },
    ]);
  };

  const removeProperty = (propertyIndex: number) => {
    setProperties((prev) =>
      prev.filter((id, index) => index !== propertyIndex)
    );
  };
  return (
    <div className="mt-6 themes border bg-slate-100 rounded-md p-4">
      <div className="font-medium items-center flex justify-between">
        Custom Product Properties
        <Button variant={"ghost"} onClick={toggleEdit}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit Property
            </>
          )}
        </Button>
      </div>
      {isEditing ? (
        <div>
          <Button
            onClick={createProperty}
            className="ml-auto flex items-center gap-2"
            variant={"outline"}
          >
            <PlusCircle className="h-5 w-5 text-blue-500" />
            Create More Property
          </Button>
          <form onSubmit={(e) => onSubmit(e)}>
            {properties.map((properties, index) => (
              <div key={index} className="flex flex-wrap gap-1.5 my-3">
                <div className="flex items-center w-full gap-2">
                  <span className="p-2 rounded-md bg-white themes">Name:</span>
                  <Input
                    className="w-full"
                    placeholder="Name of property Eg: 'Storage' "
                    required
                    value={properties.name}
                    onChange={(e) => updatePropertyName(index, e.target.value)}
                  />
                </div>
                <div className="flex items-center w-full gap-2">
                  <span className="p-2 rounded-md bg-white themes">Value:</span>
                  <Input
                    className="w-full"
                    placeholder="Value of property Eg: '1Tb,2Tb,6Tb' "
                    required
                    value={properties.value}
                    onChange={(e) => updatePropertyValue(index, e.target.value)}
                  />
                </div>
                <span className="text-xs text-center text-fuchsia-700">
                  You can add multiple values at the same time & use " , " to
                  add multiple value at the same time.
                </span>
                <Button
                  className="ml-auto flex gap-2 items-center"
                  type="button"
                  variant={"outline"}
                  onClick={() => removeProperty(index)}
                >
                  <MinusCircle className="h-5 w-5 text-red-500" />
                  Remove
                </Button>
              </div>
            ))}
            <Button>Create</Button>
          </form>
        </div>
      ) : (
        <div>
        {initialData.properties.map((data, index) => (
          <div key={index} className="flex items-center mb-2">
            <p className="mr-2 text-lg font-semibold">{data.name}:</p>
            <p className="text-gray-700">{data.value.join(', ')}</p>
          </div>
        ))}
        {initialData.properties.length === 0 && (
          <p className="text-sm mt-2 italic font-semibold">Create custom Properties</p>
        )}
      </div>
      
      )}
    </div>
  );
};

export default CustomPropertyForm;
