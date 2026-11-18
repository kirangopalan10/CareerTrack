export default function StatusBadge({ status }) {
  const getStyles = () => {
    switch (status) {
      case 'Selected':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Interview':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Rejected':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'Applied':
      default:
        return 'bg-blue-50 text-blue-700 border-blue-200';
    }
  };

  const getDotColor = () => {
    switch (status) {
      case 'Selected':
        return 'bg-emerald-500';
      case 'Interview':
        return 'bg-amber-500';
      case 'Rejected':
        return 'bg-rose-500';
      case 'Applied':
      default:
        return 'bg-blue-500';
    }
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${getStyles()}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${getDotColor()}`} />
      {status || 'Unknown'}
    </span>
  );
}
