import Carousel from "@/components/Carousel";
import BurgerSlider from "@/components/product/BurgerSlider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export default function Home() {
  return (
    <div>
      <Carousel />
      <BurgerSlider />
    </div>
  );
}
