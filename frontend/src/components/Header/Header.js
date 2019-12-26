import React,{useState} from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../Assets/images/logo.png";
import Backdrop from "../Backdrop/Backdrop";
import NavigationItems from "../../components/Navigation/NavigationItems";
import "./Header.css";

const Header = props => {
  const [open, setOpen ] = useState(false)
  const[searchValue, setSearchValue] = useState("");
  const openMenu = () => {
    setOpen(true)
  }
  const closeMenu = () => {
    setOpen(false);
  };
  return (
    <div className="col">
      <div className="header-top">
        <img className="img-logo " src={Logo} alt="" />
        <div className="form-inline search-tube-form">
            <div className="form-group mb-2">
                <input type="text" onChange={(event)=>setSearchValue(event.target.value)} className="form-control input-search " id="search_video" placeholder="search"/>
            </div>
             {/*<button onClick={searchHandler}  className="btn btn-warning mb-2">Search</button>*/}
             <NavLink to={"/videos/search/?v="+searchValue} >
          <span className="btn btn-warning mb-2">
            Search
          </span>
        </NavLink>
        </div>
        <div className="avatar-user">
            <img className="img-avatar-user rounded-circle" onClick={openMenu}  alt="" src="https://ssl.gstatic.com/accounts/ui/avatar_2x.png"/>
        </div>
        <Backdrop backdrop={open} onclosemenu={closeMenu}  >
          <NavigationItems/>
        </Backdrop>
      </div>
      <hr className="my-4"></hr>
    </div>
  );
};

export default Header;
