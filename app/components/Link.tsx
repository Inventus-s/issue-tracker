import ReactLink from "next/link"
import { Link as RadixLink } from "@radix-ui/themes"

interface Props{
    href: string;
    children: string;
}

const Link = ({href, children}: Props) => {
  return (
    <ReactLink href={`${href}`} passHref legacyBehavior >
        <RadixLink>{children}</RadixLink>
    </ReactLink>
  )
}

export default Link