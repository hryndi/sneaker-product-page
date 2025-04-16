interface CartObject {
  productId: number;
  price: number;
  picture: string;
  amount: number;
}

const ProductContent = ({
  amount,
  setAmount,
  setCartObject,
  cartObject,
}: {
  amount: number;
  setAmount: React.Dispatch<React.SetStateAction<number>>;
  setCartObject: React.Dispatch<React.SetStateAction<CartObject[] | null>>;
  cartObject: CartObject[] | null;
}) => {
  const addToCartHandler = (id: number, amount: number) => {
    if (amount < 1) return;
    const existingCart = cartObject ?? [];

    const existingItemIndex = existingCart.findIndex(
      (item) => item.productId === id
    );
    if (existingItemIndex !== -1) {
      // Update existing item
      const updatedCart = [...existingCart];
      updatedCart[existingItemIndex].amount += amount;

      setCartObject(updatedCart);
    } else {
      // Add new item
      setCartObject([
        ...existingCart,
        {
          productId: id,
          price: 125.0,
          picture: "image-product-1.jpg",
          amount,
        },
      ]);
    }

    // cartObject?.find((item) =>
    //   item.productId === id
    //     ? { ...item, amount: amount }
    //     : setCartObject([
    //         {
    //           productId: id,
    //           price: 125.0,
    //           picture: "image-product-1.jpg",
    //           amount: amount,
    //         },
    //       ])
    // );
  };
  return (
    <>
      <div className="p-6 max-w-[500px]">
        <h3 className="uppercase text-sm font-semibold text-gray-500 tracking-widest">
          Sneaker Company
        </h3>
        <h1 className="font-bold text-3xl leading-8 pt-3 pb-6 ">
          Fall Limited Edition Sneakers
        </h1>
        <p className="text- font-base text-gray-500">
          These low-profile sneakerßare your perfect casual wear companion.
          Featuring a durable rubber outer sole, they'll withstand everything
          the wether can offer.
        </p>
        <div className="py-5 flex justify-between  sm:flex-col ">
          <div className="flex gap-4 items-center">
            <span className="text-3xl font-bold">$125.00</span>
            <span className="px-2 text-white bg-black rounded-sm">50%</span>
          </div>
          <span className="line-through font-medium text-gray-700">
            $250.00
          </span>
        </div>
        <div className=" flex max-md:flex-col gap-4 ">
          <div className="flex bg-gray-200 p-3 rounded-lg">
            <button
              className="cursor-pointer"
              onClick={() => setAmount((prev) => (prev > 0 ? prev - 1 : 0))}
            >
              <img src="icon-minus.svg" alt="minus-button" />
            </button>
            <input
              className="flex text-center w-full font-semibold focus:outline-0"
              type="number"
              disabled
              value={amount}
            />
            <button
              className="cursor-pointer"
              onClick={() => setAmount((prev) => prev + 1)}
            >
              <img src="icon-plus.svg" alt="plus-button" />
            </button>
          </div>
          <button
            onClick={() => addToCartHandler(1, amount)}
            className=" flex bg-orange-500 w-full justify-center max-md:shadow-xl shadow-orange-500/30  py-3 rounded-lg hover:opacity-60 "
          >
            <span className="flex gap-3 font-semibold justify-center items-center">
              <img src="icon-cart.svg" alt="add to cart" /> Add to cart
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductContent;
