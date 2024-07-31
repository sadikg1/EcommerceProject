import React from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../src/Context/SearchAuth";
const SearchInput = () => {
  const [values, setValues] = useSearch();
    const navigate = useNavigate();
    const API_BASE_URL = import.meta.env.VITE_APP_URL

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${API_BASE_URL}/api/v1/product/product-search/${values.keyWord}`
      );
      setValues({ ...values, result: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyWord: e.target.value })}
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchInput;