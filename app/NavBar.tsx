'use client'

import {Skeleton} from '@/app/components'
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes';
import classname from 'classnames';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaBug } from "react-icons/fa";

const NavBar = () => {

    return (
        <nav className='p-5 border-b font-semibold'>
            <Container>
                <Flex justify='between' >
                    <NavLinks />
                    <AuthLinks />
                </Flex>
            </Container>
        </nav>
    )
}

const AuthLinks = () => {
    const { status, data: session } = useSession();
    if (status === 'loading') return <Skeleton width='3rem' />;
    if (status === 'unauthenticated') return <Link href='/api/auth/signin' className='nav-link' >Log in</Link>;

    return (
        <Box>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    <Avatar src={session!.user?.image!} fallback='?' size='3' radius='full' className='cursor-pointer' referrerPolicy='no-referrer' />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    <DropdownMenu.Label>
                        <Text size='3' >
                            {session!.user?.email}
                        </Text>
                    </DropdownMenu.Label>
                    <DropdownMenu.Item>
                        <Link href='/api/auth/signout'>Log out</Link>
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        </Box >
    )
}

const NavLinks = () => {
    const links = [
        { label: "Dashboard", href: "/" },
        { label: "Issues", href: "/issues/list" },
    ];

    const pathName = usePathname();
    return (
        <Flex align='center' gap='5' ><Link href='/' ><FaBug /></Link>
            <ul className='space-x-5 flex'>
                {links.map(link => <li key={link.href} > <Link href={link.href} className={classname(
                    {
                        '!text-zinc-900': pathName === link.href,
                        'nav-link': true
                    }
                )} >{link.label}</Link></li>)}
            </ul>
        </Flex>
    )
}

export default NavBar