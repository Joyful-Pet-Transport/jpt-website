import { FC } from "react";
import BoxedContainer from "../containers/BoxedContainer";
import BodyText from "../elements/text/BodyText";
import Heading from "../elements/text/Heading";
import SocialCards from "../card/SocialCards";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

const ConnectWithUs: FC = () => {
  const postServices = useQuery(api.tables.post_services.get);
  return (
    <BoxedContainer>
      <Heading
        className="text-center"
        weight="semibold"
        size="medium"
        font="fredoka"
      >
        Connect With Us On Our Social Media
      </Heading>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 items-center">
        {postServices?.map(({ name, description, image, link, _id }) => (
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
