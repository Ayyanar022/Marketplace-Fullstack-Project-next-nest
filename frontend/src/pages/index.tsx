import { getCategories } from "@/api/categoryApi";
import { getProducts } from "@/api/productApi";
import Hero from "@/components/Hero";
import ProductCard from "@/components/products/ProductCard";
import { useEffect, useMemo, useState } from "react";

export default function Home() {

  const [searchQuery ,setSearchQuery] = useState('')
  const [category ,setCategory] = useState([])
  const [activeCat,setActiveCat] = useState('All');
  const [products,setProducts] = useState([])

    const fetchCat = async()=>{
      try {
        const data = await getCategories()
        console.log("cat ",data)
        setCategory(data)
      }catch(e){
        console.log(e)
      }
      }

      const fetchProduct = async()=>{
        try{
          const data:any = await getProducts()
          console.log("product",data)
          setProducts(data)

        }catch(e){
          console.log(e)
        }
      }

  useEffect(()=>{
    fetchCat()
    fetchProduct()
  },[])

  // const filteredProduct = activeCat==='All' ? products : products?.filter((item,i)=> item?.category?.name===activeCat  )
  
  // const filteredProduct = useMemo(() => {
  //   return products?.filter(
  //     (item) => activeCat === "all" || item?.category === activeCat
  //   );
  // }, [products, activeCat]);
 
  const filteredProduct = products?.filter(
  (item) => activeCat === "All" || item?.category?.name === activeCat
    );

    

  return (
    <main className="min-h-screen w-full px-2 md:px-3 lg:px-4 xl:px-5">
      <Hero />

        <section className="w-full mx-auto xl:p-10 xl:pt-20">
          <div className="flex justify-between items-center mb-6 gap-4 flex-wrap">
                <h2 className="text-3xl">Our Products</h2>
                <div className="flex items-center bg-surface border-[1.5px] border-border 
                rounded-full px-4 w-[280px] transition login-input-wrap">
                        <span className="mr-2">🔍</span>
                        <input
                        className="outline-none border-none bg-transparent px-2.5 py-1.5 w-full text-text"
                            type="text"
                            placeholder="Search product..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                      />
                  </div>


          </div>

          <div className="flex gap-2 mb-8 flex-wrap">
            {[{ name: "All" }, ...category].map((cat, i) => (
              <button
                key={cat?.name + i}
                onClick={() => setActiveCat(cat?.name)}
              className={`py-2 px-5 hover:shadow rounded-full border text-sm font-[500] transition
                        ${activeCat === cat?.name
                          ? "bg-primary text-white border-primary"
                          : "bg-surface border-border text-textMuted hover:border-primary hover:text-primary"
                        } hover:border-primary`}
              >
                {cat?.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6">
            {filteredProduct.length>0 ? (
              filteredProduct.map((product,i)=>(
                <ProductCard  product={product}/>
              ))
            ):(
              <div className="col-span-full p-2 md:p-20 text-center text-textMuted ">
                 <span className="block text-3xl mb-3">🔍</span>
                  <p>No products found. Try a different search or category.</p>

              </div>
            )}
          </div>



        </section>
  
  </main>
    );
  }
