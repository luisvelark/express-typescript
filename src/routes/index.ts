import { Router } from 'express'
import { readdirSync } from 'fs'

const PATH_ROUTER: string = `${__dirname}`
const router: Router = Router()

/**
 * Limpia el nombre del archivo eliminando la extensión
 * @param fileName - El nombre del archivo con extensión
 * @returns El nombre del archivo sin la extensión o undefined si no tiene
 */
const cleanFileName = (fileName: string): string | undefined => {
  const file: string | undefined = fileName.split('.').shift()
  return file
}

// Función para cargar dinámicamente los módulos de rutas
const loadRoutes = async (): Promise<void> => {
  const promises: Array<Promise<void>> = readdirSync(PATH_ROUTER)
    .filter((fileName: string): boolean => cleanFileName(fileName) !== 'index')
    .map(async (fileName: string): Promise<void> => {
      try {
        /* console.log('archivo', fileName) */
        const cleanName: string | undefined = cleanFileName(fileName)
        if (cleanName !== null && cleanName !== undefined) {
          const moduleRouter = await import(`./${cleanName}`)
          router.use(`/${cleanName}`, moduleRouter.router)
        }
      } catch (error) {
        console.error(`Error loading router for ${fileName}:`, error)
      }
    })

  // Esperamos a que todas las promesas terminen
  await Promise.all(promises)
}

// Ejecutamos la función para cargar las rutas
loadRoutes().catch((error) => console.error('Error loading routes:', error))

export { router }
