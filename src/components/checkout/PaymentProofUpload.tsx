'use client'

import { useState, useRef } from 'react'
import { Upload, X, FileImage, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

type PaymentProofUploadProps = {
  onFileSelect: (file: File | null) => void
  operationNumber: string
  onOperationNumberChange: (value: string) => void
  notes: string
  onNotesChange: (value: string) => void
  error?: string
}

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

export function PaymentProofUpload({
  onFileSelect,
  operationNumber,
  onOperationNumberChange,
  notes,
  onNotesChange,
  error,
}: PaymentProofUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const [fileError, setFileError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateFile = (file: File): string | null => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return 'Solo se permiten imágenes (JPG, PNG, WEBP)'
    }
    if (file.size > MAX_FILE_SIZE) {
      return 'El archivo debe pesar menos de 5MB'
    }
    return null
  }

  const handleFile = (file: File) => {
    const error = validateFile(file)
    if (error) {
      setFileError(error)
      return
    }

    setFileError(null)
    setFile(file)
    onFileSelect(file)

    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleRemove = () => {
    setFile(null)
    setPreview(null)
    setFileError(null)
    onFileSelect(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-lg font-semibold text-neutral-900 dark:text-white">
          Comprobante de pago
        </h3>

        {/* File Upload Area */}
        {!file ? (
          <div
            className={`relative cursor-pointer rounded-lg border-2 border-dashed transition-colors ${
              dragActive
                ? 'border-neutral-900 bg-neutral-50 dark:border-white dark:bg-neutral-800'
                : error || fileError
                  ? 'border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/20'
                  : 'border-neutral-300 bg-white hover:border-neutral-400 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:border-neutral-600'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={handleClick}
          >
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept={ALLOWED_TYPES.join(',')}
              onChange={handleChange}
            />

            <div className="flex flex-col items-center justify-center p-8 text-center">
              <div className="mb-4 rounded-full bg-neutral-100 p-4 dark:bg-neutral-800">
                <Upload className="h-8 w-8 text-neutral-600 dark:text-neutral-400" />
              </div>
              <p className="mb-2 text-sm font-medium text-neutral-900 dark:text-white">
                Arrastra tu comprobante aquí o haz clic para seleccionar
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                JPG, PNG o WEBP (máx. 5MB)
              </p>
            </div>
          </div>
        ) : (
          /* Preview */
          <div className="relative overflow-hidden rounded-lg border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900">
            <div className="relative aspect-video w-full bg-neutral-100 dark:bg-neutral-800">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={preview!}
                alt="Comprobante de pago"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="flex items-center justify-between border-t border-neutral-200 p-3 dark:border-neutral-700">
              <div className="flex items-center gap-2">
                <FileImage className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
                <div>
                  <p className="text-sm font-medium text-neutral-900 dark:text-white">
                    {file.name}
                  </p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleRemove}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Error Message */}
        {(error || fileError) && (
          <div className="mt-2 flex items-start gap-2 rounded-md bg-red-50 p-3 dark:bg-red-900/20">
            <AlertCircle className="h-4 w-4 flex-shrink-0 text-red-600 dark:text-red-400" />
            <p className="text-sm text-red-600 dark:text-red-400">
              {error || fileError}
            </p>
          </div>
        )}
      </div>

      {/* Operation Number */}
      <div>
        <label
          htmlFor="operationNumber"
          className="mb-2 block text-sm font-medium text-neutral-900 dark:text-white"
        >
          Número de operación *
        </label>
        <input
          type="text"
          id="operationNumber"
          value={operationNumber}
          onChange={(e) => onOperationNumberChange(e.target.value)}
          placeholder="Ej: 001234567890"
          className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-neutral-900 placeholder-neutral-500 focus:border-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900/20 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:placeholder-neutral-400 dark:focus:border-white dark:focus:ring-white/20"
        />
        <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
          Ingresa el número de operación que aparece en tu comprobante
        </p>
      </div>

      {/* Notes (Optional) */}
      <div>
        <label
          htmlFor="notes"
          className="mb-2 block text-sm font-medium text-neutral-900 dark:text-white"
        >
          Notas adicionales (opcional)
        </label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          placeholder="Agrega cualquier información adicional sobre tu pago..."
          rows={3}
          className="w-full resize-none rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-neutral-900 placeholder-neutral-500 focus:border-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900/20 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:placeholder-neutral-400 dark:focus:border-white dark:focus:ring-white/20"
        />
      </div>
    </div>
  )
}
