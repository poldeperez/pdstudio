'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import styles from './ContactFormStatus.module.css'

export default function ContactFormStatus() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const t = useTranslations('contact')
  const [show, setShow] = useState(false)

  const success = searchParams.get('success')
  const error = searchParams.get('error')

  useEffect(() => {
    if (success || error) {
      setShow(true)
    }
  }, [success, error])

  const handleClose = () => {
    setShow(false)
    router.replace(window.location.pathname)
  }

  if (!show) return null

  return (
    <>
      {/* Overlay */}
      <div 
        className={styles.overlay}
        onClick={handleClose}
      >
        {/* Modal */}
        <div 
          className={styles.modal}
          onClick={(e) => e.stopPropagation()}
        >
          {success && (
            <div className={styles.centered}>
              {/* Success Icon */}
              <div className={styles.iconSuccess}>
                <svg
                  className={styles.iconSvgSuccess}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              <h2 className={styles.title}>
                {t('success.title')}
              </h2>
              
              <p className={styles.message}>
                {t('success.message')}
              </p>

              <button
                onClick={handleClose}
                className={styles.button}
              >
                {t('success.close')}
              </button>
            </div>
          )}

          {error && (
            <div className={styles.centered}>
              {/* Error Icon */}
              <div className={styles.iconError}>
                <svg
                  className={styles.iconSvgError}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>

              <h2 className={styles.title}>
                {t('error.title')}
              </h2>
              
              <p className={styles.message}>
                {t('error.message')}
              </p>

              <button
                onClick={handleClose}
                className={styles.button}
              >
                {t('error.close')}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
