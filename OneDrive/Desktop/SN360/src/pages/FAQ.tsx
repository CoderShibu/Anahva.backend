import React, { useState } from 'react';
import Header from '@/components/Header';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle, Phone, Shield, Clock, Users, AlertTriangle } from 'lucide-react';

const FAQ = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const faqData = [
    {
      category: "General",
      icon: <HelpCircle className="h-5 w-5" />,
      questions: [
        {
          question: "What is SafeNet360?",
          answer: "SafeNet360 is a comprehensive emergency monitoring platform designed to track transportation incidents in real-time, facilitate community reporting, and coordinate emergency response efforts across air, rail, and road transportation systems."
        },
        {
          question: "How does the platform work?",
          answer: "Our platform combines real-time monitoring systems, community reporting tools, and AI-powered incident classification to detect, report, and respond to transportation emergencies quickly and effectively."
        },
        {
          question: "Is SafeNet360 free to use?",
          answer: "Yes, the basic emergency reporting features are completely free for all users. Advanced dashboard features are available for emergency responders and authorized personnel."
        }
      ]
    },
    {
      category: "Emergency Reporting",
      icon: <AlertTriangle className="h-5 w-5" />,
      questions: [
        {
          question: "When should I use SafeNet360 vs calling emergency numbers?",
          answer: "Call 100 (Police), 101 (Fire), or 102 (Ambulance) immediately for life-threatening emergencies. Use SafeNet360 to report transportation incidents that need monitoring and coordination, or when you want to provide additional details and evidence to support ongoing emergency responses."
        },
        {
          question: "What information should I include in my report?",
          answer: "Include the incident type, specific location, detailed description, severity level, and your contact information if you're willing to be reached for follow-up. Photos, videos, or voice recordings can also be very helpful."
        },
        {
          question: "Can I report incidents anonymously?",
          answer: "Yes, you can submit reports without providing contact information, though providing your details helps emergency responders follow up if needed."
        },
        {
          question: "How quickly are reports processed?",
          answer: "High-severity reports are processed immediately and trigger automatic alerts to relevant emergency services. Medium and low-severity reports are typically reviewed within 5-15 minutes."
        }
      ]
    },
    {
      category: "Safety & Security",
      icon: <Shield className="h-5 w-5" />,
      questions: [
        {
          question: "Is my personal information secure?",
          answer: "Absolutely. We use enterprise-grade encryption and follow strict data protection protocols. Personal information is only shared with authorized emergency personnel when necessary for response coordination."
        },
        {
          question: "Who has access to the reports I submit?",
          answer: "Only authorized emergency responders, relevant transportation authorities, and verified safety personnel have access to incident reports. We maintain strict access controls and audit trails."
        },
        {
          question: "What happens to my uploaded photos/videos?",
          answer: "Media files are securely stored and used solely for emergency response purposes. They are automatically deleted after the incident is resolved unless required for official investigations."
        }
      ]
    },
    {
      category: "Response Times",
      icon: <Clock className="h-5 w-5" />,
      questions: [
        {
          question: "How fast is the typical response time?",
          answer: "Our platform achieves an average response time of 3.2 minutes for high-priority incidents. Response times vary based on incident severity, location, and resource availability."
        },
        {
          question: "What happens after I submit a report?",
          answer: "Your report is immediately processed by our AI system, classified by severity, and routed to appropriate emergency services. You'll receive a confirmation with a reference number for tracking."
        },
        {
          question: "Can I track the status of my report?",
          answer: "Yes, you can check the status of your report using the reference number provided after submission. Updates are provided as the incident progresses through resolution."
        }
      ]
    },
    {
      category: "Access & Permissions",
      icon: <Users className="h-5 w-5" />,
      questions: [
        {
          question: "How do I get access to the admin dashboard?",
          answer: "Admin dashboard access is restricted to authorized emergency personnel, transportation officials, and verified safety coordinators. Contact your organization's SafeNet360 administrator for access."
        },
        {
          question: "What are the different user roles?",
          answer: "We have Public Users (reporting), Volunteers (limited dashboard access), Coordinators (incident management), and Administrators (full system access). Each role has specific permissions appropriate to their responsibilities."
        },
        {
          question: "Can I volunteer to help with emergency response?",
          answer: "Yes! We welcome qualified volunteers. You'll need to complete our training program and background verification process. Contact us through the feedback form to learn more about volunteer opportunities."
        }
      ]
    },
    {
      category: "Technical Support",
      icon: <Phone className="h-5 w-5" />,
      questions: [
        {
          question: "What if the platform is down during an emergency?",
          answer: "Always call 100 (Police), 101 (Fire), or 102 (Ambulance) for immediate emergencies. We maintain 98.5% uptime with redundant systems, but emergency services should always be your first contact for life-threatening situations."
        },
        {
          question: "Which devices and browsers are supported?",
          answer: "SafeNet360 works on all modern smartphones, tablets, and computers. We support Chrome, Firefox, Safari, and Edge browsers. The platform is optimized for mobile use during emergency situations."
        },
        {
          question: "How do I report a technical issue?",
          answer: "Use the feedback form on our website, or contact our technical support team. For urgent technical issues affecting emergency response, we have a 24/7 support hotline available to authorized users."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Find answers to common questions about SafeNet360 emergency monitoring platform
          </p>
        </div>

        {/* FAQ Sections */}
        <div className="space-y-8">
          {faqData.map((category, categoryIndex) => (
            <div key={categoryIndex} className="emergency-card p-6">
              <div className="flex items-center mb-6">
                <div className="gradient-info text-white rounded-full p-2 mr-3">
                  {category.icon}
                </div>
                <h2 className="text-2xl font-bold">{category.category}</h2>
              </div>
              
              <Accordion type="single" collapsible className="space-y-2">
                {category.questions.map((faq, faqIndex) => (
                  <AccordionItem 
                    key={faqIndex} 
                    value={`${categoryIndex}-${faqIndex}`}
                    className="border rounded-lg px-4"
                  >
                    <AccordionTrigger className="text-left hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 dark:text-gray-400 pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-12 emergency-card p-8 text-center">
          <h3 className="text-xl font-bold mb-4">Still Have Questions?</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Our support team is here to help. Reach out through any of these channels:
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <Phone className="h-8 w-8 mx-auto mb-2 text-blue-500" />
              <h4 className="font-semibold">24/7 Support</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">(555) SAFE-NET</p>
            </div>
            <div>
              <HelpCircle className="h-8 w-8 mx-auto mb-2 text-green-500" />
              <h4 className="font-semibold">Online Help</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">support@safenet360.org</p>
            </div>
            <div>
              <Users className="h-8 w-8 mx-auto mb-2 text-purple-500" />
              <h4 className="font-semibold">Community</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Join our safety community</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FAQ;
