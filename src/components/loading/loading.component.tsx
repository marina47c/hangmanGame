import { Spinner } from "@radix-ui/themes";
import './loading.style.scss';
import { useMemo } from "react";

interface LoadingProps {
  size?: 'small' | 'medium' | 'large'
}
type SpinnerSize = '1' | '2' | '3';

const Loading = ({ size = 'medium' }: LoadingProps) => {

  const componentSize = useMemo(() => {
    const sizes = {
      small: { spinnerSize: '1', fontSize: 'font-size-small' },
      medium: { spinnerSize: '2', fontSize: 'font-size-medium' },
      large: { spinnerSize: '3', fontSize: 'font-size-large' },
    };
    return sizes[size];
  }, [size]);
  
  return (
    <div className="loading-component">
      <Spinner size={componentSize?.spinnerSize as SpinnerSize}/>
      <span className={componentSize?.fontSize}>Loading...</span>
    </div>
  )
}

export default Loading;