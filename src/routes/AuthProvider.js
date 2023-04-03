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
          firestore()
            .collection('fornecedores')
            .add({
              nome: nome,
              tecido: tecido,
            });
        },

        createColorRef: async (fornecedor, cor, codigo) => {
          firestore().collection('corRef').add({
            fornecedor: fornecedor,
            cor: cor,
            codigo: codigo
          });
        },
        
      }}>
      {children}
    </AuthContext.Provider>
  );
};
