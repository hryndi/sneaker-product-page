import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { useMediaQuery } from "./useMediaquery";

const ImageCarousel = ({
  desktop,

  gallery,
  setIsModalOpen,
}: {
  desktop?: boolean;
  mobile?: boolean;
  gallery?: boolean;
  setIsModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi | null>(null);
  const isDesktop = useMediaQuery("(min-width:768px)");

  const catalogImgs = [
    "image-product-1.jpg",
    "image-product-1-thumbnail.jpg",
    "image-product-2.jpg",
    "image-product-2-thumbnail.jpg",
    "image-product-3.jpg",
    "image-product-3-thumbnail.jpg",
    "image-product-4.jpg",
    "image-product-4-thumbnail.jpg",
  ];

  useEffect(() => {
    if (!api) return;
    setSelectedIndex(api.selectedScrollSnap());

    const onSelect = () => {
      setSelectedIndex(api.selectedScrollSnap());
    };

    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const handleThumbnailClick = (index: number) => {
    setSelectedIndex(index);
    api?.scrollTo(index);
  };

  return (
    <div
      className={`relative md:max-w-[300px] lg:max-w-[400px] flex flex-col gap-8`}
    >
      <Carousel setApi={setApi} className="relative">
        <CarouselContent>
          {catalogImgs.map((item, index) => (
            <CarouselItem
              key={index}
              onClick={() => setIsModalOpen && setIsModalOpen(true)}
            >
              <div className="">
                <img
                  src={item}
                  className=" w-full object-cover aspect-[4/3] md:max-w-[500px] sm:aspect-[1/1] object-top sm:rounded-xl"
                  alt=""
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {(!desktop || gallery) && (
          <div className="">
            <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-50 bg-white p-2 rounded-full shadow-md" />
            <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-50 bg-white p-2 rounded-full shadow-md" />
          </div>
        )}
      </Carousel>
      {(desktop || gallery) && isDesktop && (
        <Carousel className="w-full relative">
          <CarouselContent className="">
            {catalogImgs.map((src, index) => (
              <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/4">
                <div onClick={() => handleThumbnailClick(index)}>
                  <div
                    className={`${
                      selectedIndex === index &&
                      "opacity-50 border border-orange-500 sm:rounded-xl"
                    }`}
                  >
                    <img
                      src={src}
                      className=" w-[100px] sm:rounded-xl"
                      alt=""
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious
            className={`${
              gallery &&
              "absolute left-2 top-1/2 -translate-y-1/2 z-50 bg-white p-2 rounded-full shadow-md"
            }`}
          />
          <CarouselNext
            className={`${
              gallery &&
              "absolute right-2 top-1/2 -translate-y-1/2 z-50 bg-white p-2 rounded-full shadow-md"
            }`}
          />
        </Carousel>
      )}
    </div>
  );
};
export default ImageCarousel;
