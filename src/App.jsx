import React, { useMemo, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Zap,
  Shield,
  Waves,
  Orbit,
  MousePointer2,
} from "lucide-react";

const services = [
  {
    icon: Sparkles,
    title: "Visual Identity",
    text: "Premium Interfaces mit Tiefe, Glow, Grain und einer Präsenz, die sofort hängen bleibt.",
  },
  {
    icon: Zap,
    title: "Motion Systems",
    text: "Mikrointeraktionen, Scroll-Reveals und lebendige Animationen ohne billigen Template-Vibe.",
  },
  {
    icon: Shield,
    title: "Conversion Flow",
    text: "Klare Hierarchie, starke CTAs und UX, die sich smooth anfühlt, nicht überladen.",
  },
];

const stats = [
  ["98%", "visuelle Wirkung"],
  ["0.3s", "gefühlte Reaktion"],
  ["24/7", "Darkmode Energie"],
];

function FloatingOrb({ className, delay = 0, duration = 9 }) {
  return (
    <motion.div
      className={`pointer-events-none absolute rounded-full blur-3xl ${className}`}
      animate={{
        y: [0, -28, 16, 0],
        x: [0, 20, -12, 0],
        scale: [1, 1.12, 0.94, 1],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

function MagneticButton({ children }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, {
    stiffness: 180,
    damping: 14,
  });

  const springY = useSpring(y, {
    stiffness: 180,
    damping: 14,
  });

  return (
    <motion.button
      style={{ x: springX, y: springY }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left - rect.width / 2) * 0.22);
        y.set((e.clientY - rect.top - rect.height / 2) * 0.22);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      whileTap={{ scale: 0.96 }}
      className="group relative overflow-hidden rounded-full border border-[#efe7d0]/20 bg-[#efe7d0] px-7 py-4 text-sm font-bold uppercase tracking-[0.22em] text-[#161616] shadow-[0_0_42px_rgba(239,231,208,0.18)]"
    >
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/70 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      <span className="relative flex items-center gap-3">
        {children}
        <ArrowRight size={17} />
      </span>
    </motion.button>
  );
}

function TiltCard({ children, className = "" }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rotateX = useTransform(my, [-0.5, 0.5], [9, -9]);
  const rotateY = useTransform(mx, [-0.5, 0.5], [-9, 9]);

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - rect.left) / rect.width - 0.5);
        my.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      className={`relative rounded-[2rem] border border-[#efe7d0]/10 bg-[#202020]/70 p-6 shadow-2xl backdrop-blur-2xl ${className}`}
    >
      <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-[#efe7d0]/10 via-transparent to-transparent opacity-70" />
      <div className="relative" style={{ transform: "translateZ(32px)" }}>
        {children}
      </div>
    </motion.div>
  );
}

export default function App() {
  const [active, setActive] = useState(0);

  const words = useMemo(
    () => ["brutal smooth", "ultra modern", "creme-clean", "dark luxury"],
    []
  );

  return (
    <main className="min-h-screen overflow-hidden bg-[#141414] text-[#efe7d0] selection:bg-[#efe7d0] selection:text-[#141414]">
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(239,231,208,0.16),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(190,177,145,0.12),transparent_26%),linear-gradient(180deg,#141414,#1b1b1b_48%,#101010)]" />

        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(#efe7d0_1px,transparent_1px),linear-gradient(90deg,#efe7d0_1px,transparent_1px)] [background-size:54px_54px]" />

        <div className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(#efe7d0_1px,transparent_1px)] [background-size:13px_13px]" />

        <FloatingOrb className="left-[-8rem] top-24 h-80 w-80 bg-[#efe7d0]/18" />
        <FloatingOrb
          className="right-[-6rem] top-72 h-96 w-96 bg-[#a79775]/16"
          delay={1.4}
          duration={12}
        />
        <FloatingOrb
          className="bottom-[-8rem] left-1/3 h-96 w-96 bg-[#efe7d0]/10"
          delay={0.4}
          duration={14}
        />
      </div>

      <motion.div
        className="pointer-events-none fixed inset-0 z-50 mix-blend-soft-light"
        animate={{ opacity: [0.16, 0.24, 0.16] }}
        transition={{ duration: 4, repeat: Infinity }}
        style={{
          backgroundImage:
            "url('data:image/svg+xml,%3Csvg viewBox=%220 0 220 220%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%220.55%22/%3E%3C/svg%3E')",
        }}
      />

      <section className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-5 py-6 sm:px-8 lg:px-10">
        <motion.nav
          initial={{ y: -28, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="flex items-center justify-between rounded-full border border-[#efe7d0]/10 bg-[#202020]/60 px-5 py-4 backdrop-blur-xl"
        >
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 16,
                repeat: Infinity,
                ease: "linear",
              }}
              className="grid h-10 w-10 place-items-center rounded-full bg-[#efe7d0] text-[#151515]"
            >
              <Orbit size={20} />
            </motion.div>

            <span className="text-sm font-black uppercase tracking-[0.32em]">
              Noir/Studio
            </span>
          </div>

          <div className="hidden items-center gap-8 text-xs uppercase tracking-[0.28em] text-[#efe7d0]/60 md:flex">
            <a className="transition hover:text-[#efe7d0]" href="#work">
              Work
            </a>
            <a className="transition hover:text-[#efe7d0]" href="#motion">
              Motion
            </a>
            <a className="transition hover:text-[#efe7d0]" href="#contact">
              Start
            </a>
          </div>
        </motion.nav>

        <div className="grid flex-1 items-center gap-10 py-16 lg:grid-cols-[1.08fr_0.92fr]">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15 }}
              className="mb-7 inline-flex items-center gap-3 rounded-full border border-[#efe7d0]/12 bg-[#efe7d0]/5 px-4 py-2 text-xs uppercase tracking-[0.26em] text-[#efe7d0]/72"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#efe7d0] opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#efe7d0]" />
              </span>
              Webdesign aus der Zukunft
            </motion.div>

            <motion.h1
              initial={{
                opacity: 0,
                y: 46,
                filter: "blur(10px)",
              }}
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              transition={{
                duration: 1.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="max-w-5xl text-6xl font-black leading-[0.86] tracking-[-0.08em] text-[#efe7d0] sm:text-7xl md:text-8xl xl:text-[9.8rem]"
            >
              Dark sites that hit different.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.45 }}
              className="mt-7 max-w-2xl text-lg leading-8 text-[#efe7d0]/68 md:text-xl"
            >
              Ein kompromisslos moderner Onepager mit cremiger Typografie,
              brutal smoothen Animationen, Glasflächen, 3D-Tilt und
              hypnotischem Ambient-Glow.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.62 }}
              className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <MagneticButton>Launch vibe</MagneticButton>

              <div className="flex items-center gap-3 text-sm text-[#efe7d0]/55">
                <MousePointer2 size={17} />
                Hover über die Cards.
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
              rotate: -3,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: 0,
            }}
            transition={{
              duration: 1.1,
              delay: 0.25,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative"
          >
            <TiltCard className="min-h-[530px] overflow-hidden">
              <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#efe7d0]/15 blur-3xl" />

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-[#efe7d0]/45">
                    Live System
                  </p>
                  <h2 className="mt-2 text-3xl font-black tracking-[-0.05em]">
                    Motion Core
                  </h2>
                </div>

                <motion.div
                  animate={{ rotate: [0, 12, -12, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                  className="grid h-14 w-14 place-items-center rounded-2xl bg-[#efe7d0]/10"
                >
                  <Waves />
                </motion.div>
              </div>

              <div className="mt-16 grid place-items-center">
                <motion.div
                  className="relative h-72 w-72 rounded-full border border-[#efe7d0]/16"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 22,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  {[0, 1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      className="absolute left-1/2 top-1/2 h-5 w-5 rounded-full bg-[#efe7d0] shadow-[0_0_35px_rgba(239,231,208,0.75)]"
                      style={{
                        transform: `rotate(${i * 90}deg) translateX(136px)`,
                      }}
                      animate={{ scale: [1, 1.9, 1] }}
                      transition={{
                        duration: 2.4,
                        delay: i * 0.35,
                        repeat: Infinity,
                      }}
                    />
                  ))}

                  <motion.div
                    className="absolute inset-12 rounded-full border border-dashed border-[#efe7d0]/18"
                    animate={{ rotate: -360 }}
                    transition={{
                      duration: 14,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />

                  <motion.div
                    className="absolute inset-24 rounded-full bg-[#efe7d0] shadow-[0_0_90px_rgba(239,231,208,0.4)]"
                    animate={{ scale: [1, 1.08, 0.96, 1] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                    }}
                  />
                </motion.div>
              </div>

              <div className="mt-12 grid grid-cols-3 gap-3">
                {stats.map(([big, small]) => (
                  <div
                    key={big}
                    className="rounded-3xl border border-[#efe7d0]/10 bg-[#141414]/50 p-4 text-center"
                  >
                    <div className="text-2xl font-black tracking-[-0.04em]">
                      {big}
                    </div>
                    <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-[#efe7d0]/45">
                      {small}
                    </div>
                  </div>
                ))}
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </section>

      <section
        id="work"
        className="relative z-10 mx-auto max-w-7xl px-5 pb-24 sm:px-8 lg:px-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{
            once: true,
            margin: "-120px",
          }}
          transition={{ duration: 0.8 }}
          className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#efe7d0]/45">
              What it does
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-[-0.06em] sm:text-6xl">
              Looks illegal. Feels premium.
            </h2>
          </div>

          <p className="max-w-md text-[#efe7d0]/58">
            Alles auf dunklem Grau, keine harten Schwarzflächen, sanfter
            Creme-Kontrast und Bewegungen mit echter Tiefe.
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-3">
          {services.map((item, i) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{
                  opacity: 0,
                  y: 50,
                  rotateX: -12,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  rotateX: 0,
                }}
                viewport={{
                  once: true,
                  margin: "-100px",
                }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.12,
                }}
                onMouseEnter={() => setActive(i)}
              >
                <TiltCard
                  className={`min-h-[300px] transition-all duration-500 ${
                    active === i
                      ? "border-[#efe7d0]/30 bg-[#242424]/85"
                      : ""
                  }`}
                >
                  <div className="mb-16 flex items-center justify-between">
                    <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#efe7d0]/10 text-[#efe7d0]">
                      <Icon />
                    </div>

                    <span className="text-xs uppercase tracking-[0.26em] text-[#efe7d0]/35">
                      0{i + 1}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black tracking-[-0.04em]">
                    {item.title}
                  </h3>

                  <p className="mt-4 leading-7 text-[#efe7d0]/58">
                    {item.text}
                  </p>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section
        id="motion"
        className="relative z-10 mx-auto max-w-7xl px-5 pb-28 sm:px-8 lg:px-10"
      >
        <div className="relative overflow-hidden rounded-[2.5rem] border border-[#efe7d0]/10 bg-[#1d1d1d]/70 p-7 backdrop-blur-2xl md:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(239,231,208,0.13),transparent_34%)]" />

          <div className="relative grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#efe7d0]/45">
                Kinetic Typography
              </p>

              <h2 className="mt-4 text-4xl font-black leading-none tracking-[-0.06em] sm:text-6xl">
                Deine Marke, aber mit maximaler Aura.
              </h2>
            </div>

            <div className="space-y-4">
              {words.map((word, i) => (
                <motion.div
                  key={word}
                  className="overflow-hidden rounded-3xl border border-[#efe7d0]/10 bg-[#141414]/48 px-6 py-5"
                  whileHover={{
                    scale: 1.025,
                    x: i % 2 ? -10 : 10,
                  }}
                >
                  <motion.div
                    animate={{
                      x: [0, i % 2 ? -18 : 18, 0],
                    }}
                    transition={{
                      duration: 3.6 + i,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="text-3xl font-black uppercase tracking-[-0.04em] text-[#efe7d0]/90 sm:text-5xl"
                  >
                    {word}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer
        id="contact"
        className="relative z-10 mx-auto max-w-7xl px-5 pb-10 sm:px-8 lg:px-10"
      >
        <div className="rounded-[2.5rem] border border-[#efe7d0]/10 bg-[#efe7d0] p-8 text-[#141414] md:p-12">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#141414]/55">
                Ready?
              </p>

              <h2 className="mt-3 max-w-3xl text-5xl font-black leading-[0.92] tracking-[-0.07em] md:text-7xl">
                Mach aus dem ersten Klick einen Film.
              </h2>
            </div>

            <button className="group rounded-full bg-[#141414] px-7 py-4 text-sm font-black uppercase tracking-[0.22em] text-[#efe7d0] transition hover:scale-105">
              <span className="flex items-center gap-3">
                Let’s build
                <ArrowRight
                  className="transition group-hover:translate-x-1"
                  size={17}
                />
              </span>
            </button>
          </div>
        </div>
      </footer>
    </main>
  );
}