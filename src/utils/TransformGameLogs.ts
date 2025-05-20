import type { GameLog } from '../types/GameLog';

export function transformRawLog(raw: any): GameLog {
  return {
    playerId: raw.playerId,
    name: '',
    date: raw.date ?? '',
    timePlayed: raw.timePlayed ?? '0:00',
    gs: raw.gs ?? 0,
    fgm: raw.fgm ?? 0,
    fga: raw.fga ?? 0,
    fgPercent: raw['fg%'] ?? null,
    tpm: raw.tpm ?? 0,
    tpa: raw.tpa ?? 0,
    tpPercent: raw['tp%'] ?? null,
    ftm: raw.ftm ?? 0,
    fta: raw.fta ?? 0,
    ftPercent: raw['ft%'] ?? null,
    oreb: raw.oreb ?? 0,
    dreb: raw.dreb ?? 0,
    reb: raw.reb ?? 0,
    ast: raw.ast ?? 0,
    stl: raw.stl ?? 0,
    blk: raw.blk ?? 0,
    tov: raw.tov ?? 0,
    pf: raw.pf ?? 0,
    pts: raw.pts ?? 0,
    plusMinus: raw.plusMinus ?? 0,
    rn: raw.rn ?? 0,
  };
}
