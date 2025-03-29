import { useState,useEffect } from "react";
import { Link } from 'react-router-dom';
function Home()
{
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [loggedIn,setLoggedIn] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("token")) {
          setLoggedIn(true);
        }
    }, []);

    const handlelogin = async (event) => {
      event.preventDefault(); 
        try {
          console.log(email);
          console.log(password);
          const response = await fetch("https://reqres.in/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });
          console.log(response.status);
          const data = await response.json();
          if (data.token) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("loggedUser", JSON.stringify({ email }));
    
            setLoggedIn(true);
          } else {
            alert("Login failed! Use email: eve.holt@reqres.in & password: cityslicka");
          }
        } catch (error) {
          console.error("Error logging in:", error);
        }
    };
  
    const handleSignOut = () => {
      localStorage.removeItem("token"); 
      localStorage.removeItem("loggedUser"); 
      setLoggedIn(false); 
    };

    return(
        <div className="container col-xl-10 col-xxl-8 px-4 py-5">
            <nav className="navbar bg-body-tertiary">
            <div className="container-fluid">
            <a className="navbar-brand"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"  fill="currentColor" className="bi bi-people-fill me-3" viewBox="0 0 16 16">
            <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
            </svg>Employ Wise</a>
            { loggedIn && <button className="btn btn-outline-secondary"  onClick={handleSignOut}>SignOut</button>}
            { loggedIn && <Link to="/userlist"><button class="btn btn-outline-primary" type="submit">User List</button></Link> }
            </div>
            </nav>
            <div className="row align-items-center g-lg-5 py-5">
            <div className="col-lg-7 text-center text-lg-start">
            <h1 className="display-4 fw-bold lh-1 text-body-emphasis mb-3">Welcome to EmployWise</h1>
            <p className="col-lg-10 fs-4">EmployWise is a user management platform that allows employees to edit, update, and delete their information seamlessly. Designed for efficiency, our platform ensures smooth user interactions with a clean and intuitive interface.</p>
            </div>
            <div className="col-md-10 mx-auto col-lg-5">
           <form className="p-4 p-md-5 border rounded-3 bg-body-tertiary">
          <div className="form-floating mb-3">
            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" value={email}
                    onChange={(e)=>setEmail(e.target.value)}  
                    required />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating mb-3">
            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" value={password}
                    onChange={(e)=>setPassword(e.target.value)}  
                    required />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me" /> Remember me
            </label>
          </div>
          <button className="w-100 btn btn-lg btn-primary" onClick={(e) => handlelogin(e)}>Sign up</button>
          <hr className="my-4" />
          <small className="text-body-secondary">By clicking Sign up, you agree to the terms of use.</small>
        </form>
      </div>
    </div>
  </div>
    )
}

export default Home;