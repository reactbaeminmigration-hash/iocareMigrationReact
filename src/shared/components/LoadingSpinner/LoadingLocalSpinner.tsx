import { useIsFetching } from '@tanstack/react-query';

interface LoadingLocalSpinnerProps {
  children: React.ReactNode;
  scopeKey: string[];
  className?: string;
  as?: React.ElementType;
}

export const LoadingLocalSpinner = ({
  children,
  scopeKey,
  className,
  as: Component = 'div',
}: LoadingLocalSpinnerProps) => {
  const isAnythingLoading = useIsFetching({ queryKey: scopeKey }) > 0;

  const containerClassName = `${className || ''} ${
    isAnythingLoading ? 'cw_cont_loading' : ''
  }`.trim();

  return <Component className={containerClassName}>{children}</Component>;
};
