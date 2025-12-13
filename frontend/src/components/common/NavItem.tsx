import Link from "next/link";
import { useRouter } from "next/router"
import React from "react";


interface NavItemProps{
    href :string ,
    label:string
}


const NavItem : React.FC<NavItemProps> = ({href,label})=>{
    const router = useRouter();
    const isActive = router.pathname ===href;

    return(
        <Link href={href} 
        className={`text-sm cursor-pointer transition-colors 
            ${
                isActive
                ?"text-primary font-semibold"
                :"text-textSecondary hover:text-primary"
            }
        `}>
            {label}

        </Link>
    )
}


export default NavItem;