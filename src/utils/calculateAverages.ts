import type { GameAverages } from '../types/GameAverages';
import type { GameLog } from '../types/GameLog';

function round(val: number, decimals = 1): number {
  return +val.toFixed(decimals);
}

function safePercent(made: number, attempted: number): number | null {
  return attempted > 0 ? round((made / attempted) * 100) : null;
}

function averageTime(times: string[]): string {
  if (times.length === 0) return '0:00';

  let totalSeconds = 0;

  times.forEach((t) => {
    const [min, sec] = t.split(':').map(Number);
    totalSeconds += min * 60 + sec;
  });

  const avgSeconds = totalSeconds / times.length;
  const avgMin = Math.floor(avgSeconds / 60);
  const avgSec = Math.round(avgSeconds % 60);

  return `${avgMin}:${avgSec.toString().padStart(2, '0')}`;
}

export function calculateAverages(gameLogs: GameLog[]): GameAverages {
  const totalGames = gameLogs.length;

  if (totalGames === 0) {
    return {
      gp: 0,
      gs: 0,
      timePlayed: '0:00',
      fgm: 0,
      fga: 0,
      fgPercent: null,
      tpm: 0,
      tpa: 0,
      tpPercent: null,
      ftm: 0,
      fta: 0,
      ftPercent: null,
      oreb: 0,
      dreb: 0,
      reb: 0,
      ast: 0,
      stl: 0,
      blk: 0,
      tov: 0,
      pf: 0,
      pts: 0,
      plusMinus: 0,
      rn: 0,
    };
  }

  let gs = 0;
  let fgm = 0,
    fga = 0;
  let tpm = 0,
    tpa = 0;
  let ftm = 0,
    fta = 0;
  let oreb = 0,
    dreb = 0,
    reb = 0;
  let ast = 0,
    stl = 0,
    blk = 0,
    tov = 0,
    pf = 0;
  let pts = 0,
    plusMinus = 0,
    rn = 0;

  const timePlayedStrings: string[] = [];

  gameLogs.forEach((log) => {
    gs += log.gs ?? 0;
    fgm += log.fgm ?? 0;
    fga += log.fga ?? 0;
    tpm += log.tpm ?? 0;
    tpa += log.tpa ?? 0;
    ftm += log.ftm ?? 0;
    fta += log.fta ?? 0;
    oreb += log.oreb ?? 0;
    dreb += log.dreb ?? 0;
    reb += log.reb ?? 0;
    ast += log.ast ?? 0;
    stl += log.stl ?? 0;
    blk += log.blk ?? 0;
    tov += log.tov ?? 0;
    pf += log.pf ?? 0;
    pts += log.pts ?? 0;
    plusMinus += log.plusMinus ?? 0;
    rn += log.rn ?? 0;
    if (log.timePlayed) timePlayedStrings.push(log.timePlayed);
  });

  return {
    gp: totalGames,
    gs,
    timePlayed: averageTime(timePlayedStrings),
    fgm: round(fgm / totalGames),
    fga: round(fga / totalGames),
    fgPercent: safePercent(fgm, fga),
    tpm: round(tpm / totalGames),
    tpa: round(tpa / totalGames),
    tpPercent: safePercent(tpm, tpa),
    ftm: round(ftm / totalGames),
    fta: round(fta / totalGames),
    ftPercent: safePercent(ftm, fta),
    oreb: round(oreb / totalGames),
    dreb: round(dreb / totalGames),
    reb: round(reb / totalGames),
    ast: round(ast / totalGames),
    stl: round(stl / totalGames),
    blk: round(blk / totalGames),
    tov: round(tov / totalGames),
    pf: round(pf / totalGames),
    pts: round(pts / totalGames),
    plusMinus: round(plusMinus / totalGames),
    rn: round(rn / totalGames),
  };
}
