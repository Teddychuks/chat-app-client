function LoginSpinner() {
  return (
    <div
      className="animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-amber-500 rounded-full "
      role="status"
      aria-label="loading"
    ></div>
  );
}

export default LoginSpinner;
