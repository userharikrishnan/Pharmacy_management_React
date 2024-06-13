import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import checkAuth from "../auth/checkAuth";
import { useSelector } from "react-redux";

function ViewMedicines() {
    const { postId } = useParams();
    const [post, setPost] = useState({ name: '', company: '', expiry_date: '' });
    const user = useSelector(state => state.auth.user);

    useEffect(() => {
        if (!user || !user.token) {
            console.error('User or token is undefined');
            return;
        }

        axios.get(`https://medicalstore.mashupstack.com/api/medicine/${postId}`, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        }).then(response => {
            setPost(response.data);
        }).catch(error => {
            console.error('Error fetching medicine:', error);
           
        });
    }, [postId, user.token]);

    return (
        <div className="card">
            
                <div className="card-header"><h3>{post.name}</h3></div>
                <div className="card-body">{post.company}</div>
                <div className="card-body">{post.expiry_date}</div>
                       
        </div>
    );
}

export default checkAuth(ViewMedicines);
