import { FC, useState } from "react";
import GrayCardContainer from "../containers/GrayCardContainer";
import DynamicButton from "../elements/button/DynamicButton";
import { useIsMobile } from "@/utils/hooks/useWindowsDimensions";
import FormInput from "../elements/input/TextInput/FormInput";
import { useForm } from "react-hook-form";
import ContactUsFormSchema from "../schemas/contact-us-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import z from "zod";
import BodyText from "../elements/text/BodyText";
import Loader from "../elements/loader/Loader";

type ContactUsFormValues = z.infer<typeof ContactUsFormSchema>;

const ContactUsCard: FC = () => {
  const mobile = useIsMobile();
  const [loading, setLoading] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>("");

  const createContactUsForm = useForm({
    resolver: zodResolver(ContactUsFormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      message: "",
    },
  });

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = createContactUsForm;
  const newContactUs = useMutation(api.mutations.contact_us.createContactUs);

  const onValidSubmit = async (data: ContactUsFormValues) => {
    if (loading) return;

    setLoading(true);
    setSubmitError("");
    setSubmitSuccess(false);

    try {
      await newContactUs({
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        message: data.message,
      });

      reset();
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      setSubmitError("Failed to send message. Please try again.");
      console.error("Form submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = handleSubmit(onValidSubmit);

  if (loading) {
    return (
      <GrayCardContainer className="bg-neutral-100!">
        <div className="flex flex-col gap-8 items-center">
          <div className="text-center">
            <Loader />
          </div>
        </div>
      </GrayCardContainer>
    );
  }

  return (
    <GrayCardContainer className="bg-neutral-100!">
      <div className="flex flex-col gap-8 items-center">
        {submitSuccess && (
          <div className="w-full p-4 bg-blue-100 border border-blue-400 text-blue-700 rounded-lg">
            Thank you for your message! We'll get back to you soon.
          </div>
        )}

        {submitError && (
          <div className="w-full p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {submitError}
          </div>
        )}

        <form onSubmit={onSubmit} className="w-full">
          <div className="flex flex-col gap-8 items-center">
            <div
              className={`grid ${mobile ? "grid-cols-1" : "grid-cols-2"} gap-4 w-full`}
            >
              <FormInput
                control={control}
                name="first_name"
                label="First Name"
                placeholder="First name"
              />
              <FormInput
                control={control}
                name="last_name"
                label="Last Name"
                placeholder="Last name"
              />
            </div>
            <FormInput
              control={control}
              name="email"
              className="w-full"
              keyboardType="email"
              widthFull
              label="Email Address"
              placeholder="E-mail address"
            />
            <FormInput
              control={control}
              className="w-full"
              name="message"
              keyboardType="paragraph"
              widthFull
              label="Message"
              placeholder="Your message..."
            />
            <DynamicButton
              htmlType="submit"
              size="medium"
              type="orange"
              className="w-full"
              disabled={loading}
            >
              {loading ? "SENDING..." : "SEND MESSAGE"}
            </DynamicButton>
          </div>
        </form>
      </div>
    </GrayCardContainer>
  );
};

export default ContactUsCard;
