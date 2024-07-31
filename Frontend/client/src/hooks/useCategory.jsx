import axios from "axios";
import { useEffect, useState } from "react"
import toast from "react-hot-toast";

const useCategory = () => {
    const [categories, setCategories] = useState([]);
    const API_BASE_URL = import.meta.env.VITE_APP_URL

    //get all category
 const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/api/v1/category/get-category`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);
 return categories
}

export default useCategory