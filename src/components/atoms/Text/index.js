import React from 'react';
export { TextoPadrao } from './styles';

export const TextoCustomizado = ({ children, color }) => {
    return (
        <TextoPadrao color = {color}>
            {children}
        </TextoPadrao>
    );
};
