import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import FormInput from "../customs/FormInputs"
  
const CreateProduct = ({children}:{children:React.ReactNode}) => {
  return (
    <Dialog>
  <DialogTrigger>{children}</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Create a New product</DialogTitle>
      <DialogDescription className="p-3 flex flex-col">
       <FormInput/>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

  )
}

export default CreateProduct
