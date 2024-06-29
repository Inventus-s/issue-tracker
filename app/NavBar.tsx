'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { FaBug } from "react-icons/fa";
import classname from 'classnames';

const NavBar = () => {
    const links = [
        { label: "Dashboard", href: "/" },
        { label: "Issues", href: "/issues" },
    ];

    const pathName = usePathname();
    // console.log(pathName);
    
    return (
        <nav className='flex p-5 space-x-5 items-center border-b font-semibold'>
            <div><FaBug/></div>
            <ul className='space-x-5'>
                {links.map(link => <Link key={link.href} href={link.href} className={classname(
                    {
                        'text-zinc-900': pathName === link.href,
                        'text-zinc-500': pathName!== link.href,
                        'hover:text-zinc-800 transition-colors': true
                    }
                )} >{link.label}</Link>)}
            </ul>
        </nav>
    )
}

export default NavBar