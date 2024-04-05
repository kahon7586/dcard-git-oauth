import React from "react";

const LoadingVideo = ({ src }: { src: string }) => {
  return <video src={src} loop playsInline autoPlay width={50} height={75} />;
};

const PeppoDance = () => {
  return <LoadingVideo src="/PeepoDance.webm" />;
};

const CrumbCat = () => {
  return <LoadingVideo src="/crumb-cat.webm" />;
};

const RainbowParrot = () => {
  return <LoadingVideo src="/rainbowParrot.webm" />;
};

function getRandomIcon() {
  const number = Math.floor(Math.random() * 3);
  switch (number) {
    case 0:
      return <PeppoDance />;

    case 1:
      return <CrumbCat />;

    case 2:
      return <RainbowParrot />;

    default:
      return <PeppoDance />;
  }
}

const Loading = () => {
  const LoadingIcon = getRandomIcon();

  return (
    <div className="relative flex flex-grow items-center justify-center gap-4">
      <h1 className="text-5xl">Loading...</h1>
      {LoadingIcon}
    </div>
  );
};

export default Loading;
