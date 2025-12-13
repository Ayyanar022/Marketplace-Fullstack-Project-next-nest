import { NavItemConfig } from "@/config/NavItemConfig";
import NavItem from "./NavItem";


interface SidebarProps {
    title:string;
    items:NavItemConfig[];
}


const Sidebar:React.FC<SidebarProps> = ({title,items})=>{
    return(
        <aside className="w-64 bg-cardBg border-r border-accent/10 p-4">
            <h2 className="text-lg font-semibold mb-4 text-primary">
                {title}
            </h2>

            <nav className="flex flex-col gap-3">
                {items.map((item)=>(
                    <NavItem  
                        key={item.href}
                        href={item.href}
                        label={item.label}
                        />
                ))}
            </nav>
        </aside>
    )
}


export default Sidebar;