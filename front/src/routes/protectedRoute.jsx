import React from 'react';
import { Navigate } from 'react-router-dom';
import { getItem } from '../utils/storage';

function ProtectedRoute({ element }) {
    // Verifica se o token está presente e se o usuário está autenticado
    const isAuthenticated = !!getItem('token')/* Sua lógica para verificar o token e a autenticação */;

    if (!isAuthenticated) {
        // Redireciona para a página de login se o usuário não estiver autenticado
        return <Navigate to="/" />;
    }

    // Permite o acesso à rota protegida se o usuário estiver autenticado
    return element;
}

export default ProtectedRoute;
