import React, { memo } from "react";

const ContentCard: React.FC = () => (
  <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
    <div className="aspect-video bg-gray-200 rounded-md mb-4"></div>
    <h3 className="font-semibold text-lg mb-2">Card Title</h3>
    <p className="text-gray-600">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </p>
  </div>
);

export default memo(ContentCard);
