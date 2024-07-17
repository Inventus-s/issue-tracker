'use client'

import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes';
import classname from 'classnames';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaBug } from "react-icons/fa";

const NavBar = () => {
    const links = [
        { label: "Dashboard", href: "/" },
        { label: "Issues", href: "/issues/list" },
    ];

    const pathName = usePathname();

    const { status, data: session } = useSession();
    // console.log(session?.user?.image);

    return (
        <nav className='p-5 border-b font-semibold'>
            <Container>
                <Flex justify='between' >
                    <Flex align='center' gap='5' ><Link href='/' ><FaBug /></Link>
                        <ul className='space-x-5 flex'>
                            {links.map(link => <li key={link.href} > <Link href={link.href} className={classname(
                                {
                                    'text-zinc-900': pathName === link.href,
                                    'text-zinc-500': pathName !== link.href,
                                    'hover:text-zinc-800 transition-colors': true
                                }
                            )} >{link.label}</Link></li>)}
                        </ul></Flex>
                    <Box>
                        {status === 'authenticated' && (
                            <DropdownMenu.Root>
                                <DropdownMenu.Trigger>
                                    <Avatar src={session.user?.image!} fallback='?' size='3' radius='full' className='cursor-pointer' />
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Content>
                                    <DropdownMenu.Label>
                                        <Text size='3' >
                                            {session.user?.email}
                                        </Text>
                                    </DropdownMenu.Label>
                                    <DropdownMenu.Item>
                                        <Link href='/api/auth/signout'>Log out</Link>
                                    </DropdownMenu.Item>
                                </DropdownMenu.Content>
                            </DropdownMenu.Root>
                        )}
                        {status === 'unauthenticated' && <Link href='/api/auth/signin'>Log in</Link>}
                    </Box>
                </Flex>
            </Container>
        </nav>
    )
}

export default NavBar