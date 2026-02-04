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
    }

    const faqs = [
        {
            question: "What is included in the Starter plan?",
            answer: "The Starter plan includes access to all basic features, 5GB of storage, and email support. It's perfect for individuals and small projects."
        },
        {
            question: "Do you offer a free trial?",
            answer: "Yes, we offer a 14-day free trial for all our plans. No credit card is required to start."
        },
        {
            question: "Can I switch plans later?",
            answer: "Absolutely! You can upgrade or downgrade your plan at any time from your account settings."
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept all major credit cards (Visa, MasterCard, American Express) and PayPal."
        },
        {
            question: "How secure is my data?",
            answer: "We use industry-standard encryption and security protocols to ensure your data is safe and protected at all times."
        },
        {
            question: "How does the 2% donation work?",
            answer: "We pledge to donate 2% of our annual revenue to environmental causes and non-profit organizations."
        },
        {
            question: "Can I integrate this platform with other tools?",
            answer: "Yes, we offer seamless integration with popular tools like Slack, Trello, and Google Workspace."
        },
        {
            question: "What makes your platform different?",
            answer: "Our platform is built with a focus on user experience, speed, and reliability, ensuring you get the best results with minimal effort."
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
          <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mt-12'>
                        {faqs.map((faq, index) => (
                            <div key={index} onClick={() => toggleFAQ(index)} className={`bg-slate-50 p-3.5 rounded-lg cursor-pointer transition-all duration-300 border border-slate-200 hover:bg-slate-100 ${openIndex === index ? 'row-span-2' : ''}`}>
                                <div className='flex items-center justify-between'>
                                    <span className='text-sm font-medium text-neutral-800'>{faq.question}</span>
                                    <div className={`text-slate-400 p-1 rounded transition-colors ${openIndex === index ? 'bg-slate-200 text-slate-500' : 'hover:bg-slate-300 hover:text-slate-500'}`}>
                                        {openIndex === index ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-minus"><path d="M5 12h14"/></svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                                        )}
                                    </div>
                                </div>
                                <div className={`grid transition-all duration-300 ease-in-out ${openIndex === index ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}>
                                    <div className='overflow-hidden'>
                                        <hr className="pb-2" />
                                        <p className='text-sm text-neutral-600 leading-relaxed'>
                                            {faq.answer}
                                        </p>

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
