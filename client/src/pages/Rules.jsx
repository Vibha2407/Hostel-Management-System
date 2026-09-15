import { motion } from "framer-motion";
import RulesHero from "../components/rules/Rules.Hero";
import RuleCategory from "../components/rules/RulesCategory";
import NoticeCard from "../components/rules/NoticeCard";
import RulesFAQ from "../components/home/FAQ";

import { rulesData } from "../constants/rulesData";

const Rules = () => {
  return (
    <main
      className="
        !relative
        !min-h-screen
        !overflow-hidden
        !bg-[var(--color-background)]
        !text-[var(--color-text-primary)]
        !transition-colors
        !duration-300
      "
    >
      {/* =====================================================
          HERO
      ====================================================== */}

      <RulesHero />

      {/* =====================================================
          RULE CATEGORIES
      ====================================================== */}

      <section
        className="
          !relative
          !mx-auto
          !max-w-7xl
          !px-5
          !py-16

          sm:!px-8
          sm:!py-20

          lg:!px-10
          lg:!py-24
        "
      >
        {/* =====================================================
            AMBIENT GRADIENT
        ====================================================== */}

        <div
          className="
            !pointer-events-none
            !absolute
            !-right-40
            !top-20
            !h-96
            !w-96
            !rounded-full
            !bg-[#D4AF37]/[0.07]
            !blur-[120px]
          "
        />

        <div
          className="
            !pointer-events-none
            !absolute
            !-left-40
            !bottom-10
            !h-80
            !w-80
            !rounded-full
            !bg-[#D4AF37]/[0.04]
            !blur-[110px]
          "
        />

        {/* =====================================================
            RULE GRID
        ====================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.1,
          }}
          transition={{
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="
            !relative
            !grid
            !grid-cols-1
            !gap-6

            md:!grid-cols-2
            lg:!gap-8
          "
        >
          {rulesData.map((item, index) => (
            <RuleCategory
              key={item.title}
              title={item.title}
              rules={item.rules}
              index={index}
            />
          ))}
        </motion.div>
      </section>

      {/* =====================================================
          NOTICE
      ====================================================== */}

      <NoticeCard />

      {/* =====================================================
          FAQ
      ====================================================== */}

      <RulesFAQ />
    </main>
  );
};

export default Rules;
