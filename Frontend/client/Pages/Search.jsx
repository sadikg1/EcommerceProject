import React from "react";


import Layout from "../Component/Layout";
import { useSearch } from "../src/Context/SearchAuth";
const Search = () => {
    const [values, setValues] = useSearch();
    const API_BASE_URL = import.meta.env.VITE_APP_URL;
    return (
        <Layout title={"Search results"}>
            <div className="container">
                <div className="text-center">
                    <h1>Search Resuts</h1>
                    <h6>
                        {values?.result.length < 1
                            ? "No Products Found"
                            : `Found ${values?.result.length}`}
                    </h6>
                    <div className="d-flex flex-wrap mt-4">
                        {values?.result.map((p) => (
                            <>
                                <div className="card m-2" style={{ width: "18rem" }}>
                                    <img
                                        src={`${API_BASE_URL}/api/v1/product/product-photo/${p._id}`}
                                        className="card-img-top"
                                        alt={p.name}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{p.name}</h5>
                                        <p className="card-text">
                                            {p.description.substring(0, 30)}...
                                        </p>
                                        <p className="card-text"> $ {p.price}</p>
                                        <button className="btn btn-primary ms-1">More Details</button>
                                        <button className="btn btn-secondary ms-1">ADD TO CART</button>
                                    </div>
                                </div>
                            </>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Search;