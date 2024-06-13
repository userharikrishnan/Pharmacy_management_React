import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"; // Importing useSelector hook

function MedicineDetails(props) {
    const user = useSelector(state => state.auth.user); // Retrieving user state from Redux

    function deletePost() {
        if (!user || !user.token) {
            console.error('User or token is undefined');
            return;
        }

        axios.delete(`https://medicalstore.mashupstack.com/api/medicine/${props.post.id}`, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        }).then(response => {
            alert(response.data.message);
            props.refresh();
        }).catch(error => {
            console.error('Error deleting medicine:', error);
            
        });
    }

    return (
        <div className="float-left">
                <button className="btn btn-primary mr-2" onClick={deletePost}>Delete</button>
                <Link to={`/listmedicines/${props.post.id}/edit`} className="btn btn-primary">Edit</Link>
                <Link to={`/listmedicines/${props.post.id}/`} className="btn btn-primary">view</Link>
        </div>
    );
}

export default MedicineDetails;
