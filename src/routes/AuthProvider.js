import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            console.log(e);
          }
        },

        register: async (email, password) => {
          try {
            await auth().createUserWithEmailAndPassword(email, password);
          } catch (e) {
            console.log(e);
          }
        },

        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.log(e);
          }
        },

        createClient: async (nome, cnpj, contato, email) => {
          firestore().collection('clients').add({
            nome: nome,
            cnpj: cnpj,
            contato: contato,
            email: email,
          });
        },

        createSupplier: async (nome, tecido) => {
          firestore().collection('fornecedores').add({
            nome: nome,
            tecido: tecido,
          });
        },

        createTipoTecido: async (fornecedor, nome, tecido) => {
          firestore().collection('tipoTecido').add({
            fornecedor: fornecedor,
            nome: nome,
            tecido: tecido,
          });
        },

        createCaracteristicaRef: async caracteristica => {
          firestore().collection('caractRef').add({
            caracteristica: caracteristica,
          });
        },

        createTecido: async (
          fornecedor,
          cor,
          codigo,
          tecido,
          quantidade,
          tipoMedida,
          tipoTecido,
          observacoes,
        ) => {
          firestore().collection('tecidos').add({
            fornecedor: fornecedor,
            cor: cor,
            codigo: codigo,
            tecido: tecido,
            quantidade: quantidade,
            tipoMedida: tipoMedida,
            tipoTecido: tipoTecido,
            observacoes: observacoes,
            estoqueMinimo: '',
          });
        },

        createInsumo: async (
          produto,
          fornecedor,
          cor,
          codigo,
          quantidade,
          observacoes,
        ) => {
          firestore().collection('insumos').add({
            produto: produto,
            fornecedor: fornecedor,
            cor: cor,
            codigo: codigo,
            quantidade: quantidade,
            observacoes: observacoes,
            estoqueMinimo: '',
          });
        },

        updateTecido: async (quantidade, id) => {
          firestore().collection('tecidos').doc(id).update({
            quantidade: quantidade,
          });
        },

        addEstoqueMinimo: async (estoqueMinimo, id) => {
          firestore().collection('tecidos').doc(id).update({
            estoqueMinimo: estoqueMinimo,
          });
        },

        removeTipoTecido: async id => {
          firestore().collection('tipoTecido').doc(id).delete();
        },

        removeTecido: async id => {
          firestore().collection('tecidos').doc(id).delete();
        },

        removeInsumo: async id => {
          firestore().collection('insumos').doc(id).delete();
        },

        removeCaracteristicaRef: async id => {
          firestore().collection('caractRef').doc(id).delete();
        },

        removeSupplier: async id => {
          firestore().collection('fornecedores').doc(id).delete();
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
