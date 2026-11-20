import type { Service } from './types'

export const TAX_RATE = 0.18
export const STORAGE_KEY = 'taller_razer_db'
export const COUNTER_KEY = 'taller_razer_counter'
export const SERVICES_KEY = 'taller_razer_services'

export const defaultServiceCatalog: Service[] = [
  ['Cambio de aceite', 45, 'Incluye aceite y filtro'], ['Cambio de frenos', 120, 'Pastillas y revisión'],
  ['Alineación', 50, 'Alineación computarizada'], ['Balanceo', 40, 'Balanceo de 4 ruedas'],
  ['Cambio de batería', 150, 'Batería nueva instalada'], ['Diagnóstico', 35, 'Escaneo computarizado'],
  ['Mantenimiento general', 200, 'Revisión completa'], ['Lavado completo', 30, 'Lavado interior y exterior'],
  ['Cambio de bujías', 80, 'Bujías nuevas'], ['Cambio de filtro', 35, 'Filtro de aire o combustible'],
  ['Revisión de aire acondicionado', 60, 'Carga de gas y revisión'], ['Reparación de suspensión', 180, 'Amortiguadores y resortes'],
].map(([name, price, description], index) => ({ id: `SRV-${String(index + 1).padStart(4, '0')}`, name: name as string, price: price as number, description: description as string, active: true }))
