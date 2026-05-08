import { motion } from "framer-motion";
import { Twitter, Linkedin, MessageCircle } from "lucide-react";
import content from "../../content.json";

const socialIcon = (platform: string) => {
  const cls = "w-3.5 h-3.5";
  if (platform === "linkedin") return <Linkedin  className={cls} />;
  if (platform === "discord")  return <MessageCircle className={cls} />;
  return                               <Twitter  className={cls} />;
};

const cardVariant = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  show:   { opacity: 1, y: 0,  scale: 1    },
};

export function TeamSection() {
  const { team } = content;

  return (
    <section className="relative py-24 bg-[#060a06] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_50%,rgba(34,197,94,0.04)_0%,transparent_55%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">

        {/* section label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="font-display text-[10px] tracking-[0.3em] text-green-400/70 border border-green-500/20 px-3 py-1 rounded-sm bg-green-500/5">
            {team.sectionLabel}
          </span>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-5"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          transition={{ staggerChildren: 0.12 }}
        >
          {team.members.map((member) => (
            <motion.div
              key={member.name}
              variants={cardVariant}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="group p-5 border border-green-500/12 rounded-xl bg-[#080e08] card-hover-glow flex flex-col gap-4"
            >
              {/* avatar */}
              <div className="relative w-12 h-12 rounded-xl border border-green-500/25 bg-green-500/8 flex items-center justify-center overflow-hidden">
                <span className="font-display font-bold text-sm text-green-400">
                  {member.initials}
                </span>
                {/* subtle glow on hover */}
                <div className="absolute inset-0 bg-green-400/0 group-hover:bg-green-400/5 transition-colors rounded-xl" />
              </div>

              <div className="flex-1">
                <div className="font-display font-bold text-sm text-white leading-tight mb-0.5">
                  {member.name}
                </div>
                <div className="font-display text-[10px] text-green-400/70 mb-2">
                  {member.role}
                </div>
                <p className="text-gray-500 text-xs leading-relaxed">{member.bio}</p>
              </div>

              {/* socials */}
              <div className="flex items-center gap-2 pt-2 border-t border-green-500/8">
                {Object.entries(member.social).map(([platform, href]) => (
                  <a
                    key={platform}
                    href={href}
                    className="p-1.5 text-gray-600 hover:text-green-400 transition-colors rounded hover:bg-green-500/8"
                    aria-label={platform}
                  >
                    {socialIcon(platform)}
                  </a>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
