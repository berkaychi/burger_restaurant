import Carousel from "@/components/Carousel";
import BurgerSlider from "@/components/BurgerSlider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Search from "@/components/Search";
export default function Home() {
  return (
    <div>
      <Carousel />
      <BurgerSlider />
    </div>
  );
}
