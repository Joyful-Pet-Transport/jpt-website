import Image from "next/image";
import { FC, use } from "react";
import BodyText from "../elements/text/BodyText";
import Skeleton from "../elements/loader/Skeleton";
import { useIsMobile } from "@/utils/hooks/useWindowsDimensions";
import { useRouter } from "next/navigation";

type ServiceCardContainerProps = {
  title?: string;
  description?: string;
  image?: string; // URL or file path
  slug?: string;
  loading?: boolean;
};

const ServiceCardContainer: FC<ServiceCardContainerProps> = (props) => {
  const router = useRouter();
  const mobile = useIsMobile();
  const { loading = false } = props;

  if (mobile) {
    return (
      <button
        className="flex flex-col relative"
        onClick={() =>
          !loading && props.slug && router.push("/our-services/" + props.slug)
        }
        disabled={loading}
      >
        <div className="absolute inset-0 mt-20 h-70 bg-[#BBE2FC] rounded-4xl" />
        <div className="flex flex-col w-full items-center gap-4 p-8 relative z-10">
          <div className="rounded-full overflow-hidden border-4 border-[#F37E48] aspect-square w-32 h-32 flex items-center justify-center">
            {loading ? (
              <Skeleton width="100%" height="100%" borderRadius="50%" />
            ) : (
              props.image && (
                <Image
                  src={props.image}
                  alt={props.title || ""}
                  height={128}
                  width={128}
                  className="w-full h-full object-cover"
                />
              )
            )}
          </div>
          {loading ? (
            <>
              <Skeleton width="70%" height="1.5rem" />
              <Skeleton width="100%" height="1rem" />
              <Skeleton width="100%" height="1rem" />
            </>
          ) : (
            <>
              <BodyText
                className="uppercase text-center"
                weight="semibold"
                size="medium"
                font="fredoka"
              >
                {props.title}
              </BodyText>
              <BodyText className="text-center w-70">
                {props.description}
              </BodyText>
            </>
          )}
        </div>
      </button>
    );
  }
  return (
    <button
      className="flex flex-1 relative"
      onClick={() =>
        !loading && props.slug && router.push("/our-services/" + props.slug)
      }
      disabled={loading}
    >
      <div className="absolute bottom-0 left-0 right-0 h-80 bg-[#BBE2FC] rounded-[40px]" />
      <div className="flex flex-col w-full h-full items-center gap-4 p-8 relative z-10">
        <div className="rounded-full overflow-hidden border-8 border-[#F37E48] aspect-square w-40 h-40 flex items-center justify-center">
          {loading ? (
            <Skeleton width="100%" height="100%" borderRadius="50%" />
          ) : (
            props.image && (
              <Image
                src={props.image}
                alt={props.title || ""}
                height={160}
                width={160}
                className="w-full h-full object-cover"
              />
            )
          )}
        </div>
        {loading ? (
          <>
            <Skeleton width="70%" height="1.75rem" />
            <Skeleton width="100%" height="1rem" />
            <Skeleton width="100%" height="1rem" />
          </>
        ) : (
          <>
            <BodyText
              className="uppercase text-center"
              weight="semibold"
              size="medium"
              font="fredoka"
            >
              {props.title}
            </BodyText>
            <BodyText className="text-center">{props.description}</BodyText>
          </>
        )}
      </div>
    </button>
  );
};

export default ServiceCardContainer;
