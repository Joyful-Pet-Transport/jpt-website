"use client";

import BoxedContainer from "@/components/containers/BoxedContainer";
import PageWrapperContainer from "@/components/containers/PageWrapperContainer";
import BodyText from "@/components/elements/text/BodyText";
import Heading from "@/components/elements/text/Heading";
import MoreQuestions from "@/components/sections/MoreQuestions";
import React from "react";
import Image from "next/image";

const FrequentlyAskedQuestionsScreen = () => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "1. What is pet transport?",
      answer:
        "Pet transport is the process of safely moving pets from one location to  another—whether locally or internationally. This includes coordinating  flights, arranging transport to and from veterinary clinics, and ensuring  your pet travels comfortably and securely.",
    },
    {
      question: "2. Why do I need a pet transport service?",
      answer:
        "Relocating a pet involves a lot of coordination, communication, and  timing. Airlines, veterinarians, and authorities have their own  procedures—so having a dedicated team helps make everything  easier, safer, and stress-free for both you and your pet.",
    },
    {
      question: "3. How can you help with my pet's relocation?",
      answer:
        "We take care of the full coordination process on your behalf. This includes:\n• Arranging your pet's travel\n• Bringing your pet to the vet when needed\n• Providing guidance at every step\n\nOur goal is to ensure your pet arrives safely and comfortably, without you needing to manage all the logistics yourself.",
    },
    {
      question:
        "4. Can you assist with pets flying alone or with a travel companion?",
      answer:
        "Yes. Whether your pet is flying with you in-cabin, as accompanied  baggage, or traveling alone, we guide you through the process and  handle all necessary coordination.",
    },
    {
      question: "5. How secure is my data?",
      answer:
        "We use industry-standard encryption and security protocols to ensure your data is safe and protected at all times.",
    },
    {
      question: "6. How does the 2% donation work?",
      answer:
        "We pledge to donate 2% of our annual revenue to environmental causes and non-profit organizations.",
    },
    {
      question: "7. Can I integrate this platform with other tools?",
      answer:
        "Yes, we offer seamless integration with popular tools like Slack, Trello, and Google Workspace.",
    },
    {
      question: "8. What makes your platform different?",
      answer:
        "Our platform is built with a focus on user experience, speed, and reliability, ensuring you get the best results with minimal effort.",
    },
  ];

  return (
    <PageWrapperContainer>
      <BoxedContainer medium>
        <div className="flex flex-col justify-center items-center">
          <Heading className="text-center">Frequently Asked Questions</Heading>
          <BodyText className="text-center pt-4">
            Find answers to common questions about our pet transportation
            services.
          </BodyText>
          <div className="grid grid-cols-1 gap-x-8 gap-y-4 mt-12">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`rounded-lg cursor-pointer transition-all duration-300 overflow-hidden ${openIndex === index ? "row-span-2" : ""}`}
              >
                <div
                  onClick={() => toggleFAQ(index)}
                  className="bg-[#0D436D] p-3.5 hover:bg-[#0D436D]/90 transition-colors flex items-center justify-between"
                >
                  <span className="text-sm font-medium text-white">
                    {faq.question}
                  </span>
                  <div
                    className={`text-white p-1 rounded transition-colors ${openIndex === index ? "bg-white/20" : "hover:bg-white/10"}`}
                  >
                    {openIndex === index ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-minus"
                      >
                        <path d="M5 12h14" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-plus"
                      >
                        <path d="M5 12h14" />
                        <path d="M12 5v14" />
                      </svg>
                    )}
                  </div>
                </div>
                <div
                  className={`grid transition-all duration-300 ease-in-out bg-white ${openIndex === index ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <div className="overflow-hidden">
                    <div className="p-3.5 pt-4">
                      <div className="text-sm text-neutral-600 leading-relaxed whitespace-pre-line">
                        {faq.answer}
                      </div>
                    </div>

                    {/* <div className="flex flex-row-reverse">
                      <Image
                        src={"/images/element/ourteam.png"}
                        alt="Our Team"
                        width={50}
                        height={50}
                      />
                    </div> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <MoreQuestions />
      </BoxedContainer>
    </PageWrapperContainer>
  );
};

export default FrequentlyAskedQuestionsScreen;
