export default function StarIcon({ isActive }) {
  const fill = isActive ? "#E60000" : "#999999";
  return (
    <svg
      width="18"
      height="17"
      viewBox="0 0 18 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 0L12.1158 4.7114L17.5595 6.21885L14.0416 10.6381L14.2901 16.2812L9 14.301L3.70993 16.2812L3.95845 10.6381L0.440492 6.21885L5.88415 4.7114L9 0Z"
        fill={fill}
      />
    </svg>
  );
}
