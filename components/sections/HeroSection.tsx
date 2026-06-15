"use client";

import { FC } from "react";
import Heading from "../elements/text/Heading";
import BodyText from "../elements/text/BodyText";
import BoxedContainer from "../containers/BoxedContainer";
import DynamicButton from "../elements/button/DynamicButton";
import { AngledSlider } from "@/components/lightswind/angled-slider";
import {
  useIsLaptopOrLarger,
  useIsMobile,
  useIsTablet,
} from "@/utils/hooks/useWindowsDimensions";
import { useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const heroText =
  "Your pets are family, and their journey deserves the highest level of care. Based in the Philippines and serving clients worldwide, Joyful Pet Transport specializes in safe, stress-free domestic and international pet relocation, carefully managing every step of the travel process with compassion, expertise, and clear communication. From documentation and airline coordination to dedicated travel day support, we provide complete peace of mind from departure to arrival.";

const sliderSizes = {
  mobile: {
    containerHeight: "300px",
    cardWidth: "280px",
    gap: "8px",
  },
  tablet: {
    containerHeight: "400px",
    cardWidth: "280px",
    gap: "10px",
  },
  laptop: {
    containerHeight: "450px",
    cardWidth: "320px",
    gap: "10px",
  },
  desktop: {
    containerHeight: "500px",
    cardWidth: "360px",
    gap: "12px",
  },
};

const SliderSkeleton = ({
  height,
  isMobile,
}: {
  height: string;
  isMobile?: boolean;
}) => (
  <div className="w-full flex gap-3 items-center" style={{ height }}>
    {Array.from({ length: isMobile ? 1 : 3 }).map((_, i) => (
      <div
        key={i}
        className="shrink-0 rounded-xl animate-pulse bg-black/10"
        style={{
          width: isMobile ? "100%" : "300px",
          height: "90%",
          opacity: i === 1 ? 1 : 0.5,
        }}
      />
    ))}
  </div>
);

const HeroSection: FC = () => {
  const mobile = useIsMobile();
  const tablet = useIsTablet();
  const laptop = useIsLaptopOrLarger();
  const router = useRouter();

  const heroSlides = useQuery(api.heroSlides.getAll);

  const sliderItems = (heroSlides ?? [])
  .filter((slide) => slide.imageUrl !== null)
  .map((slide) => ({
    id: slide._id,
    url: slide.imageUrl as string,
    alt: slide.petName,
    // title: `${slide.petName} — ${slide.route}`,
  }));

  const isLoading = heroSlides === undefined;

  if (mobile) {
    return (
      <BoxedContainer>
        <div className="flex justify-center items-center w-full overflow-hidden">
          <div className="flex flex-col gap-6 w-full">
            <Heading font="fredoka" className="text-center uppercase">
              Transporting Pets Has Never Been This Easy
            </Heading>
            <BodyText className="text-center">{heroText}</BodyText>
            <div className="flex flex-row gap-4 items-center justify-center">
              <DynamicButton
                size="medium"
                onPress={() => router.push("/our-services")}
              >
                BOOK NOW
              </DynamicButton>
              <DynamicButton
                type="outline"
                size="medium"
                onPress={() => router.push("/about-us")}
              >
                LEARN MORE
              </DynamicButton>
            </div>
            <div className="w-full overflow-hidden max-w-[100vw] mt-8">
              {isLoading ? (
                <SliderSkeleton height="300px" isMobile />
              ) : (
                <AngledSlider
                  items={sliderItems}
                  {...sliderSizes.mobile}
                  angle={10}
                  hoverScale={1}
                />
              )}
            </div>
          </div>
        </div>
      </BoxedContainer>
    );
  }

  if (tablet) {
    return (
      <div className="flex flex-col gap-24">
        <div className="relative h-[70vh] flex w-full">
          <BoxedContainer>
            <div className="flex h-full justify-center items-center gap-8">
              <div className="flex flex-col gap-6 w-[60%]">
                <Heading font="fredoka" className="uppercase">
                  Transporting Pets Has Never Been This Easy
                </Heading>
                <BodyText>{heroText}</BodyText>
                <div className="flex flex-row gap-6">
                  <DynamicButton onPress={() => router.push("/our-services")}>
                    BOOK NOW
                  </DynamicButton>
                  <DynamicButton
                    type="outline"
                    onPress={() => router.push("/about-us")}
                  >
                    LEARN MORE
                  </DynamicButton>
                </div>
              </div>
              <div
                className="flex w-[40%] items-center justify-end"
                style={{ overflowX: "hidden", overflowY: "visible" }}
              >
                {isLoading ? (
                  <SliderSkeleton height="400px" />
                ) : (
                  <AngledSlider
                    items={sliderItems}
                    {...sliderSizes.tablet}
                    angle={15}
                  />
                )}
              </div>
            </div>
          </BoxedContainer>
        </div>
      </div>
    );
  }

  if (laptop) {
    return (
      <div className="flex flex-col gap-24">
        <div className="relative h-[70vh] flex w-full">
          <BoxedContainer>
            <div className="flex h-full justify-center items-center gap-8">
              <div className="flex flex-col gap-6 w-[60%]">
                <Heading font="fredoka" className="uppercase">
                  Transporting Pets Has Never Been This Easy
                </Heading>
                <BodyText>{heroText}</BodyText>
                <div className="flex flex-row gap-6">
                  <DynamicButton onPress={() => router.push("/our-services")}>
                    BOOK NOW
                  </DynamicButton>
                  <DynamicButton
                    type="outline"
                    onPress={() => router.push("/about-us")}
                  >
                    LEARN MORE
                  </DynamicButton>
                </div>
              </div>
              <div
                className="flex w-[40%] items-center justify-end"
                style={{ overflowX: "hidden", overflowY: "visible" }}
              >
                {isLoading ? (
                  <SliderSkeleton height="450px" />
                ) : (
                  <AngledSlider
                    items={sliderItems}
                    {...sliderSizes.laptop}
                    angle={15}
                  />
                )}
              </div>
            </div>
          </BoxedContainer>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-24">
      <div className="relative h-[70vh] flex w-full">
        <BoxedContainer>
          <div className="flex h-full justify-center items-center gap-24">
            <div className="flex flex-col gap-6 w-[60%]">
              <Heading font="fredoka" className="uppercase">
                Transporting Pets Has Never Been This Easy
              </Heading>
              <BodyText>{heroText}</BodyText>
              <div className="flex flex-row gap-6">
                <DynamicButton onPress={() => router.push("/our-services")}>
                  BOOK NOW
                </DynamicButton>
                <DynamicButton
                  type="outline"
                  onPress={() => router.push("/about-us")}
                >
                  LEARN MORE
                </DynamicButton>
              </div>
            </div>
            <div
              className="flex w-[40%] items-center justify-end"
              style={{ overflowX: "hidden", overflowY: "visible" }}
            >
              {isLoading ? (
                <SliderSkeleton height="500px" />
              ) : (
                <AngledSlider
                  items={sliderItems}
                  {...sliderSizes.desktop}
                />
              )}
            </div>
          </div>
        </BoxedContainer>
      </div>
    </div>
  );
};

export default HeroSection;