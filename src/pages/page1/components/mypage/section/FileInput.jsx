import { useRef } from "react";

export default function FileInput({ label, onChange }) {
  const ref = useRef(null);

  const onClick = () => {
    ref.current?.click();
  };
  return (
    <button onClick={onClick}>
      {label}
      <input
      hidden
      type="file"
      accept="image/jpeg, image/png, image/gif, image/bmp"
      name="image-input"
      onChange={onChange}
    ref={ref}
/>
    </button>
  );
}