import type { GameLog } from '../types/GameLog';

export function transformRawLog(raw: any): GameLog {
  return {
    playerId: raw.playerId,
    name: raw.age,
    date: raw.date ?? '',
    timePlayed: `${Math.floor(raw.MP)}:${Math.round((raw.MP % 1) * 60)
      .toString()
      .padStart(2, '0')}`,
    gs: raw.GS,
    fgm: raw.FGM,
    fga: raw.FGA,
    fgPercent: raw['FG%'],
    tpm: raw['3PM'],
    tpa: raw['3PA'],
    tpPercent: raw['3P%'],
    ftm: raw.FT,
    fta: raw.FTA,
    ftPercent: raw.FTP,
    oreb: raw.ORB,
    dreb: raw.DRB,
    reb: raw.TRB,
    ast: raw.AST,
    stl: raw.STL,
    blk: raw.BLK,
    tov: raw.TOV,
    pf: raw.PF,
    pts: raw.PTS,
    plusMinus: 0,
    rn: 0,
  };
}
