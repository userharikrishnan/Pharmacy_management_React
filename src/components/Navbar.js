import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { removeUser } from "../store/authSlice";

function Navbar() {
    var user = useSelector(store=>store.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    function logout(){
        if(user){
            axios.post('https://medicalstore.mashupstack.com/api/logout',{},{
               headers:{'Authorization':"Bearer "+ user.token}
            });
            dispatch(removeUser());
            navigate('/login');
        }
    }
  return <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="navbar-brand">
            <h5>DRUG FACTORY</h5>
        </div>
        <button className="navbar-toggler" type="button" data-toggle="collapse"
data-target="#navbarNav" aria-controls="navbarNav"aria-expanded="false"
           aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div
        className="collapse navbar-collapse mr-auto" id="navbarNav"  style={{float:"left" }} >
            <ul className="navbar-nav ml-auto" style={{ color: "#ffffff" }}>
             <li className="nav-item">
               <NavLink to={"/"} className={ 'nav-link '+(status => status.isActive ? 'active' : '')}>
                        Home
                </NavLink>
                </li>

                <li className="nav-item">
               <NavLink to={"/aboutus"} className={ 'nav-link '+(status => status.isActive ? 'active' : '')}>
                        AboutUs
                </NavLink>
                </li>
        
                <li className="nav-item">
               <NavLink to={"/listmedicines"} className={ 'nav-link '+(status => status.isActive ? 'active' : '')}>
                        Store
                </NavLink>
                </li>

                <li className="nav-item">
               <NavLink to={"/register"} className={ 'nav-link '+(status => status.isActive ? 'active' : '')}>
                        SignUp
                </NavLink>
                </li>
                {user?
                <li className="nav-item">
                <NavLink className="nav-link" onClick={logout}>Logout</NavLink>
                 </li>:
                <li className="nav-item">
                <NavLink 
                to={"/login"} 
                className={
                    'nav-link '+
                    (status => status.isActive ? 'active' : '')
                } 
                >
                    Login
                </NavLink>
                </li>
            }
            </ul>
       </div>
    </nav>
}

export default Navbar;