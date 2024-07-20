import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {formatearFecha} from './helpers';

interface PacienteState {
  item: PacienteProps;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  pacienteEditar: (id: number) => void;
  pacienteEliminar: (id: number) => void;
  setModalPaciente: React.Dispatch<React.SetStateAction<boolean>>;
  setPaciente: React.Dispatch<React.SetStateAction<PacienteProps>>;
}
const Paciente: React.FC<PacienteState> = ({
  item,
  setModalVisible,
  pacienteEditar,
  pacienteEliminar,
  setModalPaciente,
  setPaciente,
}) => {
  const {fecha, paciente, id} = item;

  return (
    <Pressable
      onLongPress={() => {
        setPaciente(item);
        setModalPaciente(true);
      }}>
      <View style={styles.contenedor}>
        <Text style={styles.label}>Paciente:</Text>
        <Text style={styles.texto}>{paciente}</Text>
        <Text style={styles.fecha}>{formatearFecha(fecha)}</Text>

        <View style={styles.contenedorBotones}>
          <Pressable
            style={[styles.btnEditar, styles.btn]}
            onLongPress={() => {
              setModalVisible(true);
              pacienteEditar(id ?? 0);
            }}>
            <Text style={styles.btnTexto}>Editar</Text>
          </Pressable>
          <Pressable
            style={[styles.btnEliminar, styles.btn]}
            onLongPress={() => pacienteEliminar(id ?? 0)}>
            <Text style={styles.btnTexto}>Eliminar</Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomColor: '#94a3b8',
    borderBottomWidth: 1,
  },
  label: {
    color: '#374151',
    textTransform: 'uppercase',
    fontWeight: '700',
    marginBottom: 10,
  },
  texto: {
    color: '#6D28D9',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 10,
  },
  fecha: {
    color: '#374151',
  },
  contenedorBotones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  btn: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 5,
  },
  btnEditar: {
    backgroundColor: '#F59E0B',
  },
  btnTexto: {
    color: '#fff',
    textTransform: 'uppercase',
    fontWeight: '700',
    fontSize: 12,
  },
  btnEliminar: {
    backgroundColor: '#EF4444',
  },
});

export default Paciente;

export interface PacienteProps {
  id?: number;
  paciente?: string;
  propietario?: string;
  email?: string;
  fecha?: Date;
  telefono?: string;
  sintomas?: string;
}
