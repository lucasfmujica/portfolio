/** "Lucas Mujica." with the signature ember period. */
export function Wordmark({ className, dotClass }: { className?: string; dotClass?: string }) {
  return (
    <span className={className}>
      Lucas&nbsp;Mujica<span className={dotClass}>.</span>
    </span>
  );
}
