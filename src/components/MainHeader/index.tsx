import React, { useMemo, useState } from 'react';
import { useFormik } from 'formik';
import { useModal } from '../../hooks/ModalContext';
import { useTheme } from '../../hooks/theme';
import emojis from '../../utils/emojis';
import Toggle from '../Toggle';
import { Container, Profile, Welcome, UserName, Img } from './styles';
import { GeneralSearch } from '../../shared/models/Budget';
import { useBudget } from '../../hooks/BudgetContext';



const MainHeader: React.FC = () => {
    const { toggleTheme, theme } = useTheme();
    const { toggleModal } = useModal();
    const { searchBudgetItem } = useBudget();

    const [darkTheme, setDarkTheme] = useState(
        () => theme.title === 'dark' ? true : false
    );

    const emoji = useMemo(() => {
        const idx = Math.floor(Math.random() * emojis.length);
        return <Img src={emojis[idx]} alt="Avatar"/>;
    },[]);
    
    const handleChangeTheme = () => {
        setDarkTheme(!darkTheme);
        toggleTheme();
    }

    const handleSubmit = (data: GeneralSearch) => {
        toggleModal();
        searchBudgetItem(data.generalSearch)
        console.log(data);
    }

    const formik = useFormik({
        onSubmit: handleSubmit,
        initialValues: { generalSearch: '' } as GeneralSearch,
    });    

    return (
        <Container>
            <Toggle
                labelLeft="Light"
                labelRight="Dark"
                checked={darkTheme}
                onChange={handleChangeTheme}
            />

            <div>
                <form onSubmit={formik.handleSubmit}>
                    <input
                        type="search"
                        id="generalSearch"
                        name="generalSearch"
                        placeholder='Buscar'
                        value={formik?.values?.generalSearch}
                        onChange={formik?.handleChange}
                    />
                    <button type='submit'>
                        Ir
                    </button>
                </form>
            </div>

            <Profile>
                <Welcome>Olá, {emoji}</Welcome>
                <UserName>Ednaldo Gomes</UserName>
            </Profile>
        </Container>
    );
}

export default MainHeader;