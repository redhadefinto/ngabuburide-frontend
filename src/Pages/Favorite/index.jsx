import React, { useEffect, useMemo, useState } from "react";
// import ImgProduct2 from "../../assets/product2.png";
import CheckStock from "../../assets/check-circle-08.svg";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { getFavorite } from "../../utils/https/favorite";
import { useSelector } from "react-redux";

function Favorite() {
  const controller = useMemo(() => new AbortController(), []);
  const stateStore = useSelector((state) => state.user);
  const stateCart = useSelector((state) => state.cart);
  const [favorite, setFavorite] = useState({});
  console.log(stateCart);
  const imgUrl =
    "https://res.cloudinary.com/dhikerrnk/image/upload/v1680940221/";
  const fetching = async () => {
    try {
      const getFav = await getFavorite(stateStore.token, controller);
      console.log(getFav.data.data);
      setFavorite(getFav.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    document.title = "RAZYR - Favorite";
    fetching();
  });
  return (
    <>
      <Header />
      <section className=" flex flex-col pb-[10rem]">
        <section className="relative">
          <div className=" hero-login w-full h-[15.6rem] opacity-20 flex justify-center items-center "></div>
          <div className=" absolute flex justify-center items-center text-center flex-col top-16 w-full ">
            <h1 className=" text-[3.5rem] text-blackSec">Favorite</h1>
            <p className=" text-[1rem] text-blackSec">
              Pay and get your ordered items
            </p>
          </div>
        </section>
        <section className=" mt-20 flex flex-col mx-[5%] md-[4%] lg:mx-[10%]">
          <section className=" flex flex-col w-full mt-[6.3rem] gap-10">
            <section className="flex h-[4.4rem] w-full border-y border-greyBord">
              <div className=" w-[45%] flex text-xs md:text-lg  items-center font-medium">
                <p>Products</p>
              </div>
              <div className=" w-[20%] flex text-xs md:text-lg items-center justify-center lg:justify-normal font-medium">
                <p>Stock Status</p>
              </div>
              <div className=" w-[35%] flex text-xs md:text-lg justify-center md:justify-normal md:pl-4 lg:pl-0 items-center  font-medium">
                <p>Price</p>
              </div>
            </section>
            <section className=" flex flex-col gap-10">
              {favorite.map((data, i) => (
                <section key={i} className=" flex w-full">
                  <div className=" flex  w-[45%] flex-col ">
                    <div className=" flex gap-[0.5rem] md:gap-10">
                      <div className=" h-20 w-20 md:w-[8.8rem] md:h-[8.8rem]  lg:h-[10.8rem] lg:w-[10.7rem]">
                        <img
                          className=" w-full h-full"
                          src={imgUrl + data.image}
                          alt=""
                        />
                      </div>
                      <div className=" text-xs md:text-sm flex justify-center items-center">
                        <p>{data.prod_name}</p>
                      </div>
                    </div>
                  </div>
                  <div className=" w-[20%] flex justify-center lg:justify-normal">
                    <div className="flex gap-[0.39rem]">
                      <div className="  flex items-center ">
                        <img
                          className=" w-[0.94rem] h-[0.94rem] flex items-center"
                          src={CheckStock}
                          alt=""
                        />
                      </div>
                      <div className=" text-xs flex items-center  font-medium text-[#262626]">
                        {data.stock}
                      </div>
                    </div>
                  </div>
                  <div className=" w-[35%] flex justify-center lg:justify-normal md:pl-4 lg:pl-0 items-center">
                    <div className=" flex flex-col md:flex-row items-center  justify-between w-full">
                      <div className=" font-bold text-xs md:text-lg flex items-center">
                        <p>Rp. {data.price.toLocaleString("id-ID")}</p>
                      </div>
                      <div>
                        <button className="btn bg-blackSec flex w-full lg:w-[7rem] xl:w-[12.5rem] h-[3.75rem] gap-3 border-none justify-center items-center hover:bg-red-500">
                          <p className="text-white font-bold">Add To Cart</p>
                        </button>
                      </div>
                    </div>
                  </div>
                </section>
              ))}
            </section>
          </section>
        </section>
      </section>
      <Footer />
    </>
  );
}

export default Favorite;
