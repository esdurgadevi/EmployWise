import { useEffect, useState } from "react";

function UserList()
{
    const [userlist,setUserlist] = useState([]);
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    const [searchTerm, setSearchTerm] = useState("");
    const [editUser, setEditUser] = useState(null); 
    const [editedData, setEditedData] = useState({ first_name: "", last_name: "", email: "" });

    useEffect(()=>{
        getUserlist();
    },[]);

    const getUserlist = () => {
        fetch("https://reqres.in/api/users?page=1")
        .then((response)=> response.json())
        .then((data)=>{
            setUserlist(data.data);
        })
    };
    const filteredUsers = userlist.filter(user =>
      user.first_name.toLowerCase().startsWith(searchTerm.toLowerCase())
    );

    const handleDelete = async (userId) => {
      try {
        const response = await fetch(`https://reqres.in/api/users/${userId}`, {
          method: "DELETE",
        });
    
        if (response.ok) {
          console.log(`User with ID ${userId} deleted successfully`);
          setUserlist((prevUsers) => prevUsers.filter((user) => user.id !== userId));
        } else {
          console.error("Failed to delete user:", response.status);
        }
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    };
    const handleEdit = (user) => {
      setEditUser(user);
      setEditedData({ first_name: user.first_name, last_name: user.last_name, email: user.email });
    };
    const handleUpdate = async () => {
      try {
          const response = await fetch(`https://reqres.in/api/users/${editUser.id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(editedData),
          });

          if (response.ok) {
              alert("User updated successfully");
              setUserlist((prevUsers) =>
                  prevUsers.map((user) =>
                      user.id === editUser.id ? { ...user, ...editedData } : user
                  )
              );
              setEditUser(null);
          } else {
              alert("Failed to update user");
          }
      } catch (error) {
          console.error("Error updating user:", error);
      }
    };
    return(
        <div className="userlist container">
            <nav className="navbar bg-body-tertiary mt-3">
            <div className="container-fluid">
                <a className="navbar-brand my-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"  fill="currentColor" className="bi bi-people-fill me-3" viewBox="0 0 16 16">
                <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
                </svg>Employ Wise</a>
                <form className="d-flex" role="search">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => setSearchTerm(e.target.value)} />
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
            </nav>            
            {userlist
        .filter(
          (user) =>
            user.first_name.toLowerCase().includes(searchTerm) ||
            user.last_name.toLowerCase().includes(searchTerm) ||
            user.email.toLowerCase().includes(searchTerm)
        )
        .map((user) => (
          <div key={user.id} className="card p-3 mb-3 my-5 shadow-sm container">
            <div className="d-flex align-items-center">
              <img
                src={user.avatar}
                alt={user.first_name}
                className="rounded-circle me-3"
                width="80"
                height="80"
              />
              <div>
                <h5 className="mb-1">
                  {user.first_name} {user.last_name}
                </h5>
                <p className="text-muted">{user.email}</p>
              </div>
              {loggedUser?.email === user.email && (
                <>
                  <button type="button" class="btn btn-outline-warning mx-2" onClick={() => handleEdit(user)}>Edit</button>
                  <button type="button" onClick={() => handleDelete(user.id)} class="btn btn-outline-danger mx-2">Delete</button>
                </>
              )}
            </div>
          </div>
        ))}
        {editUser && (
                <div className="modal d-block">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit User</h5>
                                <button type="button" className="btn-close" onClick={() => setEditUser(null)}></button>
                            </div>
                            <div className="modal-body">
                                <label>First Name:</label>
                                <input className="form-control mb-2" type="text" value={editedData.first_name} onChange={(e) => setEditedData({ ...editedData, first_name: e.target.value })} />

                                <label>Last Name:</label>
                                <input className="form-control mb-2" type="text" value={editedData.last_name} onChange={(e) => setEditedData({ ...editedData, last_name: e.target.value })} />

                                <label>Email:</label>
                                <input className="form-control mb-2" type="email" value={editedData.email} onChange={(e) => setEditedData({ ...editedData, email: e.target.value })} />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={handleUpdate}>Save Changes</button>
                                <button type="button" className="btn btn-secondary" onClick={() => setEditUser(null)}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserList;