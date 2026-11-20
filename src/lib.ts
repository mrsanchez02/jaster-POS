import type { Invoice, Service } from './types'
import { COUNTER_KEY, defaultServiceCatalog, SERVICES_KEY, STORAGE_KEY } from './data'

export const round2 = (value: number) => Math.round((Number(value) + Number.EPSILON) * 100) / 100
export const safeNumber = (value: unknown, fallback = 0) => Number.isFinite(Number(value)) ? Number(value) : fallback
export const formatMoney = (value: unknown) => new Intl.NumberFormat('es-DO', { style: 'currency', currency: 'DOP', minimumFractionDigits: 2 }).format(safeNumber(value))

function read<T>(key: string, fallback: T): T {
  try { const value = JSON.parse(localStorage.getItem(key) ?? 'null'); return value ?? fallback } catch { return fallback }
}

export function loadServices(): Service[] {
  const stored = read<unknown>(SERVICES_KEY, null)
  if (Array.isArray(stored) && stored.length) return stored.map((service) => ({ ...service, active: service.active !== false, description: service.description ?? '' }))
  localStorage.setItem(SERVICES_KEY, JSON.stringify(defaultServiceCatalog))
  return defaultServiceCatalog
}

export function loadInvoices(): Invoice[] { return read<Invoice[]>(STORAGE_KEY, []) }
export function saveInvoices(value: Invoice[]) { localStorage.setItem(STORAGE_KEY, JSON.stringify(value)) }
export function saveServices(value: Service[]) { localStorage.setItem(SERVICES_KEY, JSON.stringify(value)) }

export function generateInvoiceNumber() {
  const counter = (Number.parseInt(localStorage.getItem(COUNTER_KEY) ?? '0', 10) || 0) + 1
  localStorage.setItem(COUNTER_KEY, String(counter))
  return `TR-${String(counter).padStart(6, '0')}`
}

export function generateServiceId(services: Service[]) {
  const used = new Set(services.map((service) => /^SRV-(\d+)$/.exec(service.id ?? '')?.[1]).filter(Boolean).map(Number))
  let id = 1; while (used.has(id)) id++
  return `SRV-${String(id).padStart(4, '0')}`
}

export function getDateTime() {
  const now = new Date()
  return { date: now.toLocaleDateString('es-DO'), time: now.toLocaleTimeString('es-DO', { hour: '2-digit', minute: '2-digit' }) }
}
