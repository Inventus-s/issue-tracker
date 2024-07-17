'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { FaBug } from "react-icons/fa";
import classname from 'classnames';
import { useSession } from 'next-auth/react';
import { Box } from '@radix-ui/themes';

const NavBar = () => {
    const links = [
        { label: "Dashboard", href: "/" },
        { label: "Issues", href: "/issues/list" },
    ];

    const pathName = usePathname();

    const {status, data: session} = useSession();
    // console.log(pathName);
    
    return (
        <nav className='flex p-5 space-x-5 items-center border-b font-semibold'>
            <div><FaBug/></div>
            <ul className='space-x-5 flex'>
                {links.map(link => <li  key={link.href} > <Link href={link.href} className={classname(
                    {
                        'text-zinc-900': pathName === link.href,
                        'text-zinc-500': pathName!== link.href,
                        'hover:text-zinc-800 transition-colors': true
                    }
                )} >{link.label}</Link></li>)}
            </ul>
            <Box>
                { status === 'authenticated' && <Link href='/api/auth/signout'>Log out</Link>}
                { status === 'unauthenticated' && <Link href='/api/auth/signin'>Log in</Link>}
            </Box>
        </nav>
    )
}

export default NavBar