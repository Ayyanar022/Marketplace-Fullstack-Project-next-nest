import PublicLayout from "@/layouts/PublicLayout";
import { ReactElement } from "react";





function ProductsPage(){




    return(
        <div className="max-w-6xl mx-auto">
            <h1 className="text-2xl font-semibold mb-6">Products</h1>
           
           
        </div>
    )
}


ProductsPage.getLayout = function getLayout(page:ReactElement){
    return <PublicLayout>{page}</PublicLayout>
}


export default ProductsPage;