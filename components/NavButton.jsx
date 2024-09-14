import React from 'react'
import '../app/globals.css'
import Link from 'next/link'

const NavButton = ({ name, link }) => {
    return (
            <div className="nav-button h">
                <Link href={link} className="button-link">
                    <span className="name">{name}</span>
                    <span className="alt-name">{name}</span>
                </Link>
            </div>
    )
}

export default NavButton