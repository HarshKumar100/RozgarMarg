import React from "react";

const PopularCategories = () => {
  const categories = [
    {
      id: 1,
      title: "Electrician",
      subTitle: "305 Open Positions",
    },
    {
      id: 2,
      title: "Painter (House/Wall)",
      subTitle: "500 Open Positions",
    },
    {
      id: 3,
      title: "Security Guard",
      subTitle: "200 Open Positions",
    },
    {
      id: 4,
      title: "Carpenter",
      subTitle: "1000+ Open Postions",
    },
    {
      id: 5,
      title: "Welder",
      subTitle: "150 Open Positions",
    },
    {
      id: 6,
      title: "Delivery Boy",
      subTitle: "867 Open Positions",
    },
    {
      id: 7,
      title: "Cook/Chef",
      subTitle: "50 Open Positions",
    },
    {
      id: 8,
      title: "Counter Attendant",
      subTitle: "80 Open Positions",
    },
  ];
  return (
    <div className="categories">
      <h3>POPULAR CATEGORIES</h3>
      <div className="banner">
        {categories.map((element) => {
          return (
            <div className="card" key={element.id}>
              <div className="text">
                <p>{element.title}</p>
                <p>{element.subTitle}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PopularCategories;
