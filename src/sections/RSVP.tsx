"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Dice5 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { FloatingParticles } from "@/components/shared/FloatingParticles";
import { GoldSparkle } from "@/components/shared/GoldSparkle";

const WISH_BANK = [
  "Selamat menempuh hidup baru! Semoga cinta kalian terus mekar dan abadi selamanya.",
  "Barakallahu lakuma wa baraka 'alaikuma wa jama'a bainakuma fii khair. Selamat berbahagia!",
  "Selamat menempuh ibadah terpanjang. Semoga menjadi keluarga sakinah, mawaddah, warahmah.",
  "Turut berbahagia atas pernikahan Rifki & Jeni. Semoga cinta kalian selalu dipenuhi berkah dan tawa.",
  "Selamat berbahagia Rifki & Jeni! Semoga hari-hari baru kalian dipenuhi kedamaian dan kebersamaan tiada akhir.",
  "Selamat menempuh hidup baru! Semoga selalu kompak, saling menguatkan, dan menua bersama dalam kebahagiaan.",
  "Happy wedding Rifki & Jeni! May your love story continue to grow more beautiful with each passing year.",
  "Selamat menempuh lembaran baru! Semoga cinta kasih kalian selalu kokoh dan saling melengkapi.",
  "Happy wedding Rifki & Jeni! Semoga petualangan hidup bersama ini dipenuhi keajaiban dan kebahagiaan.",
  "Selamat berbahagia! Semoga jalinan kasih kalian menjadi pelita dalam setiap langkah perjalanan hidup.",
  "Baarakallahu laka wa baaraka 'alaika wa jama'a bainakumaa fii khairin. Selamat membina keluarga baru!",
  "Selamat mengarungi bahtera rumah tangga. Semoga dipenuhi berkat melimpah dan kehangatan tiada tara.",
  "Selamat menempuh hidup baru Rifki & Jeni! Semoga setiap hari mendatangkan tawa dan harmoni yang indah.",
  "Sending you both love, joy, and endless happiness on this beautiful wedding day. Congratulations!",
  "Selamat atas janji suci kalian. Semoga cinta yang menyatukan hari ini menjadi kekal hingga akhir hayat.",
  "Selamat berbahagia untuk Rifki & Jeni! Semoga dikaruniai keturunan yang saleh/salihah dan kebahagiaan sejati.",
  "Cheers to love, laughter, and a happily ever after. Wishing you a beautiful marriage journey!",
  "Selamat menempuh ibadah mulia pernikahan. Semoga langkah kalian selalu diridhai Tuhan YME.",
  "Happy wedding! May your home be a sanctuary of peace, kindness, and eternal love.",
  "Selamat menempuh hidup baru! Semoga setiap rintangan dihadapi bersama dengan kelembutan dan kebijaksanaan.",
  "Turut bersuka cita atas pernikahan Rifki & Jeni. Semoga cinta kalian senantiasa bersinar terang.",
  "May the love you share today grow deeper and stronger as you grow old together. Congratulations!",
  "Selamat menempuh pernikahan yang penuh berkah. Semoga setiap detik kebersamaan bernilai ibadah.",
  "Selamat berbahagia Rifki & Jeni! Jaga selalu api cinta agar tetap hangat menyinari keluarga kecil kalian.",
  "Congratulations on finding your perfect match! Wishing you a lifetime of laughter, growth, and love.",
  "Selamat menyatukan dua hati dan dua keluarga. Semoga menjadi pasangan dunia akhirat yang harmonis.",
  "Selamat membina rumah tangga baru. Semoga kebahagiaan hari ini terus mengalir di sepanjang usia pernikahan."
];

export const RSVP = () => {
  const [step, setStep] = useState<"search" | "confirm" | "success">("search");
  const [searchQuery, setSearchQuery] = useState("");
  const [verifiedName, setVerifiedName] = useState("");
  const [attendance, setAttendance] = useState<"attending" | "not_attending">("attending");
  const [message, setMessage] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verificationError, setVerificationError] = useState("");

  useEffect(() => {
    // Automatically verify guest name if 'to' param exists in URL
    const params = new URLSearchParams(window.location.search);
    const to = params.get("to");
    if (to) {
      const name = decodeURIComponent(to);
      setVerifiedName(name);
      setStep("confirm");
    }
  }, []);

  const getRandomMessage = () => {
    const randomIndex = Math.floor(Math.random() * WISH_BANK.length);
    return WISH_BANK[randomIndex];
  };

  const handleRandomizeMessage = () => {
    let nextMessage = getRandomMessage();
    if (message.trim() && WISH_BANK.includes(message)) {
      while (nextMessage === message && WISH_BANK.length > 1) {
        nextMessage = getRandomMessage();
      }
    }
    setMessage(nextMessage);
  };

  const handleVerify = () => {
    if (!searchQuery.trim()) {
      setVerificationError("Silakan masukkan nama Anda");
      return;
    }
    if (searchQuery.trim().length < 3) {
      setVerificationError("Nama minimal terdiri dari 3 karakter");
      return;
    }

    setIsVerifying(true);
    setVerificationError("");

    // Simulate luxury API verification transition
    setTimeout(() => {
      setVerifiedName(searchQuery.trim());
      setStep("confirm");
      setIsVerifying(false);
    }, 1200);
  };

  const handleSubmitRSVP = async () => {
    setIsSubmitting(true);
    try {
      const selectedMessage = message.trim() || getRandomMessage();
      const finalMessage = `${selectedMessage} |attendance:${attendance}`;

      const { error } = await supabase.from("wishes").insert([
        {
          name: verifiedName,
          message: finalMessage,
        },
      ]);

      if (error) throw error;

      setStep("success");
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative py-32 md:py-48 bg-dark text-primary overflow-hidden">
      <FloatingParticles
        count={30}
        color="#D4AF3780"
        speed={0.2}
        maxSize={4}
        minSize={1.2}
        opacity={0.35}
        className="opacity-80"
      />
      <div className="absolute inset-0 pointer-events-none">
        <div className="bokeh-circle w-40 h-40 -left-10 top-16 opacity-60" />
        <div className="bokeh-circle w-48 h-48 right-8 top-24 opacity-30" />
        <div className="bokeh-circle w-56 h-56 left-1/2 top-12 -translate-x-1/2 opacity-20" />
      </div>

      <div className="container mx-auto px-6 max-w-3xl relative z-10">
        <div className="text-center mb-24 relative">
          <GoldSparkle size={20} className="absolute -top-4 left-10" />
          <GoldSparkle size={14} className="absolute top-4 right-14" />
          <h2 className="font-serif text-5xl md:text-6xl text-gold mb-6 tracking-tight text-shimmer-gold">
            R.S.V.P
          </h2>
          <div className="w-24 h-px bg-gold/30 mx-auto mb-8 shimmer-line" />
          <p className="font-sans text-sm text-primary/60 tracking-widest uppercase">
            Konfirmasi Kehadiran
          </p>
        </div>

        <div className="relative min-h-[300px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {step === "search" && (
              <motion.div
                key="search"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md mx-auto text-center space-y-8 bg-white/5 border border-gold/10 rounded-4xl p-8 backdrop-blur-xl holo-card relative"
              >
                <div className="absolute top-6 right-8 h-2 w-2 rounded-full bg-gold/80 shadow-[0_0_14px_rgba(212,175,55,0.35)] animate-sparkle" />
                <div className="space-y-4">
                  <label className="font-sans text-xs uppercase tracking-widest text-gold/80 block">
                    Nama
                  </label>
                  <div className="border-b border-gold/30 focus-within:border-gold transition-all duration-500 py-2">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setVerificationError("");
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleVerify();
                      }}
                      placeholder="Masukkan nama Anda..."
                      className="w-full bg-transparent text-center font-serif text-xl focus:outline-none placeholder:text-primary/25 text-primary py-1"
                    />
                  </div>
                  {verificationError && (
                    <p className="text-red-400 text-[10px] uppercase tracking-widest">
                      {verificationError}
                    </p>
                  )}
                </div>

                <Button
                  onClick={handleVerify}
                  disabled={isVerifying}
                  variant="gold"
                  className="w-full shadow-lg"
                >
                  {isVerifying ? "Memverifikasi..." : "Cari Undangan"}
                </Button>
              </motion.div>
            )}

            {step === "confirm" && (
              <motion.div
                key="confirm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-xl mx-auto space-y-12 bg-white/5 border border-gold/10 rounded-4xl p-8 backdrop-blur-xl holo-card relative text-center"
              >
                <div className="absolute top-6 right-8 h-2 w-2 rounded-full bg-gold/80 shadow-[0_0_14px_rgba(212,175,55,0.35)] animate-sparkle" />

                <div className="space-y-3">
                  <p className="font-sans text-xs uppercase tracking-[0.2em] text-gold/60">
                    Selamat datang,
                  </p>
                  <h3 className="font-serif text-3xl md:text-4xl text-primary italic leading-relaxed">
                    {verifiedName}
                  </h3>
                  <button
                    onClick={() => {
                      setStep("search");
                      setSearchQuery("");
                    }}
                    className="font-sans text-[10px] uppercase tracking-widest text-gold/40 hover:text-gold/80 transition-colors duration-300 mt-2 underline underline-offset-4"
                  >
                    Bukan Anda? Ganti Nama
                  </button>
                </div>

                <div className="space-y-4">
                  <p className="font-sans text-xs uppercase tracking-widest text-gold/80">
                    Konfirmasi Kehadiran
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button
                      type="button"
                      onClick={() => setAttendance("attending")}
                      className={`px-8 py-3 rounded-full border transition-all duration-500 font-serif text-base tracking-wider w-full sm:w-44 ${attendance === "attending"
                          ? "bg-gold text-dark border-gold shadow-lg shadow-gold/20"
                          : "border-gold/30 text-primary/60 hover:border-gold/60 hover:text-primary bg-transparent"
                        }`}
                    >
                      Saya Hadir
                    </button>
                    <button
                      type="button"
                      onClick={() => setAttendance("not_attending")}
                      className={`px-8 py-3 rounded-full border transition-all duration-500 font-serif text-base tracking-wider w-full sm:w-44 ${attendance === "not_attending"
                          ? "bg-gold text-dark border-gold shadow-lg shadow-gold/20"
                          : "border-gold/30 text-primary/60 hover:border-gold/60 hover:text-primary bg-transparent"
                        }`}
                    >
                      Tidak Hadir
                    </button>
                  </div>
                </div>

                <div className="space-y-3 max-w-md mx-auto relative">
                  <label className="font-sans text-xs uppercase tracking-widest text-gold/80 block">
                    Ucapan & Doa Restu (Opsional)
                  </label>
                  <div className="relative border-b border-gold/20 focus-within:border-gold/50 transition-colors duration-500 py-1 flex items-center">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tuliskan ucapan selamat..."
                      className="w-full bg-transparent text-center font-serif text-lg focus:outline-none placeholder:text-primary/20 text-primary py-1 pr-10 pl-10"
                    />
                    <button
                      type="button"
                      onClick={handleRandomizeMessage}
                      className="absolute right-1 p-1.5 text-gold/40 hover:text-gold hover:bg-white/5 rounded transition-all duration-300 active:scale-90"
                      title="Acak ucapan"
                    >
                      <Dice5 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <Button
                  onClick={handleSubmitRSVP}
                  disabled={isSubmitting}
                  variant="gold"
                  size="lg"
                  className="w-full max-w-xs mx-auto shadow-lg"
                >
                  {isSubmitting ? "Mengirim..." : "Kirim Konfirmasi"}
                </Button>
              </motion.div>
            )}

            {step === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md mx-auto text-center p-12 border border-gold/20 bg-primary/5 rounded-4xl shadow-2xl holo-card backdrop-blur-xl relative"
              >
                <div className="absolute top-6 right-8 h-2 w-2 rounded-full bg-gold/80 shadow-[0_0_14px_rgba(212,175,55,0.35)] animate-sparkle" />
                <h3 className="font-serif text-3xl mb-4 text-gold text-shimmer-gold">
                  Terima Kasih!
                </h3>
                <p className="font-sans text-primary/70 mb-8 text-sm leading-relaxed">
                  Konfirmasi kehadiran dan ucapan Anda telah kami terima. Sampai jumpa di hari bahagia kami!
                </p>
                <Button variant="outline" onClick={() => {
                  setStep("search");
                  setSearchQuery("");
                  setMessage("");
                }}>
                  Kirim Pesan Lain
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
