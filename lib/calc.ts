/**
 * Motor de la calculadora de ROI — misma metodología del caso de estudio real
 * (22 días hábiles/mes, salario CONASAMI 2026). Brief §5.
 *
 * Tabla de referencia validada (brief):
 *   100 empleados @ $315 → nómina $693,000 → 7.13% = $49,411 → 9.9× vs $5,000
 *   250 empleados @ $315 → nómina $1,732,500 → 7.13% = $123,527 → 8.2× vs $15,000
 *   500 empleados @ $315 → nómina $3,465,000 → 7.13% = $247,055 → 9.9× vs $25,000
 */

export const WORKING_DAYS = 22;

export const SALARIES = {
  minimo: 315, // CONASAMI 2026 (salario mínimo diario)
  promedio: 600, // promedio TecNM
} as const;

export const SCENARIOS = {
  conservador: 0.03,
  real: 0.0713,
  severo: 0.1,
} as const;

export type ScenarioKey = keyof typeof SCENARIOS;

/** Costo mensual de Kronet estimado por tramos de empleados. */
export function kronetCost(employees: number): number {
  if (employees <= 100) return 5000;
  if (employees <= 250) return 15000;
  return 25000;
}

export interface RoiResult {
  monthlyPayroll: number;
  monthlyRecovery: number;
  yearlyRecovery: number;
  kronetMonthly: number;
  ratio: number;
  paybackDays: number;
}

export function computeRoi(
  employees: number,
  dailySalary: number,
  rate: number
): RoiResult {
  const monthlyPayroll = employees * dailySalary * WORKING_DAYS;
  const monthlyRecovery = monthlyPayroll * rate;
  const yearlyRecovery = monthlyRecovery * 12;
  const kronetMonthly = kronetCost(employees);
  const ratio = monthlyRecovery / kronetMonthly;
  // Días para pagar la inversión mensual con la recuperación diaria
  const dailyRecovery = monthlyRecovery / WORKING_DAYS;
  const paybackDays = dailyRecovery > 0 ? kronetMonthly / dailyRecovery : 0;
  return {
    monthlyPayroll,
    monthlyRecovery,
    yearlyRecovery,
    kronetMonthly,
    ratio,
    paybackDays,
  };
}
