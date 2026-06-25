import React, { useState, useRef, useEffect } from 'react';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "👋 Welcome to Next Del! I'm your AI assistant. Ask me about our services, pricing, or anything else!",
      isUser: false,
      time: 'Just now'
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatBodyRef = useRef(null);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const getBotResponse = (input) => {
    const q = input.toLowerCase().trim();
    if (q.includes('what is next del') || q.includes('about next del') || q.includes('who is next del') || q.includes('what is nex del')) {
      return "Next Del is a software development company providing modern digital solutions for businesses. We specialize in websites, mobile apps, Shopify and WordPress development.";
    }
    if (q.includes('service') || q.includes('offer') || q.includes('do you provide') || q.includes('what do you')) {
      return "We provide five main services: <br/>• <strong>Ecommerce Development</strong> – online stores with payment integration<br/>• <strong>Custom Website Development</strong> – business websites and web apps<br/>• <strong>Mobile App Development</strong> – Android & iOS apps<br/>• <strong>Shopify Development</strong> – store setup and customization<br/>• <strong>WordPress Development</strong> – custom themes and plugins";
    }
    if (q.includes('contact') || q.includes('email') || q.includes('reach')) {
      return "You can contact us at <strong>nextdelofficial@gmail.com</strong> or use the contact form on this page. We'll get back to you within 24 hours.";
    }
    if (q.includes('website') || q.includes('need a website') || q.includes('build a website')) {
      return "Great! We build modern, responsive websites tailored to your business. Please share your requirements via our contact form, and our team will reach out with a custom proposal.";
    }
    if (q.includes('price') || q.includes('cost') || q.includes('how much') || q.includes('budget')) {
      return "Pricing depends on project complexity and requirements. For a custom quote, please share your project details through our contact form or email us at nextdelofficial@gmail.com.";
    }
    if (q.includes('ecommerce') || q.includes('shop')) {
      return "Our Ecommerce Development includes: online store creation, payment gateway integration (Stripe, PayPal), product management, custom shopping solutions, and admin dashboards.";
    }
    if (q.includes('shopify')) {
      return "Shopify Development: We set up Shopify stores, create custom themes, customize existing themes, and add advanced functionality to help you sell better.";
    }
    if (q.includes('wordpress')) {
      return "WordPress Development: We build business websites, custom themes, and plugin customization. We also provide performance optimization and maintenance.";
    }
    if (q.includes('hello') || q.includes('hi') || q.includes('hey')) {
      return "Hello! 👋 How can I assist you today? Feel free to ask about our services, pricing, or anything else.";
    }
    if (q.includes('thanks') || q.includes('thank')) {
      return "You're welcome! Let me know if you need any more information. 😊";
    }
    return "I'd be happy to help with that! For more specific details, please reach out to our team at nextdelofficial@gmail.com or use the contact form. Is there anything else I can assist with?";
  };

  const handleSend = (textToSend) => {
    const text = textToSend || inputVal.trim();
    if (!text) return;

    // Add user message
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = {
      id: Date.now(),
      text,
      isUser: true,
      time: timestamp
    };
    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputVal('');

    // Trigger bot typing response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const reply = getBotResponse(text);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: reply,
        isUser: false,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 800 + Math.random() * 600);
  };

  const quickActions = [
    { question: "What services do you offer?", label: "💼 Services" },
    { question: "How much does a website cost?", label: "💰 Pricing" },
    { question: "How can I contact Next Del?", label: "📞 Contact" },
    { question: "Do you build ecommerce stores?", label: "🛒 Ecommerce" },
  ];

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-[95px] right-[24px] z-[999] w-[50px] h-[50px] rounded-full bg-brand-green hover:bg-brand-green-dark text-white shadow-xl flex items-center justify-center text-xl transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="Toggle Chat"
      >
        <i className={`fas ${isOpen ? 'fa-times' : 'fa-robot'}`}></i>
      </button>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/03092356286"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-[35px] right-[24px] z-[999] w-[50px] h-[50px] rounded-full bg-[#25d366] hover:bg-[#20ba5a] text-white shadow-xl flex items-center justify-center text-2xl transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="Contact on WhatsApp"
      >
        <i className="fab fa-whatsapp"></i>
      </a>

      {/* Chat Window */}
      <div
        className={`fixed bottom-[160px] right-[24px] z-[998] w-[350px] max-w-[calc(100vw-48px)] h-[480px] rounded-3xl bg-bg-card border border-white/5 shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ${
          isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-[20px] pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-bg-section to-bg-card px-6 py-4 flex items-center justify-between text-white border-b border-white/5">
          <div>
            <h3 className="font-bold text-sm flex items-center gap-2 m-0">
              <i className="fas fa-robot text-brand-green-light"></i> Next Del Assistant
            </h3>
            <span className="text-[10px] text-white/60 block mt-0.5">Powered by AI</span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white/65 hover:text-white transition-colors"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Messages Body */}
        <div
          ref={chatBodyRef}
          className="flex-grow p-4 overflow-y-auto space-y-3 bg-bg-primary/20"
        >
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex flex-col max-w-[80%] ${msg.isUser ? 'ml-auto items-end' : 'mr-auto items-start'}`}
            >
              <div
                className={`px-4 py-2.5 rounded-2xl text-xs ${
                  msg.isUser
                    ? 'bg-gradient-to-r from-brand-green to-brand-green-secondary text-white rounded-br-none'
                    : 'bg-bg-card-hover text-text-primary rounded-bl-none'
                }`}
                dangerouslySetInnerHTML={{ __html: msg.text }}
              />
              <span className="text-[9px] text-text-light mt-1 px-1">
                {msg.time}
              </span>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-center gap-1 bg-bg-card-hover px-4 py-3 rounded-2xl rounded-bl-none max-w-[80%] mr-auto">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2 overflow-x-auto px-4 py-2 bg-bg-secondary/40 border-t border-white/5 scrollbar-thin">
          {quickActions.map((act, i) => (
            <button
              key={i}
              onClick={() => handleSend(act.question)}
              className="text-[10px] font-semibold whitespace-nowrap bg-bg-card text-brand-green-light border border-brand-green-light/20 px-3 py-1.5 rounded-full hover:bg-brand-green/10 transition-colors"
            >
              {act.label}
            </button>
          ))}
        </div>

        {/* Input area */}
        <div className="p-3 bg-bg-card border-t border-white/5 flex items-center gap-2">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-grow text-xs px-4 py-2.5 rounded-full border border-white/10 bg-bg-primary text-text-primary focus:outline-none focus:border-brand-green"
          />
          <button
            onClick={() => handleSend()}
            className="w-8 h-8 rounded-full bg-brand-green text-white hover:bg-brand-green-dark flex items-center justify-center text-xs transition-transform active:scale-90"
          >
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </>
  );
}
