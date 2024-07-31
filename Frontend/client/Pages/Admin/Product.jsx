import { useEffect, useState } from "react";
import AdminMenu from "../../Component/AdminMenu"
import Layout from "../../Component/Layout"
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";
const Product = () => {
    const [products, setProducts] = useState([])
    const API_BASE_URL = import.meta.env.VITE_APP_URL;
    
    //get all products
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(`${API_BASE_URL}/api/v1/product/get-product`)
            setProducts(data.product)
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong while getting products")
        }
    }
    useEffect(() => {
        getAllProducts();
    }, [])
    return (
        <Layout>
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                <div className="col-md-9 ">
                    <h1 className="text-center">All Products List</h1>
                    <div className="product-information">
                        {products?.map((p) => (
                            <Link
                                key={p._id}
                                to={`/dashboard/admin/product/${p.slug}`}
                                className="product-link"
                            >
                                <div className="card m-3" style={{ width: "18rem" }}>
                                    <img
                                        src={`${API_BASE_URL}/api/v1/product/product-photo/${p._id}`}
                                        className="card-img-top"
                                        alt={p.name}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{p.name}</h5>
                                        <p className="card-text">{p.description}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Product