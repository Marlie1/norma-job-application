import React from 'react'
import {Link} from 'react-router-dom'

function Nav() {
    const navStyle = {
        textDecoration : 'none',
    };
    return (
        <nav>
            <div className="d-flex pt-4 pb-4 bg-info">
                <div className="container d-flex justify-content-between align-items-center">
                    <Link  to="/"><h3 className="m-0 text-dark" style={navStyle}>LOGO</h3></Link>
                </div>
            </div>
        </nav>
    )
}

export default Nav
