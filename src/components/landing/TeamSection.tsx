import { motion } from "framer-motion";
import { Twitter, Linkedin } from "lucide-react";
import content from "../../content.json";

const PHOTOS = [
  "balaji.png",
  "sai_shreyas.png",
  "tejas.png"
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const, delay },
});

export function TeamSection() {
  const { team } = content;

  /* Parse bio string into two background items */
  const parseBio = (bio: string) =>
    bio.split(" · ").slice(0, 2);

  return (
    <section className="relative py-36 bg-[#080810] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        <motion.div {...fadeUp(0)} className="mb-5">
          <span className="font-display text-[10px] tracking-[0.2em] text-[#00e87a] uppercase">Built By</span>
        </motion.div>

        <motion.h2
          {...fadeUp(0.08)}
          className="font-display font-bold text-4xl sm:text-5xl text-white leading-[1.1] mb-16"
        >
          People who've seen<br />production systems break.
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {team.members.map((member, i) => {
            const bgItems = parseBio(member.bio);
            return (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.18 + i * 0.08 }}
                className="group border border-white/[0.06] rounded-2xl bg-[#0d0d1a] p-6 flex flex-col gap-4 hover:border-white/[0.1] transition-colors duration-300"
              >
                {/* photo */}
                <div className="w-full aspect-square rounded-xl overflow-hidden bg-[#090912]">
                  <img
                    src={PHOTOS[i] ?? PHOTOS[0]}
                    alt={member.name}
                    className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>

                {/* name + role */}
                <div>
                  <div className="text-white font-semibold text-[16px] leading-tight mb-1">
                    {member.name}
                  </div>
                  <div className="text-[#00e87a] text-[13px] font-display">
                    {member.role}
                  </div>
                </div>

                {/* background items */}
                <div className="flex flex-col gap-1">
                  {bgItems.map((item) => (
                    <div key={item} className="text-[#8888aa] text-[13px] leading-snug">
                      {item}
                    </div>
                  ))}
                </div>

                {/* socials */}
                <div className="flex items-center gap-2 pt-3 border-t border-white/[0.05] mt-auto">
                  {Object.entries(member.social).map(([platform, href]) => (
                    <a
                      key={platform}
                      href={href}
                      className="w-7 h-7 flex items-center justify-center text-[#8888aa] hover:text-white transition-colors rounded"
                      aria-label={platform}
                    >
                      {platform === "linkedin" ? <Linkedin className="w-3.5 h-3.5" /> : <Twitter className="w-3.5 h-3.5" />}
                    </a>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
