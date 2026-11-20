export type ToastType = 'success' | 'error' | 'info'

export interface Service {
  id: string
  name: string
  price: number
  description: string
  active: boolean
}

export interface SelectedService {
  serviceId: string | null
  name: string
  description: string
  price: number
  quantity: number
}

export interface Invoice {
  id: string
  clientName: string
  vehicleModel: string
  plateNumber: string
  vehicleYear: string
  clientPhone: string
  services: SelectedService[]
  subtotal: number
  tax: number
  total: number
  applyTax: boolean
  date: string
  time: string
}

export interface Backup {
  version: number
  exportedAt: string
  facturas: Invoice[]
  servicios: Service[]
}

export interface InvoiceForm {
  clientName: string
  vehicleModel: string
  plateNumber: string
  vehicleYear: string
  clientPhone: string
  applyTax: boolean
}
