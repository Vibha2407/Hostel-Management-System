import RulesHero from "../components/rules/Rules.Hero";
import RuleCategory from "../components/rules/RulesCategory";
import NoticeCard from "../components/rules/NoticeCard";
import RulesFAQ from "../components/home/FAQ";

import { rulesData } from "../constants/rulesData";

const Rules = () => {
  return (
    <>
      <RulesHero />

      <section className="max-w-7xl !mx-auto !px-6 !py-20">
        <div className="grid md:grid-cols-2 !gap-8">
          {rulesData.map((item) => (
            <RuleCategory
              key={item.title}
              title={item.title}
              rules={item.rules}
            />
          ))}
        </div>
      </section>

      <NoticeCard />

      <RulesFAQ />
    </>
  );
};

export default Rules;
