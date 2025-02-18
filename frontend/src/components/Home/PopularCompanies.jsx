import React from "react";


const PopularCompanies = () => {
  const companies = [
    {
      id: 1,
      title: "TATAMOTORS",
      location: "NEW DELHI",
      openPositions: 10,
    },
    {
      id: 2,
      title: "ADANI GROUPS",
      location: "MUMBAI",
      openPositions: 5,
    },
    {
      id: 3,
      title: "Hindustan Construction",
      location: "UTTAR PRADESH",
      openPositions: 20,
    },
  ];
  return (
    <div className="companies">
      <div className="container">
        <h3>TOP COMPANIES</h3>
        <div className="banner">
          {companies.map((element) => {
            return (
              <div className="card" key={element.id}>
                <div className="content">
                  <div className="text">
                    <p>{element.title}</p>
                    <p>{element.location}</p>
                  </div>
                </div>
                <button>Open Positions {element.openPositions}</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PopularCompanies;
