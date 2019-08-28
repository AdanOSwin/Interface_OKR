import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

class NavBar extends Component{
    render(){
        return(
            <nav>                
                <ul className="navLinks">
                    <NavLink style={{textDecoration: 'none'}} exact={true} activeClassName='isActive' to='/' ><li>Inicio/logo</li></NavLink>
                    <NavLink style={{textDecoration: 'none'}} to="/directorio"><li>Directorio OKR</li></NavLink>
                    <NavLink style={{textDecoration: 'none'}} to="/okr" ><li>OKR</li></NavLink>
                    <NavLink style={{textDecoration: 'none'}} to="/equipos"><li>Equipos</li></NavLink>
                    <NavLink style={{textDecoration: 'none'}} to="/areas"><li>Areas</li></NavLink>
                    <NavLink style={{textDecoration: 'none'}} to="/reportes"><li>Reportes</li></NavLink>
                    <NavLink style={{textDecoration: 'none'}} to="/usuarios"><li>Usuarios</li></NavLink>
                </ul>
            </nav>
        );
    }
}


export default NavBar;