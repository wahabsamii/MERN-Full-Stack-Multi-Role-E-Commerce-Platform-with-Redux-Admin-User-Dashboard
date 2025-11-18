import axios from "axios"
import {toast} from "react-toastify";
import { BASE_URL } from "../config";
 
 const Modal = ({ isOpen, onClose, title, children,pr }) => {
  if (!isOpen) return null
  const deletePro = async() => {
    try {
      const response = await axios.post(`${BASE_URL}/api/product/delete/${pr}`);
      if (response.data.success) {
        toast.success(response.data.message);
        onClose()
      }
    } catch (error) {
      toast.error(error)
    }
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.6)] bg-opacity-50">
      <div className="bg-white rounded-xl shadow-lg w-[400px] max-w-[90%] p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute cursor-pointer top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
        >
          &times;
        </button>

        {/* Title */}
        {title && <h2 className="text-lg font-bold mb-4">{title}</h2>}

        {/* Modal Body */}
        <div>{children}</div>
        <div className='mt-6'>
            <button onClick={onClose} className='p-2 px-6 rounded-full bg-gray-200 cursor-pointer'>Cancel</button>
            <button onClick={() => deletePro()} className='p-2 px-6 rounded-full bg-red-500 text-white ml-3 cursor-pointer'>Delete</button>
        </div>
      </div>
    </div>
  )
}

export default Modal
