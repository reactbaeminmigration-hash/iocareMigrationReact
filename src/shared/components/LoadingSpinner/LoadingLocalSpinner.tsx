import { useIsFetching } from '@tanstack/react-query';

interface LoadingLocalSpinnerProps {
  children: React.ReactNode;
  localLoadingKey: string[];
  className?: string;
  as?: React.ElementType;
}

export const LoadingLocalSpinner = ({
  children,
  localLoadingKey,
  className,
  as: Component = 'div',
}: LoadingLocalSpinnerProps) => {
  const isAnythingLoading = useIsFetching({ queryKey: localLoadingKey }) > 0;

  const containerClassName = `${className || ''} ${
    isAnythingLoading ? 'cw_cont_loading' : ''
  }`.trim();

  return <Component className={containerClassName}>{children}</Component>;
};
