type Props = {
  username: string;
  className?: string;
};

export default function TextAvatar({ username, className }: Props) {
  const initials = username ? username.charAt(0).toUpperCase() : '';

  return (
    <div
      className={`w-10 h-10 flex items-center justify-center rounded-full bg-black text-white ${className}`}
    >
      {initials}
    </div>
  );
}
