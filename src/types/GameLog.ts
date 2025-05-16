export interface GameLog {
  TRB?: number;
  FT?: number;
  fgPercent?: number | null;
  tpPercent?: number | null;
  ftPercent?: number | null;

  playerId: number;
  gameId: number;
  season: number;
  league: string;
  date: string;
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
  tpm: number;
  tpa: number;
  ftm: number;
  fta: number;
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
