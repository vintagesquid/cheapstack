import type { FC } from "react";

const Splash: FC = () => {
  return (
    <section
      className="grid place-items-center"
      style={{ height: "calc(100vh - var(--navbar-height))" }}
    >
      <div className="flex flex-wrap items-baseline gap-12">
        <h1 className="text-6xl">cheapstack.stack</h1>
        <p className="text-2xl text-white">
          The cheapest stack for your next project.
        </p>
      </div>
    </section>
  );
};

export default Splash;
