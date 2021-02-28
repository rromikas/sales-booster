import React from "react";

const menuItems = [
  {
    title: "Boost Sales",
    items: [
      { title: "Overview", pageIndex: 0 },
      { title: "Shows", pageIndex: 1 },
      { title: "Orders", pageIndex: 2 },
    ],
  },
  {
    title: "Boost Marketing",
    items: [
      { title: "Overview", pageIndex: 3 },
      { title: "Actions", pageIndex: 4 },
      { title: "Insights", pageIndex: 5 },
      { title: "Integrations", pageIndex: 6 },
      { title: "Management", pageIndex: 7 },
    ],
  },
];

const Menu = ({ setPage, page }) => {
  return (
    <div>
      {menuItems.map((x, i) => (
        <div key={`menu-item-${i}`} className="mb-10">
          <div className="mb-6 text-gray-450 text-xs font-bold">{x.title}</div>
          <div className="text-gray-600">
            {x.items.map((y, j) => (
              <div
                key={`menu-item-${i}-option-${j}`}
                className="mb-3 font-bold cursor-pointer hover:text-black-900 transition"
                onClick={() => setPage(y.pageIndex)}
              >
                {y.title}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Menu;
