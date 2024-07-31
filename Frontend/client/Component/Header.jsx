import { Link, NavLink } from "react-router-dom"
import { PiShoppingBagOpenFill } from "react-icons/pi";
import { useAuth } from "../src/Context/auth";
import { toast } from "react-toastify";
import SearchInput from "./Form/SearchInput";
import useCategory from "../src/hooks/useCategory";
import { useCart } from "../src/Context/cartContext";
import { Badge } from "antd";

const Header = () => {
  const [cart,setCart] = useCart();
  const categories = useCategory();
  const [auth, setAuth] = useAuth();
  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" })
    localStorage.removeItem("auth")
    toast.success("Logout successfully")
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <NavLink to="/" className="navbar-brand" >
            <PiShoppingBagOpenFill fontSize="1.5em"/>
            Kinbech
          </NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <SearchInput/>
              <li className="nav-item">
                <NavLink to="/" className="nav-link "  >Home</NavLink>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                >
                  Categories
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={"/categories"}>
                      All Categories
                    </Link>
                  </li>
                  {categories?.map((c) => (
                    <>
                    <li>
                      <Link
                        className="dropdown-item"
                        to={`/category/${c.slug}`}
                      >
                        {c.name}
                      </Link>
                      </li>
                      </>
                  ))}
                </ul>
              </li>
              {!auth.user ? (
  <>
    <li className="nav-item">
      <NavLink to="/register" className="nav-link">Register</NavLink>
    </li>
    <li className="nav-item">
      <NavLink to="/login" className="nav-link">Login</NavLink>
    </li>
  </>
) : (
  <li className="nav-item dropdown">
    <a className="nav-link dropdown-toggle"  role="button" data-bs-toggle="dropdown">
      {auth?.user?.name}
    </a>
    <ul className="dropdown-menu">
      <li><NavLink className="dropdown-item" to={`/dashboard/${auth?.user?.role===1?"admin":"user"}`}>Dashboard</NavLink></li>
      <li><NavLink onClick={handleLogout} to="/login" className="dropdown-item">Logout</NavLink></li>
    </ul>
  </li>
)}

              <li className="nav-item">
                <Badge count={cart?.length} showZero>
                <NavLink to="/cart" className="nav-link">Cart</NavLink>
                </Badge>
               
              </li>
       
             
            </ul>
      
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header