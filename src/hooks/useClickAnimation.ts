import { useCallback } from "react";

import { useState } from "react";

export const useClickAnimation = (duration = 400) => {
  const [isClicked, setIsClicked] = useState(false);

  const triggerAnimation = useCallback(() => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), duration);
  }, [duration]);

  return { isClicked, triggerAnimation };
}; 