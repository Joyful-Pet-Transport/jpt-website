"use client";

import BoxedContainer from "@/components/containers/BoxedContainer";
import PageWrapperContainer from "@/components/containers/PageWrapperContainer";
import BodyText from "@/components/elements/text/BodyText";
import Heading from "@/components/elements/text/Heading";
import React from "react";

const FrequentlyAskedQuestionsScreen = () => {
    const [openIndex, setOpenIndex] = React.useState<number | null>(null)
    const faqsData = [
        {
            question: 'Lightning-Fast Performance',
            answer: 'Built with speed — minimal load times and optimized rendering.'
        },
        {
            question: 'Fully Customizable Components',
            answer: 'Easily adjust styles, structure, and behavior to match your project needs.'
        },
        {
            question: 'Responsive by Default',
            answer: 'Every component are responsive by default — no extra CSS required.'
        },
        {
            question: 'Tailwind CSS Powered',
            answer: 'Built using Tailwind utility classes — no extra CSS or frameworks required.'
        },
        {
            question: 'Dark Mode Support',
            answer: 'All components come ready with light and dark theme support out of the box.'
        }
    ]
  return (
    <PageWrapperContainer>
      <BoxedContainer medium>
      <div className="flex flex-col justify-center items-center">
          <Heading className="text-center">Frequently Asked Questions</Heading>
          <BodyText className="text-center pt-4">
            Find answers to common questions about our pet transportation services.
          </BodyText>
          <div className='max-w-xl w-full mt-6 flex flex-col gap-4 items-start text-left'>
                    {faqsData.map((faq, index) => (
                        <div key={index} className='flex flex-col items-start w-full'>
                            <div className='flex items-center justify-between w-full cursor-pointer bg-slate-50 border border-slate-200 p-4 rounded' onClick={() => setOpenIndex(openIndex === index ? null : (index as unknown as number))}>
                                <BodyText weight="normal" size="small">{faq.question}</BodyText>
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${openIndex === index ? "rotate-180" : ""} transition-all duration-500 ease-in-out`}>
                                    <path d="m4.5 7.2 3.793 3.793a1 1 0 0 0 1.414 0L13.5 7.2" stroke="#1D293D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <BodyText weight="normal" size="small" className={`px-4 transition-all duration-500 ease-in-out ${openIndex === index ? "opacity-100 max-h-[300px] translate-y-0 pt-4" : "opacity-0 max-h-0 -translate-y-2"}`} > {faq.answer}</BodyText>
                        </div>
                    ))}
                </div>
        </div>
        
      </BoxedContainer>
    </PageWrapperContainer>
  );
};

export default FrequentlyAskedQuestionsScreen;
