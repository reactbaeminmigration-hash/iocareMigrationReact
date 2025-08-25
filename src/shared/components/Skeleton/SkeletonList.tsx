interface SkeletonListProps {
  count: number;
  children: (index: number) => React.ReactNode;
}

export const SkeletonList = ({ count, children }: SkeletonListProps) => {
  const items = Array.from({ length: count }).map((_, index) =>
    children(index),
  );
  return <>{items}</>;
};
