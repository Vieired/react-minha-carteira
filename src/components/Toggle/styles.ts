import styled from 'styled-components';
import Switch, { ReactSwitchProps } from 'react-switch';

export const Container = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
`;

export const ToggleLabel = styled.div`
    color: ${props => props.theme.colors.white};
    font-size: 12px;
`;

export const ToggleSelector = styled(Switch).attrs<ReactSwitchProps>(
    ({ theme }) => ({
        onColor: theme.colors.info,
        offColor: theme.colors.warning
    })
)<ReactSwitchProps>``;