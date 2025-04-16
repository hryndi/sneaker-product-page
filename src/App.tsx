import { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import ImageCarousel from "./shared/Carousel";
import ProductContent from "./shared/ProductContent";
import ModalGallerie from "./shared/ModalGallery";
import { useMediaQuery } from "./shared/useMediaquery";

interface CartObject {
  productId: number;
  price: number;
  picture: string;
  amount: number;
}

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemAmount, setItemAmount] = useState(0);
  const [cartObject, setCartObject] = useState<CartObject[] | null>(null);
  const isDesktop = useMediaQuery("(min-width:768px)");
  useEffect(() => {
    console.log(cartObject);
  });

  return (
    <>
      <div className="font-KumbhSans relative min-h-screen  ">
        <Navbar setCartObject={setCartObject} cartObject={cartObject} />
        <div className="grid md:grid-cols-[1fr_1fr] max-md:justify-center md:p-20 md:px-5 md:gap-24 items-center">
          <div className="justify-self-end">
            <ImageCarousel desktop setIsModalOpen={setIsModalOpen} />
          </div>
          <div className="justify-self-start">
            <ProductContent
              setCartObject={setCartObject}
              amount={itemAmount}
              setAmount={setItemAmount}
              cartObject={cartObject}
            />
          </div>
        </div>
        {isModalOpen && isDesktop && <ModalGallerie onClose={setIsModalOpen} />}
      </div>
    </>
  );
}

export default App;
