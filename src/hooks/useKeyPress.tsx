import { useState, useEffect } from "react";

const useKeyPress = (targetKey: string): boolean => {
  const [isKeyPressed, setIsKeyPressed] = useState<boolean>(false);

  useEffect(() => {
    const downHandler = ({ key }: KeyboardEvent) => {
      if (key === targetKey) {
        setIsKeyPressed(true);
      }
    };

    const upHandler = ({ key }: KeyboardEvent) => {
      if (key === targetKey) {
        setIsKeyPressed(false);
      }
    };

    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, [targetKey]);

  return isKeyPressed;
};

export default useKeyPress;
