import React from 'react';

interface StartProps {
  mounted: boolean;
  resolvedTheme: string | undefined;
  setTheme: (theme: string) => void;
}

const TopButtons: React.FC<StartProps> = ({
  mounted,
  resolvedTheme,
  setTheme,
}) => {
  return (
    <main>

    </main>
  );
};

export default TopButtons;
