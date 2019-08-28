import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

class UserNav extends Component{
    render(){
        return(
            <div>
                <nav className="userNav">
                    <ul className="navLinks">
                        <NavLink style={{textDecoration: 'none'}} exact={true}><li>Usuario</li></NavLink>
                        <li>Fecha/hora</li>
                        <NavLink style={{textDecoration: 'none'}}> <li>Menu User</li></NavLink>
                    </ul>
                </nav>
            </div>
        );
    }
}


export default UserNav;