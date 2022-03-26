import "./loading.scss";

export function Loading({ loading }: { loading?: boolean }) {
  return (
    <div className={`loading ${loading ? "data-loading" : "none"}`}>
      <div className="point one"></div>
      <div className="point two"></div>
      <div className="point three"></div>
    </div>
  );
}
