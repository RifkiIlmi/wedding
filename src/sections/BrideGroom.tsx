"use client";

import { motion } from "framer-motion";
// import { Instagram } from "lucide-react";
import Image from "next/image";

const PersonCard = ({ name, parents, role, image, ig, relation }: any) => (
  <motion.div
    whileInView={{ opacity: 1, y: 0 }}
    initial={{ opacity: 0, y: 50 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
    className="flex flex-col items-center text-center group"
  >
    <div className="relative w-64 h-80 mb-8 overflow-hidden rounded-t-full border-4 border-gold/20 p-2">
      <div className="relative w-full h-full overflow-hidden rounded-t-full">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>
    </div>

    <span className="font-sans text-xs uppercase tracking-[0.3em] text-gold mb-3">
      {role}
    </span>
    <h3 className="font-serif text-4xl mb-4 text-dark">{name}</h3>

    <div className="space-y-1 mb-6">
      <p className="font-sans text-sm text-dark/60 italic leading-relaxed">
        {relation}
      </p>
      <p className="font-serif text-lg text-dark">
        Mr. {parents.father} & Mrs. {parents.mother}
      </p>
    </div>

    <a
      href={`https://instagram.com/${ig}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 text-dark hover:text-gold transition-colors text-sm font-sans tracking-widest"
    >
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077" />
      </svg>
      @{ig}
    </a>
  </motion.div>
);

export const BrideGroom = () => {
  return (
    <section className="py-24 md:py-32 bg-primary overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2
            whileInView={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1 }}
            className="font-serif text-5xl md:text-6xl text-dark mb-6"
          >
            The Happy Couple
          </motion.h2>
          <div className="w-24 h-px bg-gold mx-auto mb-8" />
          <p className="max-w-2xl mx-auto font-sans text-dark/60 leading-relaxed tracking-wide">
            Assalamu’alaikum Warahmatullahi Wabarakatuh. With the grace of Allah
            SWT, we are pleased to invite you to the wedding of:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-12 md:gap-8 items-start max-w-5xl mx-auto">
          <PersonCard
            name="Sarah J. Bride"
            role="The Bride"
            relation="The beloved daughter of"
            parents={{ father: "John Doe", mother: "Jane Doe" }}
            image="https://images.unsplash.com/photo-1549333341-a1288c387f65?auto=format&fit=crop&q=80"
            ig="sarah_bride"
          />

          <div className="flex justify-center md:pt-40">
            <span className="font-serif text-6xl text-gold/30">&amp;</span>
          </div>

          <PersonCard
            name="Michael K. Groom"
            role="The Groom"
            relation="The beloved son of"
            parents={{ father: "Robert Smith", mother: "Mary Smith" }}
            image="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80"
            ig="michael_groom"
          />
        </div>
      </div>
    </section>
  );
};
