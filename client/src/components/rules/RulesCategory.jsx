const RuleCategory = ({ title, rules }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md !p-8">
      <h2 className="text-2xl font-bold text-[#D4AF37] !mb-6">{title}</h2>

      <ul className="!space-y-4">
        {rules.map((rule, index) => (
          <li key={index} className="flex !gap-3 text-gray-700">
            <span>✅</span>
            <span>{rule}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RuleCategory;
