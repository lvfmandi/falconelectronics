"use client";

// types and resources
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface ImagePositionProviderProps {
  children: React.ReactNode;
}

type ImagePositionContext = {
  position: number;
  setPosition: Dispatch<SetStateAction<number>>;
};

const ImagePositionContext = createContext<ImagePositionContext | null>(null);

export const useImagePosition = () => {
  const context = useContext(ImagePositionContext);
  if (!context) {
    throw new Error(
      "useImagePosition should be used within ImagePositionProvider"
    );
  }

  return context;
};

export const ImagePositionProvider = ({
  children,
}: ImagePositionProviderProps) => {
  const [position, setPosition] = useState(0);

  return (
    <ImagePositionContext.Provider value={{ position, setPosition }}>
      {children}
    </ImagePositionContext.Provider>
  );
};
