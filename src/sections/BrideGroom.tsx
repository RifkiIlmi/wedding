"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FloatingParticles } from "@/components/shared/FloatingParticles";

const FloralAccent = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle cx="20" cy="20" r="18" fill="rgba(212,175,55,0.14)" />
    <path
      d="M20 4C24 10 22 18 16 22C10 26 2 24 0 18C-2 12 4 6 10 4C16 2 20 4 20 4Z"
      fill="rgba(255,255,255,0.8)"
    />
    <path
      d="M33 22C40 24 48 22 52 16C56 10 54 2 48 0C42 -2 34 4 33 11C32 18 33 22 33 22Z"
      fill="rgba(212,175,55,0.22)"
    />
    <ellipse cx="70" cy="70" rx="18" ry="12" fill="rgba(212,175,55,0.08)" />
    <path
      d="M72 52C68 56 66 62 70 66C74 70 80 68 84 64C88 60 90 54 86 50C82 46 76 48 72 52Z"
      fill="rgba(255,255,255,0.65)"
    />
    <path
      d="M84 80C78 84 72 86 66 82C60 78 58 70 62 64C66 58 74 56 80 58C86 60 88 72 84 80Z"
      fill="rgba(212,175,55,0.22)"
    />
  </svg>
);

const GlitterSparkle = ({ className }: { className?: string }) => (
  <div
    className={`absolute rounded-full bg-gold/80 shadow-[0_0_18px_rgba(212,175,55,0.45)] ${className}`}
  />
);

const SparkleGlint = ({ className }: { className?: string }) => (
  <div
    className={`absolute rounded-full bg-white/80 shadow-[0_0_18px_rgba(255,255,255,0.35)] ${className}`}
  />
);

interface PersonCardProps {
  name: string;
  nameClassName?: string;
  parents: {
    father: string;
    mother: string;
  };
  role: string;
  image: string;
  ig: string;
  relation: string;
}

const PersonCard = ({
  name,
  nameClassName = "text-4xl",
  parents,
  role,
  image,
  ig,
  relation,
}: PersonCardProps) => (
  <motion.div
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    initial={{ opacity: 0, y: 50, scale: 0.98 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
    whileHover={{ y: -6, transition: { duration: 0.25 } }}
    className="relative flex flex-col items-center text-center group bg-white/90 border border-gold/10 rounded-[40px] shadow-[0_24px_80px_rgba(28,28,28,0.12)] p-8"
  >
    <div className="absolute inset-x-8 -top-6 h-14 bg-linear-to-b from-gold/20 to-transparent rounded-b-full opacity-70 pointer-events-none" />
    <div className="absolute inset-0 pointer-events-none">
      <GlitterSparkle className="-left-4 top-10 h-4 w-4 animate-glitter" />
      <GlitterSparkle className="right-6 top-20 h-3 w-3 animate-glitter delay-150" />
      <GlitterSparkle className="left-1/2 top-16 h-2 w-2 animate-glitter delay-300" />
    </div>
    <div className="relative w-64 h-80 mb-8 overflow-hidden rounded-t-full border-4 border-gold/20 p-2 bg-white/80">
      {/* Gold glow behind photo */}
      <div className="absolute inset-0 rounded-t-full bg-gold/10 blur-xl scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      <div className="relative w-full h-full overflow-hidden rounded-t-full glow-gold">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          unoptimized
        />
        {/* Subtle golden overlay on hover */}
        <div className="absolute inset-0 bg-linear-to-t from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </div>

    <motion.span
      initial={{ opacity: 0, letterSpacing: "0.1em" }}
      whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="font-sans text-xs uppercase tracking-[0.3em] text-gold mb-3"
    >
      {role}
    </motion.span>
    <h3 className={`font-serif mb-4 text-dark ${nameClassName}`}>
      {name}
    </h3>

    <div className="space-y-1 mb-6">
      <p className="font-sans text-sm text-dark/60 italic leading-relaxed">
        {relation}
      </p>
      <p className="font-serif text-lg text-dark">
        Bapak {parents.father} & Ibu {parents.mother}
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
    <section className="py-24 md:py-32 bg-primary overflow-hidden relative border-y border-gold/10">
      <FloralAccent className="absolute top-12 left-10 w-28 h-28 opacity-70 animate-float" />
      <FloralAccent className="absolute bottom-14 right-8 w-24 h-24 opacity-55 animate-float" />
      <div className="absolute inset-x-0 top-0 h-24 bg-linear-to-b from-gold/10 to-transparent pointer-events-none" />

      {/* Subtle particles */}
      <FloatingParticles count={20} speed={0.15} opacity={0.15} maxSize={2} />

      {/* Decorative ornamental divider top */}
      <div className="absolute top-0 left-0 right-0 flex justify-center">
        <div className="w-64 h-px bg-linear-to-r from-transparent via-gold/40 to-transparent" />
      </div>

      {/* Background pattern */}
      <div className="absolute inset-0 pattern-ornament pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.h2
            whileInView={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1 }}
            className="font-serif text-5xl md:text-6xl text-dark mb-6 tracking-[0.04em]"
          >
            Pasangan Pengantin
          </motion.h2>
          <div className="flex items-center justify-center gap-3 mx-auto mb-8">
            <div className="h-px w-16 bg-gold/30" />
            <div className="w-10 h-10 rounded-full border border-gold/20 bg-gold/10 flex items-center justify-center text-gold shadow-[0_0_20px_rgba(212,175,55,0.1)]">
              <span className="text-lg">✿</span>
            </div>
            <div className="h-px w-16 bg-gold/30" />
          </div>
          <p className="max-w-2xl mx-auto font-sans text-dark/70 leading-relaxed tracking-wide">
            Assalamu&lsquo;alaikum Warahmatullahi Wabarakatuh. Dengan rahmat
            Allah SWT, kami mengundang Anda untuk menghadiri pernikahan dari:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-12 md:gap-8 items-start max-w-5xl mx-auto">
          <PersonCard
            name="Jeni Adhiva, S.Kom., M.Kom"
            nameClassName="text-3xl leading-tight"
            role="Mempelai Wanita"
            relation="Putri tercinta dari"
            parents={{ father: "Zamri", mother: "Desliana" }}
            image="https://images.unsplash.com/photo-1549333341-a1288c387f65?auto=format&fit=crop&q=80"
            ig="sarah_bride"
          />

          <div className="relative flex justify-center md:pt-40">
            <div className="absolute inset-x-0 top-12 h-20 rounded-full bg-gold/10 blur-2xl opacity-50" />
            <SparkleGlint className="-left-7 top-5 h-2 w-2 animate-glitter" />
            <SparkleGlint className="right-12 top-8 h-2 w-2 animate-glitter delay-150" />
            <SparkleGlint className="left-10 top-24 h-1.5 w-1.5 animate-glitter delay-300" />
            <SparkleGlint className="right-16 top-24 h-1.5 w-1.5 animate-glitter delay-450" />
            <motion.span
              animate={{
                textShadow: [
                  "0 0 20px rgba(212,175,55,0)",
                  "0 0 40px rgba(212,175,55,0.3)",
                  "0 0 20px rgba(212,175,55,0)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="relative font-serif text-6xl text-shimmer-gold"
            >
              &amp;
            </motion.span>
          </div>

          <PersonCard
            name="M. Rifki Ilmi, S.T."
            role="Mempelai Pria"
            relation="Putra tercinta dari"
            parents={{ father: "Raflizar", mother: "Jusnaini, S.Pd.I" }}
            image="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80"
            ig="michael_groom"
          />
        </div>
      </div>

      {/* Decorative ornamental divider bottom */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center">
        <div className="w-64 h-px bg-linear-to-r from-transparent via-gold/30 to-transparent" />
      </div>
    </section>
  );
};
