import { PageHeader } from "antd";
import React from "react";

// displays a page header

export default function Header() {
  return (
    <a href="https://github.com/austintgriffith/scaffold-eth" target="_blank" rel="noopener noreferrer">
      <PageHeader
        title="🏗 crabbytoken"
        subTitle="The crabby token app that shows tokens in unity"
        style={{ cursor: "pointer" }}
      />
    </a>
  );
}
