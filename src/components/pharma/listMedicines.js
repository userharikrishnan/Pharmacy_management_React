import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import MedicineDetails from "./medicineDetails";
import { useSelector } from "react-redux"; 
import checkAuth from "../auth/checkAuth";

function ListMedicines() {
  const [allPosts, setAllPosts] = useState([]); 
  const [filteredPosts, setFilteredPosts] = useState([]); 
  const [SearchTerm, setSearchTerm] = useState("");
  const user = useSelector(state => state.auth.user); 

  const handleSearchInputChange = (event) => {
    event.preventDefault();
    setSearchTerm(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (SearchTerm.trim() === "") {
      setFilteredPosts(allPosts);
    } else {
      var filteredItems = allPosts.filter((item) =>
        item.name.toLowerCase().includes(SearchTerm.toLowerCase())
      );
      setFilteredPosts(filteredItems);
    }
  };

  function fetchPosts() {
    if (!user || !user.token) {
      console.error('User or token is undefined');
      return;
    }

    axios.get('https://medicalstore.mashupstack.com/api/medicine', {
      headers: {'Authorization': "Bearer " + user.token}
    })
    .then((response) => {
      setAllPosts(response.data);
      setFilteredPosts(response.data);
    })
    .catch(error => {
      console.error('Error fetching posts:', error);
    
    });
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <Navbar />
      <br />
      <br />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8">
            <form>
              <label><b>Search Medicine:</b> &nbsp;</label>
              <input type="text" value={SearchTerm} onChange={handleSearchInputChange}/>
               &nbsp;
              <button className="btn btn-small btn-success py-0 mb-1" type="button" onClick={handleSearch}>
                Search
              </button>
              &nbsp;
            </form>
          </div>
        </div>
      
        <div className="row">
          <div className="col-12">
            <h1 className="text-center my-4">Store</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <Link to="/create" className="btn btn-info mb-2">
              Add Medicine
            </Link>
            {filteredPosts.length === 0 ? (
              <p>No matching posts found.</p>
            ) : (
       <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Company</th>
            <th>Expiry Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPosts.map((post) => (
            <tr key={post.id}>
              <td>{post.name}</td>
              <td>{post.company}</td>
              <td>{post.expiry_date}</td>
              <td>
                <MedicineDetails post={post} refresh={fetchPosts} />
              </td>
            </tr>
          ))}
        </tbody>
       </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default checkAuth(ListMedicines);
