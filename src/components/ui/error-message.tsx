interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="flex justify-center items-center p-8">
      <div className="text-destructive text-center">
        <p className="text-lg font-semibold">Error</p>
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
}