

export type NavItemConfig = {
    label:string ;
    href :string;
}


export const userNav:NavItemConfig[]=[
    {label:"Profile" , href:'/user/profile' },
    {label:'Orders', href:'/user/orders'  },
    {label:"Wishlist" ,href:"/user/wishlist"},
    {label:"Address" , href:"/user/address" },
]

export const sellerNav:NavItemConfig[] = [
  { label: "Dashboard", href: "/seller" },
  { label: "Products", href: "/seller/products" },
  { label: "Orders", href: "/seller/orders" },
  { label: "Add Product", href: "/seller/product-new" },
]

export const adminNav:NavItemConfig[] =[
  { label: "Dashboard", href: "/admin" },
  { label: "Sellers", href: "/admin/sellers" },
  { label: "Products", href: "/admin/products" },
  { label: "Categories", href: "/admin/categories" },
  { label: "Analytics", href: "/admin/analytics" },
]