import { FC } from "react";
import BoxedContainer from "../containers/BoxedContainer";
import BodyText from "../elements/text/BodyText";
import Heading from "../elements/text/Heading";
import SocialCards from "../card/SocialCards";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

const ConnectWithUs: FC = () => {
  const postServices = useQuery(api.tables.post_services.get);

  const isLoading = postServices === undefined;

  return (
    <BoxedContainer className="pb-12">
      <Heading className="text-center uppercase" font="fredoka">
        Connect With Us On Our Social Media
      </Heading>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 items-center">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div className="flex items-center justify-center" key={i}>
                <SocialCards loading />
              </div>
            ))
          : postServices?.map(({ name, description, image, link, _id }) => (
              <div className="flex items-center justify-center" key={_id}>
                <SocialCards
                  title={name}
                  description={description}
                  image={image}
                  link={link}
                />
              </div>
            ))}
      </div>
    </BoxedContainer>
  );
};

export default ConnectWithUs;
