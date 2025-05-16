export interface GameLog {
  TRB: number;
  FT: number;
  playerId: number;
  gameId: number;
  season: number;
  league: string;
  date: string; // e.g., "2025-04-05 00:00:00"
  team: string;
  teamId: number;
  opponentId: number;
  isHome: boolean | null;
  opponent: string;
  homeTeamPts: number;
  visitorTeamPts: number;

  gp: number;
  gs: number;
  timePlayed: string;
  fgm: number;
  fga: number;
  fgPercent: number | null;
  tpm: number;
  tpa: number;
  tpPercent: number | null;
  ftm: number;
  fta: number;
  ftPercent: number | null;
  oreb: number;
  dreb: number;
  reb: number;
  ast: number;
  stl: number;
  blk: number;
  tov: number;
  pf: number;
  pts: number;
  plusMinus: number;
  rn: number;
}
