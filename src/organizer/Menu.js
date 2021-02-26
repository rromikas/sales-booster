import React from "react";

const menuItems = [
  { title: "Boost Sales", items: ["Overview", "Shows", "Orders"] },
  {
    title: "Boost Marketing",
    items: ["Overview", "Actions", "Insights", "Integrations", "Management"],
  },
];

const Menu = () => {
  return (
    <div>
      {menuItems.map((x, i) => (
        <div key={`menu-item-${i}`} className="mb-10">
          <div className="mb-6 text-gray-450 text-xs font-bold">{x.title}</div>
          <div className="text-gray-600">
            {x.items.map((y, j) => (
              <div key={`menu-item-${i}-option-${j}`} className="mb-3 font-bold">
                {y}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Menu;
