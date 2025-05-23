import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import playerData from '../api/PlayerData.json';

interface ScoutingReport {
  playerId: number;
  scout: string;
  report: string;
}

interface ContextProps {
  scoutingReports: ScoutingReport[];
  addReport: (playerId: number, scout: string, report: string) => void;
}

const ScoutingReportContext = createContext<ContextProps | undefined>(
  undefined
);

export const useScoutingReports = () => {
  const context = useContext(ScoutingReportContext);
  if (!context)
    throw new Error('useScoutingReports must be used within a Provider');
  return context;
};

export const ScoutingReportProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [scoutingReports, setScoutingReports] = useState<ScoutingReport[]>(
    playerData.scoutingReports ?? []
  );

  const addReport = (playerId: number, scout: string, report: string) => {
    setScoutingReports((prev) => [...prev, { playerId, scout, report }]);
  };

  return (
    <ScoutingReportContext.Provider value={{ scoutingReports, addReport }}>
      {children}
    </ScoutingReportContext.Provider>
  );
};
