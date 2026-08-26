export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  as: Component = 'button',
  leftIcon,
  rightIcon,
  ...props
}) {
  const isDonateButton = props.href === '/donate';
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full border border-red-600 font-medium transition-all duration-300 ease-site hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-2';

  const variants = {
    primary: 'bg-red-600 text-white hover:bg-white hover:text-red-600',
    secondary: 'bg-red-100 text-red-700 hover:bg-red-200',
    ghost: 'bg-transparent text-red-700 hover:bg-red-50',
  };

  const sizes = {
    sm: 'px-4 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <Component
      className={`${base} ${isDonateButton ? 'donate-button-pulse' : ''} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {leftIcon && <span className={iconSizes[size]}>{leftIcon}</span>}
      {children}
      {rightIcon && <span className={iconSizes[size]}>{rightIcon}</span>}
    </Component>
  );
}