import { useEffect, useRef, useState } from "react";

interface CartObject {
  productId: number;
  price: number;
  picture: string;
  amount: number;
}

const Navbar = ({
  itemAmount,
  cartObject,
  setCartObject,
}: {
  itemAmount: number;
  cartObject: CartObject[] | null;
  setCartObject: React.Dispatch<React.SetStateAction<CartObject[] | null>>;
}) => {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [isOpenCart, setIsOpenCart] = useState(false);
  const [isCartNotEmpty, setIsCartNotEmpty] = useState<boolean>(false);

  const existingCart = cartObject ?? [];

  useEffect(() => {
    if (existingCart.length > 0) {
      setIsCartNotEmpty(true);
      console.log("there is items in the cart");
    } else {
      setIsCartNotEmpty(false);
      console.log("there is no items in the cart");
    }
  }, [existingCart]);

  const menuRef = useRef<HTMLDivElement>(null);
  const currNavIcon =
    isBurgerOpen === false ? "icon-menu.svg" : "icon-close.svg";
  const translateXNav =
    isBurgerOpen === false
      ? "max-sm:translate-x-[-100%]"
      : "max-sm:translate-x-[0]";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpenCart(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const deleteFromCartHandler = (id: number) => {
    const existingCart = cartObject ?? [];
    if (existingCart.length < 0) return;
    setCartObject(existingCart.filter((item) => item.productId !== id));
  };
  return (
    <>
      {isBurgerOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsBurgerOpen(false)} // Optional: click outside to close
        ></div>
      )}
      <nav
        ref={menuRef}
        className="  border-b border-gray-300  flex items-center p-5  gap-10 flex-nowrap xl:mx-32  max-[330px]:p-1.5 justify-between h-min "
      >
        <div className=" flex items-center gap-3.5 ">
          <button
            onClick={() => setIsBurgerOpen(!isBurgerOpen)}
            className="z-1001"
          >
            <img
              src={currNavIcon}
              className="min-w-5 md:hidden"
              alt="menu-icon"
            />
          </button>
          <img src="logo.svg" alt="logo" />

          <ul
            className={`z-[1000] ${translateXNav} navbar gap-6 max-sm:p-8   sm:w-full  transition  transform  bg-white flex  max-sm:inset-y-0 max-sm:left-0 w-[70%] max-sm:flex-col max-sm:pt-[15vh] max-sm:pl-8  max-sm:fixed md:pl-14 md:text-gray-500 `}
          >
            <li>Collections</li>
            <li>Men</li>
            <li>Women</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>

        <div className="flex relative items-center gap-5">
          <div>
            <div className="relative">
              <img
                src="icon-cart.svg"
                alt="cart-button"
                className="cursor-pointer "
                onClick={() => {
                  setIsOpenCart((prev) => !prev);
                }}
              />
            </div>
            {isCartNotEmpty && (
              <div className="w-5 h-4 absolute -top-[10%] right-[60%] rounded-full bg-orange-600/80 flex justify-center items-center">
                <span className="text-xs font-semibold text-white">
                  {existingCart[0]?.amount || 0}
                </span>
              </div>
            )}
          </div>
          <img src="image-avatar.png" className="w-8" alt="profile picture" />

          {isOpenCart && (
            <div
              className="absolute top-full mt-4 w-[22rem] sm:w-96 bg-white border border-gray-200 rounded-md shadow-lg z-50 p-4
                  right-0 sm:-left-[160%] sm:translate-x-[-50%]"
            >
              <h2 className="font-semibold">Cart</h2>
              <div className="h-[1px] my-3 bg-gray-300 block" />

              {cartObject && cartObject.length > 0 ? (
                cartObject.map((item) => (
                  <div
                    key={item.productId}
                    className="flex items-center gap-5 mb-4"
                  >
                    <img
                      src={item.picture}
                      className="w-10 rounded-md"
                      alt="product"
                    />
                    <div className="flex-1">
                      <p className="text-sm">Fall Limited Edition Sneakers</p>
                      <p className="text-sm text-gray-500">
                        ${item.price} × {item.amount}{" "}
                        <span className="font-bold text-black">
                          ${item.price * item.amount}
                        </span>
                      </p>
                    </div>
                    <img
                      onClick={() => deleteFromCartHandler(item.productId)}
                      src="icon-delete.svg"
                      className="cursor-pointer"
                      alt="delete"
                    />
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center">
                  No items were added to the cart.
                </p>
              )}
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
