import toast from "react-hot-toast";
import Layout from "../Component/Layout"
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";


const ProductDetails = () => {
    const params=useParams()
    const API_BASE_URL = import.meta.env.VITE_APP_URL;
    const [product, setProduct] = useState({});

    //initial time getting product
    useEffect(() => {
       if(params?.slug) getProduct();
    },[params?.slug])
    //get product
    const getProduct = async() => {
        try {
            const {data} = await axios.get(`${API_BASE_URL}/api/v1/product/get-product/${params.slug}`)
            setProduct(data.product)
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in getting product")
        }
    }
    return (
        <Layout>
            <div className="row mt-3">
                <div className="col-md-6">

                    <img
                        src={`${API_BASE_URL}/api/v1/product/product-photo/${product._id}`}
                        className="card-img-top product-image"
                        alt={product.name}
                      
                    />
                </div>
                <div className="col-md-6 product-textinfo">
                    <h1 className="text-center">Product Details</h1>
                    <h4>Name:{product.name }</h4>
                    <h4>Description:{product.description }</h4>
                    <h4>category:{product?.category?.name }</h4>
                    <h4>Price:${product.price }</h4>
                    <button className="btn btn-secondary ms-1">ADD TO CART</button>
                </div>
            </div>
           
        </Layout>
    );
}

export default ProductDetails