"use client";

import BoxedContainer from "@/components/containers/BoxedContainer";
import PageWrapperContainer from "@/components/containers/PageWrapperContainer";
import BodyText from "@/components/elements/text/BodyText";
import Heading from "@/components/elements/text/Heading";
import MoreQuestions from "@/components/sections/MoreQuestions";
import React from "react";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import Breadcrumbs from "@/components/elements/breadcrumbs/Breadcrumbs";

const FrequentlyAskedQuestionsScreen = () => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = useQuery(api.tables.frequently_asked_questions.get);

  return (
    <PageWrapperContainer>
      <Breadcrumbs items={[{ label: "Home", path: "/" }, { label: "FAQs" }]} />
      <BoxedContainer medium className="flex justify-center">
        <div className="flex flex-col justify-center items-center gap-6">
          <Heading font="fredoka" className="text-center">
            Frequently Asked Questions
          </Heading>
          <BodyText className="text-center pt-4">
            Find answers to common questions about our pet transportation
            services.
          </BodyText>
          <div className="grid grid-cols-1 gap-x-8 gap-y-4 mt-12">
            {faqs?.map(({ _id, question, answer }, index) => (
              <div
                key={_id ?? index}
                className={`rounded-lg cursor-pointer transition-all duration-300 overflow-hidden ${
                  openIndex === index ? "row-span-2" : ""
                }`}
              >
                <div
                  onClick={() => toggleFAQ(index)}
                  className="bg-[#0D436D] p-6 hover:bg-[#0D436D]/90 transition-colors flex items-center justify-between"
                >
                  <BodyText white>{question}</BodyText>
                  <div
                    className={`text-white p-1 rounded transition-colors ${
                      openIndex === index ? "bg-white/20" : "hover:bg-white/10"
                    }`}
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
                  className={`grid transition-all duration-300 ease-in-out bg-[#EAEAEA] ${
                    openIndex === index
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="p-6">
                      <div className="leading-relaxed whitespace-pre-line">
                        <BodyText>{answer}</BodyText>
                      </div>
                    </div>
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
