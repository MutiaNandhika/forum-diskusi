import { useSelector } from 'react-redux';

function LoadingBar() {
  const loadingBar = useSelector((state) => state.loadingBar);
  const isLoading =
    typeof loadingBar === 'number'
      ? loadingBar > 0
      : (loadingBar?.default ?? 0) > 0;

  if (!isLoading) return null;

  return (
    <div className="custom-loading-bar-container">
      <div className="custom-loading-bar-indicator" />
    </div>
  );
}

export default LoadingBar;
