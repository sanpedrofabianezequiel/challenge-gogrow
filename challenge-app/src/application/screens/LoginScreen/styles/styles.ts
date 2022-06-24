import styled from 'styled-components'

export const SButton = styled.button`
    width: 100%;
    background: ${({ theme }:any) => theme.bgSecondary};
    color: ${({ theme }:any) => theme.textSecondary};
    display: flex;
    justify-content: center;
    border-radius: 20px;
    margin-top: 10px;
    cursor: pointer;
`;