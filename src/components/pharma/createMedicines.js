import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"; // Importing useSelector hook
import Navbar from "../Navbar";
import checkAuth from "../auth/checkAuth";

function CreateMedicines() {
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [expiry_date, setExpiry_date] = useState('');
    
    const user = useSelector(state => state.auth.user); // Retrieving user state from Redux

    var navigate = useNavigate()
    function addPost() {
        if (!user || !user.token) {
            console.error('User or token is undefined');
            return;
        }

        axios.post('https://medicalstore.mashupstack.com/api/medicine', {
            name: name,
            company: company,
            expiry_date: expiry_date
        }, {
            headers: {'Authorization': "Bearer " + user.token}
        }).then(response => {
            navigate('/listmedicines')
        }).catch(error => {
            console.error('Error adding medicine:', error);
            
        });
    }

    return (
        <div>
            <Navbar />
            <div className="container">
                <div className="row">
                    <div className="col-8 offset-2">
                        <h1 className="text-center">Add medicine</h1>
                        <div className="form-group">
                            <label>Name:</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={name} 
                                onChange={(event)=>{setName(event.target.value)}}
                            />
                        </div>
                        <div className="form-group">
                            <label>Company:</label>
                            <textarea 
                                className="form-control" 
                                value={company} 
                                onChange={(event)=>{setCompany(event.target.value)}}
                            />
                        </div>
                        <div className="form-group">
                            <label>Expiry_date:</label>
                            <input type="date"
                                className="form-control" 
                                value={expiry_date} 
                                onChange={(event)=>{setExpiry_date(event.target.value)}}
                            />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary float-right" onClick={addPost}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default checkAuth(CreateMedicines);
