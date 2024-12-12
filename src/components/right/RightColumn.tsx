import React, { memo } from "react";

const RightColumn: React.FC = () => (
  <div className="bg-white rounded-lg shadow-md p-4 mb-4">
    <h3 className="font-semibold text-lg mb-4">Trending Topics</h3>
    {[1, 2, 3].map((item) => (
      <div key={item} className="mb-4 last:mb-0">
        <div className="bg-gray-100 rounded-md p-3">
          <h4 className="font-medium">Trending Topic {item}</h4>
          <p className="text-sm text-gray-600 mt-1">1.2k discussions</p>
        </div>
      </div>
    ))}
  </div>
);

export default memo(RightColumn);
