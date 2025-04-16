import ImageCarousel from "./Carousel";

const ModalGallerie = ({
  onClose,
}: {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent click from bubbling to backdrop
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 z-[1001]"
      onClick={() => onClose(false)}
    >
      <div
        className="fixed top-1/2 left-1/2 z-[1002] -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-md"
        onClick={handleModalClick}
      >
        {/* Modal content here */}
        <ImageCarousel gallery />
      </div>
    </div>
  );
};

export default ModalGallerie;
