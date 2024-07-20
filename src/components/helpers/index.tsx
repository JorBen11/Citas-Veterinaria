export const formatearFecha = (fechaObjeto: string | Date | undefined) => {
  const nuevaFecha = fechaObjeto ? new Date(fechaObjeto) : new Date();
  const opciones: any = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return nuevaFecha.toLocaleDateString('es-ES', opciones);
};
