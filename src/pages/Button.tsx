export const Button = ({ onClick, title, text, chosen }) => (
  <button
    className={`sm:text-lg text-lg py-1.5 px-2.5`}
    style={{ textDecoration: chosen ? 'underline' : 'none' }}
    onClick={onClick}
    title={title}
  >
    {text}
  </button>
);