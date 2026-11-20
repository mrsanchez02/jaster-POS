import { jsPDF } from 'jspdf'
import type { Invoice } from './types'
import { formatMoney } from './lib'

const safe = (value: unknown) => String(value ?? '').replace(/\r?\n/g, ' ').replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/\t/g, ' ').trim()

export function generateInvoicePDF(record: Invoice) {
  const doc = new jsPDF()
  doc.setFillColor(220, 38, 38); doc.rect(0, 0, 210, 38, 'F')
  doc.setTextColor(255, 255, 255); doc.setFont('helvetica', 'bold'); doc.setFontSize(24); doc.text('TALLER RAZER', 105, 15, { align: 'center' })
  doc.setFont('helvetica', 'normal'); doc.setFontSize(10); doc.text('Sistema de Control de Vehículos y Facturación', 105, 24, { align: 'center' })
  doc.setTextColor(31, 41, 55); doc.setFont('helvetica', 'bold'); doc.setFontSize(15); doc.text('FACTURA', 20, 52)
  doc.setFont('helvetica', 'normal'); doc.setFontSize(10)
  doc.text(`No. Factura: ${safe(record.id)}`, 20, 61); doc.text(`Fecha: ${safe(record.date)}`, 20, 68); doc.text(`Hora: ${safe(record.time)}`, 20, 75)
  doc.setFont('helvetica', 'bold'); doc.setFontSize(12); doc.text('Datos del Cliente', 20, 90)
  doc.setFont('helvetica', 'normal'); doc.setFontSize(10); doc.text(`Cliente: ${safe(record.clientName)}`, 20, 99); doc.text(`Teléfono: ${safe(record.clientPhone)}`, 20, 106)
  doc.setFont('helvetica', 'bold'); doc.setFontSize(12); doc.text('Datos del Vehículo', 20, 121)
  doc.setFont('helvetica', 'normal'); doc.setFontSize(10); doc.text(`Modelo: ${safe(record.vehicleModel)}`, 20, 130); doc.text(`Placa: ${safe(record.plateNumber)}`, 20, 137); doc.text(`Año: ${safe(record.vehicleYear)}`, 20, 144)
  let y = 158; doc.setFillColor(31, 41, 55); doc.rect(20, y, 170, 10, 'F'); doc.setTextColor(255, 255, 255); doc.setFont('helvetica', 'bold'); doc.setFontSize(9)
  doc.text('Servicio / Descripción', 25, y + 7); doc.text('Cant.', 128, y + 7, { align: 'right' }); doc.text('Precio', 158, y + 7, { align: 'right' }); doc.text('Total', 188, y + 7, { align: 'right' })
  y += 18
  for (const service of record.services) {
    const nameLines = doc.splitTextToSize(safe(service.name), 100) as string[]
    const descLines = service.description ? doc.splitTextToSize(safe(service.description), 100) as string[] : []
    const lines = [...nameLines, ...descLines]; if (y + lines.length * 5 + 8 > 270) { doc.addPage(); y = 25 }
    const firstY = y; doc.setFont('helvetica', 'bold'); doc.setFontSize(9); doc.setTextColor(31, 41, 55)
    nameLines.forEach((line) => { doc.text(line, 25, y); y += 5 })
    doc.setFont('helvetica', 'italic'); doc.setFontSize(8); doc.setTextColor(120, 120, 120); descLines.forEach((line) => { doc.text(line, 25, y); y += 5 })
    doc.setTextColor(31, 41, 55); doc.setFont('helvetica', 'normal'); doc.setFontSize(9); doc.text(String(service.quantity), 128, firstY, { align: 'right' }); doc.text(formatMoney(service.price), 158, firstY, { align: 'right' }); doc.text(formatMoney(service.price * service.quantity), 188, firstY, { align: 'right' })
    doc.setDrawColor(230, 230, 230); doc.line(20, y + 1, 190, y + 1); y += 8
  }
  y += 4; doc.setDrawColor(31, 41, 55); doc.line(20, y, 190, y); y += 10; doc.setFontSize(10)
  doc.text('Subtotal:', 125, y); doc.text(formatMoney(record.subtotal), 188, y, { align: 'right' }); y += 8
  doc.text('ITBIS 18%:', 125, y); doc.text(formatMoney(record.tax), 188, y, { align: 'right' }); y += 10
  doc.setFont('helvetica', 'bold'); doc.setFontSize(13); doc.text('TOTAL:', 125, y); doc.text(formatMoney(record.total), 188, y, { align: 'right' }); y += 25
  doc.setDrawColor(220, 38, 38); doc.line(20, y, 190, y); y += 10; doc.setFont('helvetica', 'normal'); doc.setFontSize(10); doc.setTextColor(75, 85, 99); doc.text('Gracias por confiar en Taller Razer.', 105, y, { align: 'center' }); doc.text('Factura generada electrónicamente.', 105, y + 7, { align: 'center' })
  doc.save(`Factura_${record.id}_Taller_Razer.pdf`)
}
