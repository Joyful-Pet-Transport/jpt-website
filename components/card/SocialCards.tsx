import { FC, PropsWithChildren } from "react";
import { BsArrowUpRightCircle } from "react-icons/bs";
import Image from "next/image";
import Heading from "../elements/text/Heading";
import BodyText from "../elements/text/BodyText";

type SocialCardsProps = PropsWithChildren<{
  title: string;
  description: string;
  image?: string;
  link: string;
}>;

const SocialCards: FC<SocialCardsProps> = ({
  title,
  description,
  image,
  link,
}) => {
  return (
    <div className="relative w-[330px] h-[400px]">
      <div
        style={{
          clipPath:
            "path('M30 0 L230 0 A30 30 0 0 1 260 30 L260 50 A30 30 0 0 0 280 70 L300 70 A30 30 0 0 1 330 100 L330 370 A30 30 0 0 1 310 400 L30 400 A30 30 0 0 1 0 370 L0 30 A30 30 0 0 1 30 0 Z')",
          WebkitClipPath:
            "path('M30 0 L230 0 A30 30 0 0 1 260 30 L260 50 A30 30 0 0 0 280 70 L300 70 A30 30 0 0 1 330 100 L330 370 A30 30 0 0 1 310 400 L30 400 A30 30 0 0 1 0 370 L0 30 A30 30 0 0 1 30 0 Z')",
        }}
        className="w-full h-full p-8 bg-[#EAEAEA] flex flex-col gap-2 justify-end"
      >
        {image && <Image src={image} alt={title} fill />}
        {image && (
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />
        )}
        <div className="flex flex-col gap-2 z-10 relative">
          <Heading size="normal" weight="thin" className="text-white">
            {title}
          </Heading>
          <BodyText
            weight="normal"
            size="small"
            className="text-white line-clamp-2"
          >
            {description}
          </BodyText>
        </div>
      </div>
      <a className="absolute top-2 right-2 rounded-full" href={link}>
        <BsArrowUpRightCircle className="h-12 w-12 text-white" />
      </a>
    </div>
  );
};

export default SocialCards;
