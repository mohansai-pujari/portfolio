export default function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="grid-bg absolute inset-0" />
      <div
        className="glow-orb left-[-10%] top-[10%] h-[500px] w-[500px] bg-accent/20"
        style={{ animationDelay: "0s" }}
      />
      <div
        className="glow-orb right-[-5%] top-[40%] h-[400px] w-[400px] bg-accent-secondary/15"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="glow-orb bottom-[10%] left-[30%] h-[350px] w-[350px] bg-accent-violet/10"
        style={{ animationDelay: "4s" }}
      />
    </div>
  );
}
