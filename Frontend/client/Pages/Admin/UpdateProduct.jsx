import { useState, useEffect } from "react";
import AdminMenu from '../../Component/AdminMenu';
import Layout from '../../Component/Layout';
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";

const { Option } = Select;

const UpdateProduct = () => {
    const [categories, setCategories] = useState([]);
    const params = useParams();
    const [name, setName] = useState("");
    const [photo, setPhoto] = useState(null);
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState(null);
    const [id, setId] = useState("");
    const API_BASE_URL = import.meta.env.VITE_APP_URL;
    const navigate = useNavigate();

    // Get single product by slug
    const getSingleProduct = async () => {
        try {
            const { data } = await axios.get(`${API_BASE_URL}/api/v1/product/get-product/${params.slug}`);
            if (data?.product) {
                setName(data.product.name);
                setId(data.product._id);
                setDescription(data.product.description);
                setPrice(data.product.price);
                setQuantity(data.product.quantity);
                setShipping(data.product.shipping);
                setCategory(data.product.category._id);
            } else {
                toast.error("Product not found");
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in getting single product");
        }
    };

    useEffect(() => {
        getSingleProduct();
    }, []);

    // Get all categories
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`${API_BASE_URL}/api/v1/category/get-category`);
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in getting categories");
        }
    };

    useEffect(() => {
        getAllCategory();
    }, []);

    // Update product function
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const productData = new FormData();
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("quantity", quantity);
            if (photo) productData.append("photo", photo);
            productData.append("category", category);
            productData.append("shipping", shipping ? "true" : "false");

            const { data } = await axios.put(
                `${API_BASE_URL}/api/v1/product/update-product/${id}`,
                productData
            );
            if (data?.success) {
                toast.success("Product Updated Successfully");
                navigate("/dashboard/admin/products");
            } else {
                toast.error(data?.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    const handleDelete = async (e) => {
        try {
            e.preventDefault();
            let answer = window.prompt("Are you sure you want to delete?");
            if (!answer) return;

            const { data } = await axios.delete(`${API_BASE_URL}/api/v1/product/delete-product/${id}`);
            toast.success("Product deleted successfully");
            navigate("/dashboard/admin/products");
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong while deleting product");
        }
    };

    return (
        <Layout>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Update Product</h1>
                        <div className="m-1 w-75">
                            <Select
                                bordered={false}
                                placeholder="Select a category"
                                size="large"
                                showSearch
                                className="form-select"
                                onChange={(value) => setCategory(value)}
                                value={category}
                            >
                                {categories.map((c) => (
                                    <Option key={c._id} value={c._id}>
                                        {c.name}
                                    </Option>
                                ))}
                            </Select>
                            <div className="m-3">
                                <label className="btn btn-outline-secondary col-md-12">
                                    {photo ? photo.name : "Upload Photo"}
                                    <input
                                        type="file"
                                        name="photo"
                                        accept="image/*"
                                        onChange={(e) => setPhoto(e.target.files[0])}
                                        hidden
                                    />
                                </label>
                            </div>
                            <div className="mb-3">
                                {photo ? (
                                    <div className="text-center">
                                        <img
                                            src={URL.createObjectURL(photo)}
                                            alt="product_photo"
                                            height="200px"
                                            className="img img-responsive"
                                        />
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <img
                                            src={`${API_BASE_URL}/api/v1/product/product-photo/${id}`}
                                            alt="product_photo"
                                            height="200px"
                                            className="img img-responsive"
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    value={name}
                                    placeholder="Write a name"
                                    className="form-control"
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <textarea
                                    value={description}
                                    placeholder="Write a description"
                                    className="form-control"
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="number"
                                    value={price}
                                    placeholder="Write a price"
                                    className="form-control"
                                    onChange={(e) => setPrice(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="number"
                                    value={quantity}
                                    placeholder="Write a quantity"
                                    className="form-control"
                                    onChange={(e) => setQuantity(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <Select
                                    bordered={false}
                                    placeholder="Select Shipping"
                                    size="large"
                                    showSearch
                                    className="form-select mb-3"
                                    onChange={(value) => setShipping(value === "1")}
                                    value={shipping ? "1" : "0"}
                                >
                                    <Option value="0">No</Option>
                                    <Option value="1">Yes</Option>
                                </Select>
                            </div>
                            <div className="mb-3">
                                <button className="btn btn-primary" onClick={handleUpdate}>
                                    UPDATE PRODUCT
                                </button>
                                <button className="btn btn-danger mx-2" onClick={handleDelete}>
                                    DELETE PRODUCT
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default UpdateProduct;
