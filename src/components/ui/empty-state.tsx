interface EmptyStateProps {
  message: string;
}

export function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="flex justify-center items-center p-8">
      <div className="text-muted-foreground text-center">
        <p className="text-lg">{message}</p>
      </div>
    </div>
  );
}