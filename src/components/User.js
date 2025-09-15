import React from "react";

function User(){
    return(
        <div className='User'>
           <div className="logo">
              <img src={"https://toppng.com/uploads/preview/dashboard-monitoring-and-control-icon-11553411429ao5tqasrsj.png"} alt="logo" />
           </div>
          <div className="info">
            <p>Dash Board</p>
            <a href="#">Logout</a>
          </div>
        </div>
    )
}

export default User
